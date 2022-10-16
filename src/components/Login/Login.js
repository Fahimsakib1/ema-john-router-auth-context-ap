import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import './Login.css';
import Swal from 'sweetalert2';

const Login = () => {
    
    const {signInUser} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleSignIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire(
                'Done!',
                'Sign in done successfully!',
                'success'
            )
            event.target.reset();
            navigate(from, {replace: true})
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sign In Failed!'
            })
        })

    }
    
    return (
        <div className='form-container'>
            <h2 className='form-title'> Login</h2>
            <form onSubmit={handleSignIn}>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id ="" placeholder='Enter Email' required/>
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id ="" placeholder='Enter password' required/>
                </div>

                <input className='button-submit' type="submit" value="Login" />
            </form>
            <p className='new-to-ema-john'>New To Ema John? <Link to='/signup'>Create a New Account</Link></p>
        </div>
    );
};

export default Login;