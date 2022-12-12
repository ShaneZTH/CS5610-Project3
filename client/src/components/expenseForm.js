import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../style/expense.css";
function ExpenseForm(props) {
  const navigate = useNavigate();
  let [Category, setCategory] = useState();
  let [amount, setAmount] = useState();

  const updateCategory = (e) => {
    setCategory(e.target.value);
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.curr_user === "") {
      alert("Log in first");
    }
    const postURL = "/expense";
    fetch(postURL, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: Category,
        amount: amount,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Log in first to proceed");
          navigate("/");
          return new Error(res.statusText);
        }
        const string = res.text();
        alert("Expense has been recorded.");
        //navigate("/account");
        //window.location.reload();
        return string;
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="expense-form">
        <h3>Record your latest expenses</h3>
        <form onSubmit={handleSubmit} className="expense-form-content">
          <ul>
            <li>
              <label className="dropdown-label">
                Category:
                {/* <input type='text' required></input> */}
                <select
                  value={Category}
                  onChange={updateCategory}
                  required
                  className="dropdown-select"
                >
                  <option value="none">None</option>
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
              <input type="text" required onChange={updateAmount}></input>
            </li>
          </ul>
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

ExpenseForm.propTypes = {
  curr_user: PropTypes.string,
};

export default ExpenseForm;
