import React, {useState} from "react";
import AxiosInstance from '../config/axiosInstance.ts';
import {Link } from "react-router-dom";

const Login:React.FC = ()=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const login=async ()=>{
        try{
            const response = await AxiosInstance.post('/users/login',{
                email,password
            });
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate()+2);
            const cookieValue=encodeURIComponent('token')+'=' +encodeURIComponent(response.data)+'; expires='+expirationDate.toUTCString()+'; path=/';
            document.cookie=cookieValue;
            console.log(response.data);
            setEmail('');
            setPassword('');
        }catch (e){
            setErrorMessage('Incorrect email or password. Please try again.');
        }
    }
    return(
        <>
            <div className="container border" >
            <br/>
                <div className="container d-flex align-items-center justify-content-center border">
                    <div className="row d-flex align-items-center justify-content-center border">
                        <div className="col-8">
                            <div className="form-floating mb-3">
                                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className='form-control' id="floatingInput"  placeholder='Email here'/>
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-floating mb-3">
                                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className='form-control' id="floatingPassword" placeholder='Password here'/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                        </div>
                        <div className="col-8 ">
                            <br/>
                            {errorMessage && <div className="col-12 text-danger">{errorMessage}</div>}
                            <Link className="btn btn-secondary col-12" onClick={login} >Login</Link>
                            <br />
                            <br />
                            <Link to="/" style={{ display: 'none' }}/>
                            <Link to="/signup" className='btn btn-outline-dark col-12'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;