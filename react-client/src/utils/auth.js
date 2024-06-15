// src/utils/auth.js
export const isAuthenticated=() => {
    const user=localStorage.getItem( 'user' ); // Replace 'user' with your actual localStorage key
    if ( !user ) return false;

    try {
        const userData=JSON.parse( user );
        return userData&&userData.message==="User Logged In Successfully";
    } catch ( e ) {
        return false;
    }
};
