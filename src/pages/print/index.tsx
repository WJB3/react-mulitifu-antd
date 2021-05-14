import React, { useEffect,useState } from 'react';
import styles from './index.module.less';
import { Link, useLocation, useHistory } from 'react-router-dom';
import resourceApi from '@/api/resource';

export default function Print() {

    const history = useHistory();
    const location = useLocation(); 

    const [data,setData]=useState([]);
    const [columns,setColumns]=useState([]);

    useEffect(() => {  
        const module=localStorage.getItem('PRINTMODULE');
        const columns=JSON.parse(localStorage.getItem('PRINTCOLUMNS'));
        const pageCurrent=localStorage.getItem('PRINTCURRENT');
        const pageSize=localStorage.getItem('PRINTSIZE');

        setColumns(columns)

        if(module==='resource'){
            resourceApi.getList({
                page:pageCurrent,
                size:pageSize
            }).then(res=>{
                setData(res);
            })
        }

    }, []) 
    
    useEffect(()=>{
        if(data && data.length){
            window.print(); 
        }
    },[data]) 

    return <div className={styles.container}>
        <div className={styles.wrapper}>
        <table className={styles.table}> 
            <thead className={styles.tableHeader}>
                <tr>
                    <th>Header content 1</th>
                    <th>Header content 2</th>
                </tr>
            </thead> 
            <tbody className={styles.tableBody}>
                <tr>
                    <td>Body content 1</td>
                    <td>Body content 2</td>
                </tr>
                <tr>
                    <td>Body content 1</td>
                    <td>Body content 2</td>
                </tr>
                <tr>
                    <td>Body content 1</td>
                    <td>Body content 2</td>
                </tr>
                <tr>
                    <td>Body content 1</td>
                    <td>Body content 2</td>
                </tr>
                <tr>
                    <td>Body content 1</td>
                    <td>Body content 2</td>
                </tr>
            </tbody> 
        </table>
        </div>
    </div>
}