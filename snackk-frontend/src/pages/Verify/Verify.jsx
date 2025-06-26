import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () =>{
  const [searchParams, setSearchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  // console.log(success,orderId)
  const verifyPayment = async () =>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
      navigate("/myorders")
      toast.success("Order Placed Successfully");
    }else{
      navigate("/")
      toast.error("Couldn't Place Order, Error Occured");
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])
  
  return(
    <div className='verify'>
      <div className='spinner'>
      </div>
    </div>
  )
}
export default Verify