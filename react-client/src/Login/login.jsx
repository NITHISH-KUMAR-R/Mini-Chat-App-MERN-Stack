import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login=() => {
    const [isLoginMode, setIsLoginMode]=useState( true )
    // const [userName, setUserName]=useState( '' );
    // const [password, setPassword]=useState( '' );

    const [formData, SetFromData]=useState( {
        userName: '',
        password: ''
    } )
    const [todos, setTodos]=useState( [] );



    const handleInputChange=useCallback( ( e ) => {
        const { name, value }=e.target;
        SetFromData( prevState => ( { ...prevState, [name]: value } ) )

    }, [] )

    const navigate=useNavigate();
    useEffect( () => {
        const fetchTodos=async () => {
            const data=await getTodos();
            setTodos( data );
        };
        fetchTodos();
    }, [] );


    const handleSubmit=( e ) => {
        navigate( '/timeline' )


        //e.preventDefault();

    }

    return (
        <div className="login-container">
            <h1>{isLoginMode? 'Login':'SignUp'}</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="username-container">
                    <label htmlFor="username">UserName:</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.userName}
                        onChange={handleInputChange}
                        name="userName" // <-- Add name attribute
                        required
                    />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        name="password" // <-- Add name attribute
                        required
                    />

                </div>

                <button text='Submit'>{isLoginMode? 'Login':'SignUp'}</button>

            </form>
            <p onClick={() => setIsLoginMode( !isLoginMode )}>{isLoginMode? 'New User':'Account Already Exist'}</p>



        </div>



    )
}

export default Login;