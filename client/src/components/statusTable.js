import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import '../style/statusTable.css';

function StatusTable(){
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
                        <td>1</td>

                    </tr>
                    <tr>
                        <td>2</td>

                    </tr>

                </tbody>

            </Table>

        </div>
    );

}
export default StatusTable;