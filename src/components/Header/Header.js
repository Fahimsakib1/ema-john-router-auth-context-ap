import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';
import Swal from 'sweetalert2';


const Header = () => {
    const { user, signOutUser } = useContext(AuthContext)
    //console.log(user);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire(
                    'Done!',
                    'Sign Out done successfully!',
                    'success'
                );
                navigate('/login')
            })
    }


    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='header-menu'>
                <Link to='/'>Shop</Link>
                <Link to='/orders'>Orders</Link>
                <Link to='/inventory'>Inventory</Link>
                <Link to='/about'>About</Link>
                {
                    user?.uid ?
                        <Link><button onClick={handleSignOut}>Log Out</button></Link>
                        :
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Sign Up</Link>
                        </>

                }

                {
                    user?.email ?
                        <p style={{ color: "goldenrod" }}>Welcome, {user.email}</p>
                        :
                        <p>{''}</p>
                }
            </div>
        </nav>
    );
};

export default Header;