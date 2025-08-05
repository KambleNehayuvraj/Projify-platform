import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Hardware"
  })

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validate price before submitting
    if (!data.price || isNaN(data.price) || data.price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price)) // Fixed: was data.name, now data.price
    formData.append("category", data.category)
    formData.append("image", image)
    
    try {
      const response = await axios.post(`${url}/api/project/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Hardware"
        })
        setImage(false)
        toast.success(response.data.message)
        alert("Product added successfully!");
      }
      else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  }

  return (
    <div className="add">
      <div className="add-header">
        <h2>Add New Product</h2>
        <p>Fill in the details below to add a new product to your inventory</p>
      </div>
      
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" className="image-upload-container">
            <div className="upload-content">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
              <span className="upload-text">Click to upload or drag and drop</span>
              <span className="upload-formats">PNG, JPG, GIF up to 10MB</span>
            </div>
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        
        <div className="form-row">
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onchangeHandler} value={data.name} type="text" name='name' placeholder='Enter product name' required />
          </div>
        </div>
        
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onchangeHandler} value={data.description} name="description" rows="6" placeholder='Describe your product in detail...' required></textarea>
        </div>
        
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onchangeHandler} value={data.category} name="category">
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onchangeHandler} value={data.price} type="number" name='price' placeholder='1000' min="1" step="0.01" required />
          </div>
        </div>
        
        <div className="form-actions">
          <button type='submit' className='add-btn'>
            <span>ADD PRODUCT</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add;