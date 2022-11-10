import React from 'react';
import '../style/login.css';
import save_img from '../images/save.jpg';
function Login(){
    return(
    <div>
    <div className='login-wrapper'>
        <h2>Log In to See Your Customized Plan</h2>
        <form>
            <ul>
                <li >
                    <label className='form-label'>Username: </label>
                    <input type="text"/>
                </li>
                <li>
                    <label className='form-label'>Password: </label>
                    <input type="password"></input>
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