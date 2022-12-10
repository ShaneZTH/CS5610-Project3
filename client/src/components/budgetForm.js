import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/expense.css";
import PropTypes from "prop-types";
function BudgetForm() {
  const navigate = useNavigate();
  var [Category, setCategory] = useState();
  var [amount, setAmount] = useState();
  const updateCategory = (e) => {
    setCategory(e.target.value);
  };
  const updateAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postURL = "/budget";
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
        //navigate("/account");
        //window.location.reload();
        return string;
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="expense-form">
        <h3>Record your monthly budget</h3>
        <form onSubmit={handleSubmit} aria-label="Close">
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
                  aria-label="Close"
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
              <input
                type="text"
                required
                onChange={updateAmount}
                aria-label="Close"
              ></input>
            </li>
          </ul>
        </form>
        <button type="submit" className="save-button">
          Save
        </button>
      </div>
    </div>
  );
}

BudgetForm.propTypes={

};
export default BudgetForm;
