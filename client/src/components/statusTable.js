import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import ProgressBar from './progressBar';
import { useAsyncError } from 'react-router-dom';
import '../style/statusTable.css';


function StatusTable(){
    const [cateMap, usecateMap] = useState(new Map());
    const [budgetMap,usebudgetMap] = useState(new Map());
    const percentage = 50;
    const [progressMap, useprogressMap] = useState(new Map());

    const getCategories = ()=>{
        const getURL = "http://localhost:8080/expense";
        fetch(getURL,{
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            method:'GET',
        }).then((res)=>{
            return res.text();
        }).then((data)=>{
            var data_arr = JSON.parse(data);
            var categoryList = [];
            var categoryMap = new Map();
            for(var i=0;i<data_arr.length;i++){
                const category = data_arr[i]['category'];
                const amount = parseInt(data_arr[i]['amount']);
                if(categoryMap.has(category)){
                    var curr_amount = categoryMap.get(category);
                    console.log("amount is:",amount);
                    categoryMap.set(category,curr_amount+amount);
                }else{
                    categoryMap.set(category,amount);
                }
            }
            usecateMap(categoryMap);
            console.log(cateMap);
        });
    };

    const getBudgetMap = ()=>{
        const getURL = "http://localhost:8080/budget";
        fetch(getURL,{
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            method:'GET',
        }).then((res)=>{
            return res.text();
        }).then((data)=>{
            var data_arr = JSON.parse(data);
            var budMap = new Map();
            for(var i=0;i<data_arr.length;i++){
                const category = data_arr[i]['category'];
                const amount = parseInt(data_arr[i]['amount']);
                if(budMap.has(category)){
                    var curr_amount = budMap.get(category);
                    budMap.set(category,curr_amount+amount);
                }else{
                    budMap.set(category,amount);
                }
            }
            usebudgetMap(budMap);
        });

    };

    const getProgress = () =>{
        var proMap = new Map();
        for(const category of cateMap.keys()){
            const budget = budgetMap.get(category);
            const spending = cateMap.get(category);
            console.log("category is: ", category);
            console.log("budget is: ", budget);
            console.log("spending is: ", spending); 
            const percentage = 100*spending/budget;
            proMap.set(category,percentage);
        };
        useprogressMap(proMap);
    }


    useEffect(()=>{
        getCategories();
        getBudgetMap();
        getProgress();
        console.log(progressMap);
    },[]);
    return(
        <div>
            <h4>Overall Spending: </h4>
            <Table className='table-component'>
                <thead>
                    <tr className='table'>
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
                        <td className='spend'>{cateMap.get("dining")}</td>
                        {!isNaN(Math.floor(100*cateMap.get("dining")/budgetMap.get("dining"))) && <td> <ProgressBar bgcolor="orange" progress={Math.floor(100*cateMap.get("dining")/budgetMap.get("dining"))}  height={20}/></td>}

                    </tr>
                    <tr>
                        <td>Grocery</td>
                        <td>{budgetMap.get("grocery")}</td>
                        <td>{cateMap.get("grocery")}</td>
                        {!isNaN(Math.floor(100*cateMap.get("grocery")/budgetMap.get("grocery"))) && <td><ProgressBar bgcolor="orange" progress={Math.floor(100*cateMap.get("grocery")/budgetMap.get("grocery"))}  height={20}/></td>}

                    </tr>
                    <tr>
                        <td>Entertainment</td>
                        <td>{budgetMap.get("entertainment")}</td>
                        <td>{cateMap.get("entertainment")}</td>
                        {!isNaN(Math.floor(100*cateMap.get("entertainment")/budgetMap.get("entertainment"))) && <td><ProgressBar bgcolor="orange" progress={Math.floor(100*cateMap.get("entertainment")/budgetMap.get("entertainment"))}  height={20}/></td>}

                    </tr>
                    <tr>
                        <td>Clothes & Makeup</td>
                        <td>{budgetMap.get("clothes")}</td>
                        <td>{cateMap.get("clothes")}</td>
                        {!isNaN(Math.floor(100*cateMap.get("clothes")/budgetMap.get("clothes"))) && <td><ProgressBar bgcolor="orange" progress={Math.floor(100*cateMap.get("clothes")/budgetMap.get("clothes"))}  height={20}/></td>}

                    </tr>
                    <tr>
                        <td>Traveling</td>
                        <td>{budgetMap.get("travel")}</td>
                        <td>{cateMap.get("travel")}</td>
                        {!isNaN(100*cateMap.get("travel")/budgetMap.get("travel")) && <td><ProgressBar bgcolor="orange" progress={100*cateMap.get("travel")/budgetMap.get("travel")}  height={20}/></td>}
                    </tr>
                    <tr>
                        <td>Medication</td>
                        <td>{budgetMap.get("medicene")}</td>
                        <td>{cateMap.get("medicene")}</td>
                        {!isNaN(100*cateMap.get("medicene")/budgetMap.get("medicene"))&&<td><ProgressBar bgcolor="orange" progress={Math.floor(100*cateMap.get("medicene")/budgetMap.get("medicene"))}  height={20}/></td>}
                    </tr>
                    <tr>
                        <td>Others</td>
                        <td>{budgetMap.get("others")}</td>
                        <td>{cateMap.get("others")}</td>
                        {!isNaN(100*cateMap.get("others")/budgetMap.get("others"))&&<td> <ProgressBar bgcolor="orange" progress={100*cateMap.get("others")/budgetMap.get("others")}  height={20}/></td>}
                    </tr>

                </tbody>

            </Table>

        </div>
    );

}
export default StatusTable;