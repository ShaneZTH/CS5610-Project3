import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/expenseForm";
import BudgetForm from "../components/budgetForm";
import "../style/budget.css";
import { useNavigate } from "react-router-dom";
function Budget() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    fetch("/auth", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp.success) {
          setAuth(true);
          setUsername(resp.user);
        } else {
          // Reject access
          console.warn("User not authenticated.");
          alert("You haven't logged in yet.");
          navigate("/");
          return;
        }
      });
  }, []);

  return (
    <div className="budget-page">
      <h2 className="greeting">Hi {username}, lets start saving today!</h2>
      <ExpenseForm curr_user={username} />
      <BudgetForm />
    </div>
  );
}
Budget.propTypes = {};
export default Budget;
