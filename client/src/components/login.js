import {useNavigate} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import '../style/login.css';
import save_img from '../images/save.jpg';
function Login({updateUser}){
    const navigate = useNavigate();
    var [name,setName]=useState();
    var [password,setPassword]=useState();
    
    const nameUpdate = (event)=>{
        setName(event.target.value);
        updateUser(event.target.value);
    }
    const passwordUpdate = (event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const postURL = "http://localhost:8080/login";
        navigate("/account");
        fetch(postURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                name:name,
                password:password
            })
        }).then((response)=>{
            //navigate("/account");
            if (!response.ok) {
                console.log(response);
                alert("Invalid username or password");
                navigate("/");
                throw new Error(response.statusText);
            }
            //navigate("/account");
            return response.json();
        }).catch(err=>console.log(err));
    }
    return(
    <div>
    <div className='login-wrapper'>
        <h2>Log In to See Your Customized Plan</h2>
        <form onSubmit={handleSubmit}>
            <ul>
                <li >
                    <label className='form-label'>Username: </label>
                    <input type="text" required onChange={nameUpdate}/>
                </li>
                <li>
                    <label className='form-label'>Password: </label>
                    <input type="password" required onChange={passwordUpdate}/>
                </li>
            </ul>
            <button type="submit" className='login-button'>Log In</button>
        </form>
        <h3>An account will be automatically registered for new user</h3>
    </div>
    <div>
        <img src={save_img} alt='' className='pig-img'/>
    </div>
    </div>
    );
}

export default Login;