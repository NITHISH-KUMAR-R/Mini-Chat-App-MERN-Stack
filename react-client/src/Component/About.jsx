import React, { useEffect, useState } from 'react';
import Card from './Card';
import './Timeline.css';
import axios from 'axios';
import Navbar from './Navbar';

const About=() => {
    const [posts, setPosts]=useState( [] );

    useEffect( () => {
        const fetchUserPost=async () => {
            try {
                const response=await axios.get( 'http://localhost:5000/msg/all', {
                    withCredentials: true
                } );
                console.log( response );
                setPosts( response.data );
            } catch ( error ) {
                console.error( 'Error while fetching posts', error );
            }
        };

        fetchUserPost();
    }, [] );

    return (
        <div className="card-container">
            <Navbar />
            <h2>Logged User's Post only</h2>
            {posts.map( post => (
                <Card
                    key={post._id} // Assuming _id is a unique identifier
                    userPost={post}
                />
            ) )}
        </div>
    );

}

export default About;
