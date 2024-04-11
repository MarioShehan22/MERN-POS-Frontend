import React from 'react';
import { Link  } from 'react-router-dom';

const Header = () => {
    // Check the current route and decide whether to show the header
    const shouldShowHeader = !['/login', '/signup'].includes(window.location.pathname);

    if (!shouldShowHeader) {
        return null; // Return null to prevent rendering the header
    }

    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" aria-current="page">
                    <img src="https://png.pngtree.com/png-clipart/20201216/original/pngtree-grocery-logo-with-shopping-bag-and-food-png-image_5714803.jpg" alt="" className='logo'/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main_nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/product'>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/customer'>Customers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/order'>Order</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/employee'>Employee</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Log out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;