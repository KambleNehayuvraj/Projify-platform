import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export { CartContext };

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:4000";
  const [project_list, setProjectList] = useState([]);

  const fetchProjectList = async () => {
    try {
      const response = await axios.get(url + "/api/project/list");
      setProjectList(response.data.data);
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  };

  // Load token from localStorage on component mount
  useEffect(() => {
    async function loadData() {
      await fetchProjectList();
      try {
        // Check both 'token' and 'authToken' for compatibility
        const savedToken = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (savedToken) {
          console.log('🔑 Token found in localStorage:', savedToken.substring(0, 10) + '...');
          setToken(savedToken);
        } else {
          console.log('❌ No token found in localStorage');
        }
      } catch (error) {
        console.error('Error loading token from localStorage:', error);
      }
    }
    loadData();
  }, []);

  // Load cart from server when token is available
  useEffect(() => {
    if (token) {
      console.log('🔄 Token available, loading cart from server...');
      loadCartFromServer();
    } else {
      console.log('📱 No token, loading cart from localStorage...');
      loadCartFromLocalStorage();
    }
  }, [token]);

  // Save cart to localStorage whenever cartItems change (backup)
  useEffect(() => {
    try {
      localStorage.setItem('progify-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Save token to localStorage whenever token changes
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
  }, [token]);

  // Load cart from localStorage (fallback)
  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('progify-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        console.log('📱 Loaded cart from localStorage:', parsedCart.length + ' items');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCartItems([]);
    }
  };

  // Load cart from server
  const loadCartFromServer = async () => {
    if (!token) {
      console.log('❌ No token available for server request');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('🌐 Making API call to load cart from server...');
      const response = await axios.get(`${url}/api/cart`, {
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Server response:', response.data);

      if (response.data.success) {
        setCartItems(response.data.cartItems || []);
        console.log('✅ Cart loaded from server:', response.data.cartItems?.length || 0, 'items');
      } else {
        console.error('❌ Failed to load cart from server:', response.data.message);
        loadCartFromLocalStorage(); // Fallback to localStorage
      }
    } catch (error) {
      console.error('❌ Error loading cart from server:', error.response?.data || error.message);
      loadCartFromLocalStorage(); // Fallback to localStorage
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart - MAIN FUNCTION FOR API INTEGRATION
  const addToCart = async (item) => {
    console.log('🛒 Adding item to cart:', item);
    
    try {
      // Get current token
      const currentToken = token || localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (currentToken) {
        console.log('🔑 Token available, adding to server cart...');
        console.log('📤 API Request Details:', {
          url: `${url}/api/cart/add`,
          token: currentToken.substring(0, 10) + '...',
          itemId: item.id || item._id,
          itemName: item.name
        });
        
        // Make API call to add item to server cart
        const response = await axios.post(
          `${url}/api/cart/add`,
          { 
            itemId: item.id || item._id, // Handle both id and _id
            projectData: item // Send full item data
          },
          { 
            headers: { 
              'token': currentToken,
              'Content-Type': 'application/json'
            } 
          }
        );

        console.log('📥 Server response:', response.data);

        if (response.data.success) {
          // Update local state with server response
          setCartItems(response.data.cartItems || []);
          console.log('✅ Item added to server cart successfully!');
          return { 
            success: true, 
            message: 'Item added to cart successfully!',
            source: 'server'
          };
        } else {
          console.error('❌ Server rejected add request:', response.data.message);
          throw new Error(response.data.message || 'Failed to add item to server cart');
        }
      } else {
        console.log('⚠️ No token found, adding to local cart only...');
        
        // Add to local cart when no token
        const updatedItems = (() => {
          const existingItem = cartItems.find(cartItem => 
            (cartItem.id || cartItem._id) === (item.id || item._id)
          );
          
          if (existingItem) {
            console.log('📝 Updating existing item quantity');
            return cartItems.map(cartItem =>
              (cartItem.id || cartItem._id) === (item.id || item._id)
                ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                : cartItem
            );
          } else {
            console.log('➕ Adding new item to cart');
            return [...cartItems, { ...item, quantity: 1 }];
          }
        })();

        setCartItems(updatedItems);
        console.log('✅ Item added to local cart');
        
        return { 
          success: true, 
          message: 'Item added to local cart (login to sync with server)',
          source: 'local'
        };
      }
    } catch (error) {
      console.error('❌ Error in addToCart:', error.response?.data || error.message);
      
      // Fallback to local cart on any error
      const updatedItems = (() => {
        const existingItem = cartItems.find(cartItem => 
          (cartItem.id || cartItem._id) === (item.id || item._id)
        );
        
        if (existingItem) {
          return cartItems.map(cartItem =>
            (cartItem.id || cartItem._id) === (item.id || item._id)
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
              : cartItem
          );
        } else {
          return [...cartItems, { ...item, quantity: 1 }];
        }
      })();

      setCartItems(updatedItems);
      console.log('⚠️ Fallback: Item added to local cart due to server error');
      
      return { 
        success: false, 
        message: 'Added to local cart (server error - will sync when connection restored)',
        source: 'local_fallback'
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const currentToken = token || localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (currentToken) {
        console.log('🗑️ Removing item from server cart...', itemId);
        
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId: itemId },
          { 
            headers: { 
              token: currentToken,
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.data.success) {
          setCartItems(response.data.cartItems || []);
          console.log('✅ Item removed from server cart successfully');
        } else {
          throw new Error(response.data.message);
        }
      } else {
        // Local removal
        const updatedItems = cartItems.filter(item => (item.id || item._id) !== itemId);
        setCartItems(updatedItems);
        console.log('✅ Item removed from local cart');
      }
    } catch (error) {
      console.error('❌ Error removing item:', error);
      // Fallback to local removal
      const updatedItems = cartItems.filter(item => (item.id || item._id) !== itemId);
      setCartItems(updatedItems);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    try {
      const currentToken = token || localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (currentToken) {
        console.log('📝 Updating quantity on server...', { itemId, newQuantity });
        
        const response = await axios.post(
          `${url}/api/cart/update-quantity`,
          { itemId, quantity: newQuantity },
          { 
            headers: { 
              token: currentToken,
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.data.success) {
          setCartItems(response.data.cartItems || []);
          console.log('✅ Quantity updated on server');
        } else {
          throw new Error(response.data.message);
        }
      } else {
        // Local update
        const updatedItems = cartItems.map(item =>
          (item.id || item._id) === itemId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCartItems(updatedItems);
        console.log('✅ Quantity updated locally');
      }
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      // Fallback to local update
      const updatedItems = cartItems.map(item =>
        (item.id || item._id) === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCartItems(updatedItems);
    }
  };

  const clearCart = async () => {
    try {
      const currentToken = token || localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (currentToken) {
        const response = await axios.delete(
          `${url}/api/cart/clear`,
          { 
            headers: { 
              token: currentToken,
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.data.success) {
          setCartItems([]);
          console.log('✅ Cart cleared on server');
        } else {
          throw new Error(response.data.message);
        }
      } else {
        setCartItems([]);
        console.log('✅ Local cart cleared');
      }
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      setCartItems([]);
    }
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const isInCart = (itemId) => {
    return cartItems.some(item => (item.id || item._id) === itemId);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const logout = () => {
    setToken('');
    setCartItems([]);
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('progify-cart');
    localStorage.removeItem('userData');
    console.log('👋 User logged out, cart cleared');
  };

  const refreshAuthStatus = () => {
    const currentToken = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (currentToken && currentToken !== token) {
      console.log('🔄 Refreshing auth status with new token');
      setToken(currentToken);
    }
  };

  // Debug function to check current state
  const debugCartState = () => {
    console.log('🐛 Cart Debug Info:', {
      token: token ? token.substring(0, 10) + '...' : 'No token',
      cartItemsCount: cartItems.length,
      cartItems: cartItems,
      isLoading
    });
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
    getCartTotal,
    isInCart,
    handleCartClick,
    isCartOpen,
    setIsCartOpen,
    closeCart,
    url,
    token,
    setToken,
    logout,
    isLoading,
    loadCartFromServer,
    project_list,
    refreshAuthStatus,
    debugCartState // For debugging
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};