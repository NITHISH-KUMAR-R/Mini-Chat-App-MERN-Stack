import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Friend.css';

const FriendComponent=() => {
    const [allUsers, setAllUsers]=useState( [] );

    useEffect( () => {
        const fetchAllUsers=async () => {
            try {
                const response=await axios.get( 'http://localhost:5000/user/all', { withCredentials: true } );
                setAllUsers( response.data );
            } catch ( error ) {
                console.error( 'Error fetching users:', error );
            }
        };

        fetchAllUsers();
    }, [] );

    return (
        <div className="friend-container">
            <h1>All Users</h1>
            <div className="user-list">
                {allUsers.map( ( user ) => (
                    <div key={user._id} className="user-card">
                        <h2>{user.username}</h2>
                        <p>Email: {user.email}</p>
                        <p>Date Joined: {new Date( user.date ).toLocaleDateString()}</p>
                    </div>
                ) )}
            </div>
        </div>
    );
};

export default FriendComponent;
// .friend-container {
//     max-width: 800px;
//     margin: 0 auto;
//     padding: 20px;
//     background-color: #f0f0f0;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     box-shadow: 0 0 10px rgba( 0, 0, 0, 0.1 );
//     font-family: Arial, sans-serif;
// }

// .friend-container h1 {
//     text-align: center;
//     margin-bottom: 20px;
//     color: #333;
// }

// .user-list {
//     display: grid;
//     grid-template-columns: repeat( auto-fill, minmax( 250px, 1fr ) );
//     gap: 20px;
// }

// .user-card {
//     background-color: #fff;
//     padding: 15px;
//     border-radius: 8px;
//     box-shadow: 0 0 5px rgba( 0, 0, 0, 0.1 );
// }

// .user-card h2 {
//     font-size: 18px;
//     margin-bottom: 10px;
//     color: #333;
// }

// .user-card p {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 5px;
// }
