import React, {useEffect, useState} from "react";
import AxiosInstance from "../config/axiosInstance";
import {Modal} from "react-bootstrap";
import Header from "./cards/Header";
interface Employee {
    _id:string,
    name:string,
    address:string,
    salary:number,
    position:string
}

const Employee:React.FC = ()=>{
    const [employee, setEmployee]=useState<Employee[]>([])

    const [modalState, setModalState]=useState<boolean>(false);

    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [salary,setSalary]=useState<number | ''>(0);
    const [position,setPosition]=useState('');
    const [selectedEmployeeId,setSelectedEmployeeId]=useState('');
    const [updateName,setUpdateName]=useState('');
    const [updateAddress,setUpdateAddress]=useState('');
    const [updateSalary,setUpdateSalary]=useState<number | ''>('');
    const [updatePosition,setUpdatePosition]=useState('');
    useEffect(()=>{
        findAllEmployee();
    }, [])

    const updateEmployee= async ()=>{
        try{
            await AxiosInstance.put('/employee/update/'+selectedEmployeeId,{
                name:updateName,address:updateAddress,salary:updateSalary,position:updatePosition
            });
            setModalState(false);
            findAllEmployee();
        }catch (e){
            console.log(e);
        }
    }

    const findAllEmployee= async ()=>{
        const response = await AxiosInstance.get('employee/find-all?searchText=&page=1&size=10');
        setEmployee(response.data);
    }

    const deleteEmployee= async (id: string)=>{
        await AxiosInstance.delete('/employee/delete-by-id/'+id);
        findAllEmployee();
    }

    const loadModal= async (id: string)=>{
        const employee = await AxiosInstance.get('/employee/find-by-id/'+id);
        console.log(employee.data)
        setSelectedEmployeeId(employee.data._id)
        setUpdateName(employee.data.name)
        setUpdateAddress(employee.data.address)
        setUpdateSalary(parseFloat(employee.data.salary))
        setUpdatePosition(employee.data.position)
        setModalState(true);
    }

    const saveEmployee= async ()=>{
        try{
            const response = await AxiosInstance.post('/employee/create',{
                name,address,salary,position
            });
            console.log(response);
            setName('');
            setAddress('');
            setSalary('');
            setPosition('');
            findAllEmployee();
        }catch (e){
            console.log(e)
        }
    }
    return (
        <>
            <Header />
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="employeeName">Employee Name</label>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className='form-control' id='employeeName'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="employeeAddress">Employee Address</label>
                            <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className='form-control' id='employeeAddress'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="employeeSalary">Salary</label>
                            <input value={salary} onChange={(e)=>{setSalary(parseInt(e.target.value))}}  type="number" className='form-control' id='employeeSalary'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="employeePosition">Position</label>
                            <input value={position} onChange={(e)=>{setPosition(e.target.value)}} type="text" className='form-control' id='employeePosition'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-end">
                    <div className="col-12 col-sm-6 col-md-3">
                        <button onClick={saveEmployee} className='btn btn-dark col-12'>Save Employee</button>
                    </div>
                </div>
                <hr/>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Employee Name</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Position</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employee.map((employee, index)=>
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        <button
                                            onClick={()=>{
                                                if (confirm('are you sure?')){
                                                    deleteEmployee(employee._id)
                                                }
                                            }}
                                            className='btn btn-outline-danger btn-sm'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{
                                            loadModal(employee._id);
                                        }} className='btn btn-outline-success btn-sm'>Update</button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                    </div>
                </div>
           </div>
            <Modal show={modalState}>

                <div className='p-4'>
                    <h2>Update Employee</h2>
                    <hr/>

                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName}
                                   onChange={(e)=>setUpdateName(e.target.value)}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateAddress(e.target.value)}
                                type="text" defaultValue={updateAddress} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateSalary(parseInt(e.target.value))}
                                type="text" defaultValue={updateSalary} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdatePosition(e.target.value)}
                                type="text" defaultValue={updatePosition} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={()=>updateEmployee()}
                        >Update Employee</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Employee