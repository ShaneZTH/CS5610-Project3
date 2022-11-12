import React,{useState,useEffect} from "react";
import '../style/expense.css';
function ExpenseForm(props){
    const [Category,setCategory] = useState("");
    const updateCategory=(e)=>{
        setCategory(e.target.value);
       // console.log(Category);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(Category);
        if(props.curr_user===""){
            alert("Log in first");
        }
        console.log("submiited successfully");
    }
    return(
        <div>
            <div className="expense-form">
                <h3>Record your latest expenses</h3>
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label className="dropdown-label">Category:
                            {/* <input type='text' required></input> */}
                                <select value={Category} onChange={updateCategory} required className="dropdown-select">
                                    <option value="dining">Dining</option>
                                    <option value="grocery">Grocery</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="clothes">Clothes & Makeup</option>
                                    <option value="travel">Traveling</option>
                                    <option value="medicene">Medication</option>
                                    <option value="others">Others</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label className="expense-form-label">Amount:</label>
                            <input type='text' required></input>
                        </li>
                    </ul>
                    <button type="submit" className="save-button">Save</button>
                </form>
            </div>
        </div>
    );
}

export default ExpenseForm;