import React, {ChangeEvent, useEffect, useState} from "react";
import AxiosInstance from '../config/axiosInstance';
import {Modal} from "react-bootstrap";
import Header from "./cards/Header";

interface Product{
    _id:string,
    name:string,
    description:string,
    unitPrice:number,
    qtyOnHand:number
}

const Product:React.FC = ()=>{

    const [products, setProducts]=useState<Product[]>([]);
    const [modalState, setModalState]=useState<boolean>(false);

    const [name,setName]=useState('');
    const [selectedProductId,setSelectedProductId]=useState('');

    const [description,setDescription]=useState('');
    const [unitPrice,setUnitPrice]=useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]=useState<number | ''>('');
    const [updateName,setUpdateName]=useState('');
    const [updateDescription,setUpdateDescription]=useState('');
    const [updateUnitPrice,setUpdateUnitPrice]=useState<number | ''>('');
    const [updateQtyOnHand,setUpdateQtyOnHand]=useState<number | ''>('');
    useEffect(()=>{
        findAllProducts();
    }, [])


    const updateProduct= async ()=>{
         try{
             await AxiosInstance.put('/products/update/'+selectedProductId,{
                 name:updateName,description:updateDescription,unitPrice:updateUnitPrice,qtyOnHand:updateQtyOnHand
             });
             setModalState(false);
             findAllProducts();

         }catch (e){
             console.log(e)
         }
     }

    const findAllProducts= async ()=>{
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
    }

    const deleteProduct= async (id: string)=>{
        await AxiosInstance.delete('/products/delete-by-id/'+id);
        findAllProducts();
    }


    const saveProduct=async ()=>{
        try{
            await AxiosInstance.post('/products/create',{
                name,description,unitPrice,qtyOnHand
            });
            setName('');
            setDescription('');
            setQtyOnHand('');
            setUnitPrice('');

            findAllProducts();

        }catch (e){
            console.log(e)
        }
    }
    const loadModal= async (id: string)=>{
        const product = await AxiosInstance.get('/products/find-by-id/'+id);
        console.log(product.data);
        setSelectedProductId(product.data._id);
        setUpdateName(product.data.name);
        setUpdateDescription(product.data.description);
        setUpdateUnitPrice(product.data.unitPrice);
        setUpdateQtyOnHand(product.data.qtyOnHand);

        setModalState(true);
    }
    const styleObj:React.CSSProperties={
        marginBottom:'20px'
    }

    return (
        <>
            <Header />
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input value={name} type="text" onChange={(e)=>setName(e.target.value)} className='form-control' id='productName'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input  value={unitPrice} onChange={(e)=>setUnitPrice(parseFloat(e.target.value))} type="number" className='form-control' id='price'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="qty">QTY On Hand</label>
                            <input value={qtyOnHand} onChange={(e)=>setQtyOnHand(parseFloat(e.target.value))} type="number" className='form-control' id='qty'/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  rows={5} className='form-control' id='description'/>
                        </div>
                    </div>

                </div>
                <br/>
                <div className="row justify-content-end">
                    <div className="col-12 col-sm-6 col-md-4">
                        <button className='btn btn-dark col-12' onClick={saveProduct}>Save Product</button>
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
                                <th>Product Name</th>
                                <th>QTY On Hand</th>
                                <th>Unit Price</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index)=>
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.qtyOnHand}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>
                                        <button className='btn btn-outline-danger btn-sm' onClick={()=>{
                                                    if(confirm('are you sure?')){
                                                        deleteProduct(product._id)
                                                    }
                                            }
                                        }
                                        >Delete</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-success btn-sm' onClick={()=>{loadModal(product._id);}}>Update</button>
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
                                onChange={(e)=>setUpdateDescription(e.target.value)}
                                type="text" defaultValue={updateDescription} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateUnitPrice(parseFloat(e.target.value))}
                                type="text" defaultValue={updateUnitPrice} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateQtyOnHand(parseFloat(e.target.value))}
                                type="text" defaultValue={updateQtyOnHand} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={()=>updateProduct()}
                        >Update Product</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Product;