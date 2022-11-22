import React,{useState,useEffect} from 'react';
import ExpenseForm from '../components/expenseForm';
function Budget(){
    const [username,setUsername] = useState("");
    useEffect(() => {
        console.log(window.localStorage.getItem('name'));
        setUsername(window.localStorage.getItem('name'));
    }, []); 
    return(
        <div>
            <h2 className='greeting'>Hi {username}, let's start saving today!</h2>
            <ExpenseForm curr_user={username}/>
        </div>
    );
}

export default Budget;