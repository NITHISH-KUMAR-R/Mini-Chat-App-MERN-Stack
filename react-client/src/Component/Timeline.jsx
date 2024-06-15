// src/Component/Timeline.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import './Timeline.css';
import axios from 'axios';
import Navbar from './Navbar';
axios.defaults.withCredentials=true;

const Timeline=() => {
    const [posts, setPosts]=useState( [] );

    useEffect( () => {
        const fetchPosts=async () => {
            try {
                const response=await axios.get( 'http://localhost:5000/msg/allUserspost', {
                    withCredentials: true
                } );
                setPosts( response.data );
            } catch ( error ) {
                console.error( 'Error while fetching posts', error );
            }
        };

        fetchPosts();
    }, [] );

    const formatDate=( dateString ) => {
        const options={ year: 'numeric', month: 'long', day: 'numeric' };
        const date=new Date( dateString );
        return date.toLocaleDateString( undefined, options );
    };


    return (
        <div className='card-container'>
            <Navbar />

            {posts.map( post => (
                post.messagesList.map( message => (
                    <Card
                        key={message._id}
                        username={post.username.toUpperCase()} // Accessing username from the post object
                        userPost={message.userPost}
                        likes={message.likes}
                        disLikes={message.disLikes}
                        date={formatDate( message.date )}
                    />
                ) )
            ) )}
        </div>
    );
};

export default Timeline;
