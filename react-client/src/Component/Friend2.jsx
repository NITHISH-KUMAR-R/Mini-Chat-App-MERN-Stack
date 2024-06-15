import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Friend2.css'


const Friend2=() => {

    const [friend, setAllFriends]=useState( [] );

    useEffect( () => {
        const fetchFriends=async () => {
            try {
                const response=await axios.get( 'http://localhost:5000/friend/all' )
                const friends=response.data;
                console.log( friends )
                setAllFriends( friends )

            } catch ( error ) {
                console.error( 'While Fetching Friends', error )

            }
        }


        fetchFriends();
    }, [] )
    return (
        <div className='user-friends'>
            <h1>Logged In User's Friends</h1>
            <ul className='friends'>
                {friend.map( f => {
                    return <li key={f._id}>{f.fName}</li>
                }
                )}
            </ul>
        </div>
    )
}

export default Friend2