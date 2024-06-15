import React, { useState, useCallback } from 'react';
import Navbar from '../Component/Navbar';
import './home.css';

const Homepage=() => {
    const [postMessage, setPostMessage]=useState( '' );
    const [responseMessage, setResponseMessage]=useState( '' );

    const handleSubmit=useCallback( async ( event ) => {
        event.preventDefault();
        try {
            const response=await fetch( 'http://localhost:5000/msg/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { postMessage } ),
                credentials: 'include', // Include credentials with each request
            } );
            const data=await response.text();
            if ( response.ok ) {
                setResponseMessage( data );
                setPostMessage( '' ); // Clear the input field on successful post
            } else {
                setResponseMessage( 'Error: '+data );
            }
        } catch ( error ) {
            setResponseMessage( 'Error: '+error.message );
        }
    }, [postMessage] );

    return (
        <>
            <div className='Homecontainer'>
                <div className='home-container'>
                    <Navbar />
                    <h1>Share your thoughts</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={postMessage}
                            onChange={( e ) => setPostMessage( e.target.value )}
                            placeholder='Write your message here...'
                            required
                        />
                        <button type='submit'>Post</button>
                    </form>
                    {responseMessage&&<p>{responseMessage}</p>}
                </div>
            </div>
        </>
    );
};

export default Homepage;
