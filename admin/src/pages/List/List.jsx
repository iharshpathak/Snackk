import React, { useState, useEffect, useContext } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../Context/AdminContext'

const List = ({url}) =>{
  
  const [list, setList] = useState([]);
  const {token, setToken}= useContext(AdminContext);

  async function fetchList(){
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error while fetching data");
    }
  }

  async function removeFood(foodId){
    if(!token){
      toast.error("Please Login To Modify List");
    }else{
      const response = await axios.post(`${url}/api/food/remove/`,{id:foodId});
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error("Error while romoving item");
      }
    }
    
  }

  useEffect(()=>{
    fetchList();
  },[])
  
  return(
    <div className='list add flex-col'>
      <p className='list-heading'>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
          return(
            <div className='list-table-format' key={index}>
              <img src={`${url}/images/`+item.image} alt={item.name}/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>)
        })}
      </div>
    </div>
  )
}
export default List