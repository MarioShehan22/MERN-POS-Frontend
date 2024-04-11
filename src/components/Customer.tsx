import React, {useEffect} from "react";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import AxiosInstance from '../config/axiosInstance';
import Header from "./cards/Header";
interface Customer{
    _id:string,
    name:string,
    address:string,
    phone:string
}
const Customer:React.FC =() =>{

        const [customers, setCustomers]=useState<Customer[]>([])

        const [modalState, setModalState]=useState<boolean>(false);

        const [name,setName]=useState('');
        const [address,setAddress]=useState('');
        const [phone,setPhone]=useState('');

        const [selectedCustomerId,setSelectedCustomerId]=useState('');
        const [updateName,setUpdateName]=useState('');
        const [updateAddress,setUpdateAddress]=useState('');
        const [updatePhone,setUpdatePhone]=useState('');

        useEffect(()=>{
            findAllCustomers();
        }, [])

        const updateCustomer= async ()=>{
            try{
                await AxiosInstance.put('/customers/update/'+selectedCustomerId,{
                    name:updateName,address:updateAddress,phone:updatePhone
                });
                setModalState(false);
                findAllCustomers();

            }catch (e){
                console.log(e);
            }
        }
        const findAllCustomers= async ()=>{
            const response = await AxiosInstance.get('/customers/find-all?searchText=&page=1&size=10');
            setCustomers(response.data);
        }

        const deleteCustomer= async (id: string)=>{
            await AxiosInstance.delete('/customers/delete-by-id/'+id);
            findAllCustomers();
        }

        const loadModal= async (id: string)=>{
           const customer = await AxiosInstance.get('/customers/find-by-id/'+id);
           console.log(customer.data)
            setSelectedCustomerId(customer.data._id)
            setUpdateName(customer.data.name)
            setUpdateAddress(customer.data.address)
            setUpdatePhone(customer.data.phone)

            setModalState(true);
        }

        const saveCustomer= async ()=>{
            try{
               const response = await AxiosInstance.post('/customers/create',{
                    name,address,phone
                });
                console.log(response);

                setName('');  //To clear the form after saving the customer
                setPhone('');  //To clear the form after saving the customer
                setAddress(''); //To clear the form after saving the customer
                findAllCustomers();

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
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name</label>
                                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className='form-control' id='customerName'/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="form-group">
                                <label htmlFor="customerAddress">Customer Address</label>
                                <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className='form-control' id='customerAddress'/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="form-group">
                                <label htmlFor="customerPhone">Phone</label>
                                <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" className='form-control' id='customerSalary'/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row justify-content-end">
                        <div className="col-12 col-sm-6 col-md-4">
                            <button onClick={saveCustomer} className='btn btn-dark col-12'>Save Customer</button>
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
                                    <th>Customer Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Delete Option</th>
                                    <th>Update Option</th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers.map((customer, index)=>
                                    <tr key={index}>
                                        <td>#{index}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.phone}</td>
                                        <td>
                                            <button
                                                onClick={()=>{
                                                    if (confirm('are you sure?')){
                                                        deleteCustomer(customer._id)
                                                    }
                                                }}
                                                className='btn btn-outline-danger btn-sm'>Delete</button>
                                        </td>
                                        <td>
                                            <button onClick={()=>{
                                                loadModal(customer._id);}} className='btn btn-outline-success btn-sm'>Update</button>
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
                        <h2>Update Customer</h2>
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
                                    onChange={(e)=>setUpdatePhone(e.target.value)}
                                    type="text" defaultValue={updatePhone} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-12">
                            <button type='button' className='btn-success btn col-12'
                                    onClick={()=>updateCustomer()}
                            >Update Customer</button>
                            <br/>
                            <br/>
                            <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close</button>
                        </div>
                    </div>
                </Modal>
            </>
        )
}

export default Customer