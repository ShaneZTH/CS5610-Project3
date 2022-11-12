import React,{useState,useEffect} from 'react'; 
import '../style/account.css';
import ExpenseForm from '../components/expenseForm';
function Dashboard(props){
    const [username,setUsername] = useState(()=>props.username);
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

export default Dashboard;