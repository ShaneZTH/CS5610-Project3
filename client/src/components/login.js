import React from 'react';
import '../style/login.css';
function Login(){
    return(
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
    </div>
    );
}

export default Login;