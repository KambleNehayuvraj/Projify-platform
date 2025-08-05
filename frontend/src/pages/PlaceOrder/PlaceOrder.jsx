import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [orderForm, setOrderForm] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Order Notes
    orderNotes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate totals (same logic as Cart component)
  const subtotal = getCartTotal();
  const processingFee = 500;
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + processingFee + taxAmount;

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!orderForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!orderForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!orderForm.email.trim()) newErrors.email = 'Email is required';
    if (!orderForm.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!orderForm.address.trim()) newErrors.address = 'Address is required';
    if (!orderForm.city.trim()) newErrors.city = 'City is required';
    if (!orderForm.state.trim()) newErrors.state = 'State is required';
    if (!orderForm.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (orderForm.email && !emailRegex.test(orderForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (orderForm.phone && !phoneRegex.test(orderForm.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // Payment validation for card
    if (orderForm.paymentMethod === 'card') {
      if (!orderForm.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!orderForm.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!orderForm.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!orderForm.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the order to your backend
      const orderData = {
        items: cartItems,
        customerInfo: orderForm,
        totals: {
          subtotal,
          processingFee,
          taxAmount,
          grandTotal
        },
        orderDate: new Date().toISOString()
      };

      console.log('Order submitted:', orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to success page or show success message
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      navigate('/');
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="place-order-page">
        <div className="empty-order">
          <h2>No items to order</h2>
          <p>Your cart is empty. Please add some items before placing an order.</p>
          <button className="back-to-shop-btn" onClick={() => navigate('/hardware-projects')}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="place-order-page">
      <div className="order-container">
        <div className="order-header">
          <button className="back-btn" onClick={handleBackToCart}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"/>
            </svg>
            Back to Cart
          </button>
          <h1>Place Your Order</h1>
        </div>

        <div className="order-content">
          <div className="order-form-section">
            <form onSubmit={handleSubmitOrder} className="order-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={orderForm.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={orderForm.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="form-section">
                <h3>Shipping Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={orderForm.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={orderForm.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={orderForm.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={orderForm.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={orderForm.country}
                      onChange={handleInputChange}
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={orderForm.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={orderForm.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                    />
                    <span>UPI Payment</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={orderForm.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {orderForm.paymentMethod === 'card' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={orderForm.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={orderForm.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={errors.expiryDate ? 'error' : ''}
                        />
                        {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={orderForm.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={errors.cvv ? 'error' : ''}
                        />
                        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="nameOnCard">Name on Card *</label>
                      <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={orderForm.nameOnCard}
                        onChange={handleInputChange}
                        className={errors.nameOnCard ? 'error' : ''}
                      />
                      {errors.nameOnCard && <span className="error-message">{errors.nameOnCard}</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="form-section">
                <h3>Order Notes (Optional)</h3>
                <div className="form-group">
                  <label htmlFor="orderNotes">Special Instructions</label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    value={orderForm.orderNotes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any special instructions for your order..."
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity || 1}</span>
                    </div>
                    <span className="item-price">
                      {formatPrice(item.price * (item.quantity || 1))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-calculations">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Processing Fee</span>
                  <span>{formatPrice(processingFee)}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="orderForm"
                className="place-order-btn"
                disabled={isProcessing}
                onClick={handleSubmitOrder}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  `Place Order - ${formatPrice(grandTotal)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;