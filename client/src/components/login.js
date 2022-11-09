import React from 'react';
import '../style/login.css';
function Login(){
    return(
    <div className='login-wrapper'>
        <h2>Log In to See Your Customized Plan</h2>
        <form>
            <label>
                <p>Username</p>
                <input type="text"/>
            </label>
            <label>
                <p>Password</p>
                <input type="password"></input>
            </label>
            <div>
                <button type="submit">Log In</button>
            </div>
        </form>
    </div>
    );
}

export default Login;