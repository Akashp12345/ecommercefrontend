import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { isWantLogin } from "../Data/Reducer";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
const Home = () => {
  const [productdata, setProductData] = useState(null);
  const data = useSelector((state) => state.data);
  const { email, isClicked } = data;
  const [isSignUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const [isOTP,setisOtp]=useState(false)
  const [otp1,setOtp1]=useState("")
  const [otp2 ,setOtp2]=useState("")
  const [otp3,setOtp3]=useState("")
  const [otp4,setOtp4]=useState("")


  const [userdata,setUserdata]=useState({
    Firstname:"",
    Lastname:"",
    Email:"",
    Password:"",
    ConfirmPassword:""
    
  })
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addtocart = () => {
    if (email) {
    } else {
      toast.warning("Please Sign In", { position: "top-center" });
    }
  };

  const OnHandleChange=(e)=>{
setUserdata({...userdata,[e.target.name]:e.target.value})
  }

  const SendOtp=()=>{
  if(userdata.Email && userdata.Firstname && userdata.Lastname && userdata.Password===userdata.ConfirmPassword ){
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/userverification`,userdata)
    .then(res=>setisOtp(true))
    .catch(err=>toast.error("Can't Send OTP",{position:"top-center"}))
  }
  }

  const Final=()=>{
let OTP=otp1+""+otp2+""+otp3+""+otp4
let obj={
  OTP,
  userdata
}
axios.post(`${process.env.REACT_APP_BACKEND_URL}/SignUp`,obj)
.then(res=>console.log(res.data))
.catch(err=>console.log(err))

  }

  return (
    <div>
      <div className="home_heading">
        <h3>Products</h3>
      </div>
      <ToastContainer />
      <li className="product_details">
        {productdata &&
          productdata.map((item, index) => {
            return (
              <ul key={index}>
                <div className="product_left">
                  <img src={item.image} alt="product" />
                </div>
                <div className="product_right">
                  <div className="first_row_title">
                    <h4>{item.title}</h4>

                    <label>Rating :{item.rating.rate}/5</label>
                  </div>
                  <div className="product_description">
                    <p>{item.description}</p>
                  </div>
                  <div className="Footer">
                    <label>Price: {item.price}</label>
                    <Button variant="warning" onClick={() => addtocart()}>
                      AddToCart
                    </Button>
                  </div>
                </div>
              </ul>
            );
          })}
      </li>
      <Modal
        show={isClicked}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {console.log(userdata)}
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {isSignUp ? "SignUp" : "SignIn"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {isSignUp &&<div className="d-flex justify-content-around">
              
                  <FloatingLabel
           
            label="First Name"
            className="mb-3"
          >
            <Form.Control type="text" name="Firstname" onChange={(e)=>OnHandleChange(e)}/>
          </FloatingLabel>

          <FloatingLabel  label="Last Name"  className="mb-3">
            <Form.Control type="text" name="Lastname" onChange={(e)=>OnHandleChange(e)}/>
          </FloatingLabel>
                  </div>}
          <FloatingLabel
            
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" name="Email" onChange={(e)=>OnHandleChange(e)} placeholder="name@example.com" />
          </FloatingLabel>

          <FloatingLabel  label="Password"   className="mb-3">
            <Form.Control type="password" onChange={(e)=>OnHandleChange(e)} name="Password" placeholder="Password" />
          </FloatingLabel>
          {isSignUp &&<div className="d-flex flex-column  ">
            <FloatingLabel  label="Confirm Password"  style={{width:"100%"}}>
            <Form.Control type="password" name="ConfirmPassword" onChange={(e)=>OnHandleChange(e)} placeholder="Confirm Password" />
          </FloatingLabel>
          <Button className="mt-3" style={{width:"100px"}} type="submit" onClick={()=>SendOtp()}>Send OTP</Button>

          {isOTP &&
          <div className="otp_main">
            <label>Enter OTP</label>
            <div className="otp_input_main mt-3">
            <input type="text" onChange={(e)=>setOtp1(e.target.value)} className="otp_input"/>
            <input type="text"  onChange={(e)=>setOtp2(e.target.value)} className="otp_input"/>
            <input type="text"  onChange={(e)=>setOtp3(e.target.value)} className="otp_input"/>
            <input type="text"  onChange={(e)=>setOtp4(e.target.value)} className="otp_input"/>
              </div>
           
            </div>}
          </div>
          
          }
            
        </Modal.Body>
        <Modal.Footer className="Model_footer">
          <Button variant="warning" onClick={() => setSignUp(!isSignUp)}>
            {!isSignUp?"SignUp":"SignIn"}
          </Button>
          <div>
            <Button variant="success" className="mx-5" onClick={()=>Final()}>
            Submit
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch(isWantLogin(false))}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
