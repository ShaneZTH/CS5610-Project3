import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ProgressBar from "./progressBar";
import "../style/statusTable.css";
import PropTypes from "prop-types";

function StatusTable({ updateBudget, updateSpend }) {
  const [cateMap, usecateMap] = useState(new Map());
  const [budgetMap, usebudgetMap] = useState(new Map());
  const [totalSpending, usetotalSpending] = useState(0);
  const [totalBudget, usetotalBudget] = useState(0);
  // const [username, setUsername] = useState("");

  const getCategories = () => {
    const getURL = "/expense";
    fetch(getURL, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        let data_arr = JSON.parse(data);
        let categoryMap = new Map();
        let total_spend = 0;
        for (let i = 0; i < data_arr.length; i++) {
          const category = data_arr[i]["category"];
          const amount = parseInt(data_arr[i]["amount"]);
          total_spend += amount;
          if (categoryMap.has(category)) {
            let curr_amount = categoryMap.get(category);
            categoryMap.set(category, curr_amount + amount);
          } else {
            categoryMap.set(category, amount);
          }
        }
        usecateMap(categoryMap);
        usetotalSpending(total_spend);
      });
  };

  const getBudgetMap = () => {
    const getURL = "/budget";
    fetch(getURL, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        let data_arr = JSON.parse(data);
        let budMap = new Map();
        let total_bud = 0;
        for (let i = 0; i < data_arr.length; i++) {
          const category = data_arr[i]["category"];
          const amount = parseInt(data_arr[i]["amount"]);
          total_bud += amount;
          budMap.set(category, amount);
        }
        usebudgetMap(budMap);
        usetotalBudget(total_bud);
      });
  };

  const postOverall = () => {
    const postURL = "/rank";
    fetch(postURL, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: window.localStorage.getItem("name"),
        overall: totalSpending / totalBudget
      })
    })
      .then((res) => {
        return res.text();
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getCategories();
    getBudgetMap();
  }, []);
  postOverall();

  updateBudget(budgetMap);
  updateSpend(cateMap);

  return (
    <div>
      <h3>
        Overall Spending:{" "}
        <b>
          {Math.floor((100 * totalSpending) / totalBudget) >= 0
            ? Math.floor((100 * totalSpending) / totalBudget) + "%"
            : ""}
        </b>
      </h3>
      <Table className="table-component">
        <thead>
          <tr className="table">
            <th>#</th>
            <th>Budget</th>
            <th>Current Spending</th>
            <th>Progress</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dining</td>
            <td>{budgetMap.get("dining")}</td>
            <td className="spend">{cateMap.get("dining")}</td>
            {!isNaN(
              Math.floor(
                (100 * cateMap.get("dining")) / budgetMap.get("dining")
              )
            ) && (
              <td>
                {" "}
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("dining")) / budgetMap.get("dining")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Grocery</td>
            <td>{budgetMap.get("grocery")}</td>
            <td>{cateMap.get("grocery")}</td>
            {!isNaN(
              Math.floor(
                (100 * cateMap.get("grocery")) / budgetMap.get("grocery")
              )
            ) && (
              <td>
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("grocery")) / budgetMap.get("grocery")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Entertainment</td>
            <td>{budgetMap.get("entertainment")}</td>
            <td>{cateMap.get("entertainment")}</td>
            {!isNaN(
              Math.floor(
                (100 * cateMap.get("entertainment")) /
                  budgetMap.get("entertainment")
              )
            ) && (
              <td>
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("entertainment")) /
                      budgetMap.get("entertainment")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Clothes & Makeup</td>
            <td>{budgetMap.get("clothes")}</td>
            <td>{cateMap.get("clothes")}</td>
            {!isNaN(
              Math.floor(
                (100 * cateMap.get("clothes")) / budgetMap.get("clothes")
              )
            ) && (
              <td>
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("clothes")) / budgetMap.get("clothes")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Traveling</td>
            <td>{budgetMap.get("travel")}</td>
            <td>{cateMap.get("travel")}</td>
            {!isNaN(
              (100 * cateMap.get("travel")) / budgetMap.get("travel")
            ) && (
              <td>
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("travel")) / budgetMap.get("travel")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Medication</td>
            <td>{budgetMap.get("medicene")}</td>
            <td>{cateMap.get("medicene")}</td>
            {!isNaN(
              (100 * cateMap.get("medicene")) / budgetMap.get("medicene")
            ) && (
              <td>
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("medicene")) / budgetMap.get("medicene")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Others</td>
            <td>{budgetMap.get("others")}</td>
            <td>{cateMap.get("others")}</td>
            {!isNaN(
              (100 * cateMap.get("others")) / budgetMap.get("others")
            ) && (
              <td>
                {" "}
                <ProgressBar
                  progress={Math.floor(
                    (100 * cateMap.get("others")) / budgetMap.get("others")
                  )}
                  height={20}
                />
              </td>
            )}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

StatusTable.propTypes = {
  updateBudget: PropTypes.func,
  updateSpend: PropTypes.func
};
export default StatusTable;
