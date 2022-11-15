import React,{useState,useEffect} from 'react'; 
import '../style/account.css';
import ExpenseForm from '../components/expenseForm';
import StatusTable from '../components/statusTable';
function Dashboard(props){
    const [username,setUsername] = useState("");
    useEffect(() => {
       //console.log(window.localStorage.getItem('name'));
       //setUsername(window.localStorage.getItem('name'));
        fetch("http://localhost:8080/user",{
        credentials:'include',
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        },
       }).then((res)=>{
        return res.text();
       })
       .then((data)=>{
            var json_data = JSON.parse(data);
            setUsername(json_data["user"]);
    }); 
      }, []); 
    return(
        <div className='dashboard-page'>
            <h2 className='greeting'>Hi {username}, let's start saving today!</h2>
            <ExpenseForm curr_user={username}/>
            <h2 className='status-text'>Current Status</h2>
            <StatusTable className='curr-table'/>
        </div>
    );
}

export default Dashboard;