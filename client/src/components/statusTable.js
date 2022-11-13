import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';

function StatusTable(){
    return(
        <div>
            <Table>
                <thread>
                    <tr>
                       <th></th> 
                       <th>Budget</th>
                       <th>Current Spending</th>
                       <th></th>
                    </tr>
                </thread>

            </Table>

        </div>
    );

}
export default StatusTable;