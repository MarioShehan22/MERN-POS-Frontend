import React, {useState} from "react";
import AxiosInstance from '../config/axiosInstance.ts';
import {Link} from "react-router-dom";

const Signup:React.FC = ()=>{
    const [fullName, setFullName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const signup= async ()=>{
        try{
            const response = await AxiosInstance.post('/users/register',{
                fullName,email,password
            });
            console.log(response);
            setEmail('');
            setFullName('');
            setPassword('');
        }catch (e){
            console.log(e)
        }
    }
    return(
        <>
            <br/>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-8">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                onChange={(e) => {setFullName(e.target.value)}}
                                className='form-control '
                                placeholder='Full Name here'
                                id="floatingInput"
                            />
                            <label htmlFor="floatingInput">Full Name</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                onChange={(e) => {setEmail(e.target.value)}}
                                className='form-control '
                                placeholder='Email here'
                                id="floatingInput"
                            />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                onChange={(e) => {setPassword(e.target.value)}}
                                className='form-control'
                                placeholder='Password here'
                                id="floatingPassword"
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="col-8">
                        <div>
                            <br/>
                            <button className='btn btn-secondary col-12' onClick={signup}>Register Now</button>
                            <br/>
                            <br/>
                            <Link to="/login" style={{ display: 'none' }}/>
                            <Link to="/login" className='btn btn-outline-dark col-12'>Already have an Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signup;