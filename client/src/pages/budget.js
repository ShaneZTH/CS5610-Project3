import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/expenseForm";
import BudgetForm from "../components/budgetForm";
import "../style/budget.css";
function Budget() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(window.localStorage.getItem("name"));
  }, []);
  return (
    <div className="budget-page">
      <h2 className="greeting">Hi {username}, lets start saving today!</h2>
      <ExpenseForm curr_user={username} />
      <BudgetForm />
    </div>
  );
}

export default Budget;
