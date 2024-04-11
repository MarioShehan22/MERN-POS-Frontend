import * as React from "react";
import DefaultCard from "./cards/DefaultCard";
import {useEffect, useState} from "react";
import AxiosInstance from '../config/axiosInstance';
import Header from "./cards/Header.tsx";

class Product {

}

const Home:React.FC=()=>{

    const [products, setProducts] = useState<Product[]>([]);
    const [productCount, setProductCount] = useState<number>();
    const [orderCount, setOrderCount] = useState<number>();
    const [customerCount, setCustomerCount] = useState<number>();
    const [employeeCount, setEmployeeCount] = useState<number>();
    const [income, setIncome] = useState<number[]>();
    useEffect(()=>{
        findAllProducts();
        //findIncomeData();
        findAllCounts();
    }, [])
    const findAllProducts= async ()=>{
        const response = await AxiosInstance.get('/products/find-all-min');
        setProducts(response.data);
    }

    const findAllCounts= async ()=>{
        const productCount = await AxiosInstance.get('/products/find-all-count');
        setProductCount(productCount.data);

        const customerCount = await AxiosInstance.get('/customers/find-count');
        setCustomerCount(customerCount.data);

        const orderCount = await AxiosInstance.get('/orders/find-count');
        setOrderCount(orderCount.data);

        const employeeCount = await AxiosInstance.get('/employee/find-count');
        setEmployeeCount(employeeCount.data)
    }

    return(
            <>
                <Header/>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <DefaultCard
                                thumbnail='https://img.freepik.com/free-photo/medium-shot-people-shaking-hands_23-2149300663.jpg?w=740&t=st=1702482726~exp=1702483326~hmac=fb4ca3ec3a58df9736c0172c50551ef96768efabe18534aa3ee635b800b26507'
                                description='This is the number of customers'
                                title='Customers'
                                value={customerCount}
                                key={1}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <DefaultCard
                                thumbnail='https://miro.medium.com/v2/resize:fit:1400/0*J62lzGetZ457k58F'
                                description='This is the number of Products'
                                title='Products'
                                value={productCount}
                                key={1}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <DefaultCard
                                thumbnail='https://st4.depositphotos.com/1000816/21779/i/450/depositphotos_217795356-stock-photo-guy-satisfied-carries-bag.jpg'
                                description='This is the number of Orders'
                                title='Orders'
                                value={orderCount}
                                key={1}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <DefaultCard
                                thumbnail='https://img.freepik.com/free-photo/close-up-smiley-woman-working-laptop_23-2149300651.jpg?w=740&t=st=1706032227~exp=1706032827~hmac=0f467b53646b66b21af15ea74ca5787beb414015064579de12b3ef14d11f428c'
                                description='This is the number of Employees'
                                title='Employee'
                                value={employeeCount}
                                key={1}
                            />
                        </div>
                    </div>
                    <br/>
                </div>
            </>
    )
}

export default Home