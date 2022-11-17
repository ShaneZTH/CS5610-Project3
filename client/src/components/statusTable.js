import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import '../style/statusTable.css';


function StatusTable(){
    const [cateMap, usecateMap] = useState(new Map());
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
    useEffect(()=>{
        getCategories();
        console.log(cateMap);
    },[]);
    return(
        <div>
            <Table className='table-component'>
                <thead>
                    <tr className='table'>
                        <th>#</th>
                       <th>Budget</th>
                       <th>Current Spending</th>
                       <th>Progress</th>
                       <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dining</td>
                        <td></td>
                        <td className='spend'>{cateMap.get("dining")}</td>

                    </tr>
                    <tr>
                        <td>Grocery</td>
                        <td></td>
                        <td>{cateMap.get("grocery")}</td>

                    </tr>
                    <tr>
                        <td>Entertainment</td>
                        <td></td>
                        <td>{cateMap.get("entertainment")}</td>

                    </tr>
                    <tr>
                        <td>Clothes & Makeup</td>
                        <td></td>
                        <td>{cateMap.get("clothes")}</td>

                    </tr>
                    <tr>
                        <td>Traveling</td>
                        <td></td>
                        <td>{cateMap.get("travel")}</td>
                    </tr>
                    <tr>
                        <td>Medication</td>
                        <td></td>
                        <td>{cateMap.get("medicene")}</td>
                    </tr>
                    <tr>
                        <td>Others</td>
                        <td></td>
                        <td>{cateMap.get("others")}</td>
                    </tr>

                </tbody>

            </Table>

        </div>
    );

}
export default StatusTable;