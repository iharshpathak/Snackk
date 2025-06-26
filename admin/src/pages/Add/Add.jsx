import React, { useState, useContext } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../Context/AdminContext'


const Add = ({url}) =>{
  
  const [image, setImage] = useState(false);
  const {token, setToken} = useContext(AdminContext);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Burgers"
  });

  const onChangeHandler = (event) => {
   const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();

    if(!token){
      toast.error("Please Login To Add Item");
    }else{
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);

      const response = await axios.post(`${url}/api/food/add`, formData);
      if(response.data.success){
        setData({
          name: "",
          description: "",
          price: "",
          category: "Burgers"
        });
        setImage(false);
        toast.success(response.data.message);
      }
        else{
          toast.error(response.data.message);
        }
    }
    
  }

  
  const handlePriceInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '');
  };

  return(
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ?URL.createObjectURL(image)
            :assets.upload_area} alt='upload area'/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type product name here'/>
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Description Here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
          <p>Product Category</p>
            <select onChange={onChangeHandler} name='category' value={data.category}>
            <option value="Burgers">Burgers</option>
            <option value="Rolls">Rolls</option>
            <option value="Dessert">Dessert</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" onInput={handlePriceInput} />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}
export default Add