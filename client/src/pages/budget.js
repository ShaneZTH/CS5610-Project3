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
      <h1 className="greeting">Hi {username}, lets start saving today!</h1>
      <ExpenseForm curr_user={username} />
      <BudgetForm />
    </div>
  );
}
Budget.propTypes={};
export default Budget;
