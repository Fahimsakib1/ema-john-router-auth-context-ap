import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import './SignUp.css';
import Swal from 'sweetalert2'


const SignUp = () => {

    const [passwordError, setPasswordError] = useState('');

    const { createUser } = useContext(AuthContext);

    const handleSubmit = (event) => {

        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        console.log(email, password, confirmPassword);

        if (password !== confirmPassword) {
            setPasswordError('Password is not matching');

            return;
        }

        if (password.length < 6) {
            setPasswordError("Password should be more than 6 characters ");
            return;
        }
        setPasswordError('');

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire(
                    'Done!',
                    'User created successfully!',
                    'success'
                )
                event.target.reset();
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sign Up Failed!'
                })
            })


    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id="" placeholder='Enter Email' required />
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id="" placeholder='Enter password' required />
                </div>

                <div className="form-control">
                    <label htmlFor='confirm'>Confirm Password</label>
                    <input type="password" name="confirmPassword" id="" placeholder='Confirm Password' required />
                </div>

                {
                    passwordError ? <p style={{ color: 'red' }}>{passwordError}</p>
                        : <p>{''}</p>
                }

                <input className='button-submit' type="submit" value="Sign Up" />
            </form>
            <p className='new-to-ema-john'>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;