const express=require( 'express' );
const friendController=require( '../Controller/friendController' )
const middleware=require( '../Middleware/authentication' )


const friendRoute=express.Router();
console.log( "hello" )

friendRoute.get( '/all', middleware.verifySession, friendController.displayAllFriends )
// friendRoute.post( '/accept/:id', middleware.verifySession, friendController.acceptFriendRequest )
friendRoute.post( '/req/:recieverId', middleware.verifySession, friendController.sendFriendRequest )
// friendRoute.post( '/accFrndreq/:reqId', middleware.verifySession, friendController.acceptRequestFromSender )
friendRoute.post( '/pending/:reqId', middleware.verifySession, friendController.acceptFriend )

module.exports=friendRoute