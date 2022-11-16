import React,{useState,useEffect} from 'react'; 
import '../style/account.css';
import ExpenseForm from '../components/expenseForm';
import StatusTable from '../components/statusTable';
import refresh_img from '../images/refresh.jpeg';
function Dashboard(props){
    const [username,setUsername] = useState(()=>props.username);
    const handleclick=()=>{
        window.location.reload();
    };
    useEffect(() => {
/*         fetch("http://localhost:8080/user",{
            credentials:'include',
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            }).then((res)=>{
            return res.text();
            })
            .then((data)=>{
                console.log(data);
            //var json_data = JSON.parse(data);
                if(typeof data === 'string'){
                    setUsername(data);
                }
            }); */
        console.log(window.localStorage.getItem('name'));
        setUsername(window.localStorage.getItem('name'));
      }, []); 
    return(
        <div className='dashboard-page'>
            <h2 className='greeting'>Hi {username}, let's start saving today!</h2>
            <ExpenseForm curr_user={username}/>
            <div className='status-div'>
                <h2 className='status-text'>Current Status</h2>
                <button className='refresh-button' onClick={handleclick}><img src={refresh_img} alt='' className='refresh-img'/></button>
            </div>
            <StatusTable className='curr-table'/>
        </div>
    );
}

export default Dashboard;