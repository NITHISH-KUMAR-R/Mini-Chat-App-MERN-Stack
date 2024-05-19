const friendModel=require( '../Schema/friendSchema' )
const userModel=require( '../Schema/userData' )
const friendReqModel=require( '../Schema/friendRequestSchema' )


const displayAllFriends=async ( req, res ) => {

    const user_id=req.session.userSession.Userid;
    try {
        const friendListt=await friendModel.findOne( { userid: user_id } ).exec();
        const friendNames=friendListt.friendList.map( f => f.fName )
        console.log( friendNames )
        res.send( friendNames )
    }
    catch ( err ) {
        console.log( err )
        res.status( 500 ).send( "Internal Server error while fetching all friend for session user" )
    }
}




const sendFriendRequest=async ( req, res ) => {
    //const user_id=req.session.userSession.Userid;
    const senderId=req.session.userSession.Userid;
    const receiverId=req.params.recieverId;
    console.log( "reciever", receiverId )
    try {
        const friendReqDb=new friendReqModel( {
            sender: senderId,
            receiver: receiverId,
            status: 'pending'

        } )
        await friendReqDb.save()
        res.send( 'Friend request Send Successfully' )
    } catch ( err ) {
        console.error( err )
        res.status( 500 ).send( "Error Sending friend Request" )

    }
}

const addingAcceptedFriendlist = async (accepterId, requestedId) => {
    try {
        // Fetch user data
        const userData = await userModel.findById(accepterId).exec();
        const friendData = await userModel.findById(requestedId).exec();

        if (!userData || !friendData) {
            return { success: false, message: "User or friend not found" };
        }

        // Check if friend already exists
        const userAlreadyFriend = await friendModel.exists({ userid: accepterId, "friendList.user_id": requestedId });
        if (userAlreadyFriend) {
            return { success: false, message: "Friend already exists" };
        }

        const friendAlreadyFriend = await friendModel.exists({ userid: requestedId, "friendList.user_id": accepterId });
        if (friendAlreadyFriend) {
            return { success: false, message: "Friend already exists" };
        }

        // Update user's friend list
        let accepterFriendList = await friendModel.findOne({ userid: accepterId }).exec();
        if (!accepterFriendList) {
            accepterFriendList = new friendModel({
                username: userData.username,
                userid: accepterId,
                friendList: [],
            });
        }

        accepterFriendList.friendList.push({ user_id: requestedId, fName: friendData.username, fEmail: friendData.email });
        await accepterFriendList.save();

        // Update friend's friend list
        let requestedFriendList = await friendModel.findOne({ userid: requestedId }).exec();
        if (!requestedFriendList) {
            requestedFriendList = new friendModel({
                username: friendData.username,
                userid: requestedId,
                friendList: [],
            });
        }

        requestedFriendList.friendList.push({ user_id: accepterId, fName: userData.username, fEmail: userData.email });
        await requestedFriendList.save();

        return { success: true, message: 'Friend added successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal Server Error while adding friend" };
    }
};




const acceptFriend=async ( req, res ) => {
    const accepter_RecieverId=req.session.userSession.Userid;
    const requestedId=req.params.reqId;
  //  console.log( "AccepterId", accepter_RecieverId )
  //  console.log( "requestedId", requestedId )
    try {
            const existingRequest = await friendReqModel.findOne({
            sender: requestedId,
            receiver: accepter_RecieverId,
            status: { $in: ['pending', 'accepted'] }
        }).exec();

        if (existingRequest) {
            // If there's already a pending or accepted request, return without further processing
            return res.status(400).send("Friend request already exists and accepeted it");
        }
        await ( addingAcceptedFriendlist( accepter_RecieverId, requestedId ) );
        await friendReqModel.findOneAndUpdate(
            { sender: requestedId, receiver: accepter_RecieverId, status: 'pending' }, 
            { status: 'accepted' }
        );
        return res.send( "FriendList Added to Both user Successfully" )

    } catch ( err ) {
        console.log( err );
        res.status( 500 ).send( "Error Accepting friend request" )
    }


}

module.exports={ displayAllFriends, sendFriendRequest, acceptFriend }































//const acceptFriendRequest=async ( req, res ) => {
    //     const user_id=req.session.userSession.Userid;
    
    //     const friend_id=req.params.id;
    
    //     try {
    //         const userData=await userModel.findById( user_id ).lean().exec();
    //         const friendData=await userModel.findById( friend_id ).lean().exec();
    //         const friendDatabase=await friendModel.findOne( { "friendList": { $elemMatch: { user_id: friend_id } } } ).lean().exec();
    //         if ( !userData||!friendData ) {
    //             return res.status( 404 ).send( "User or friend not found" );
    //         }
    
    //         if ( friendDatabase&&friendDatabase.friendList ) {
    //             const existingFriend=friendDatabase.friendList.find( f => f.user_id.toString()===friend_id.toString() );
    //             if ( existingFriend ) {
    //                 return res.status( 400 ).send( "Friend already exists" );
    //             }
    //         }
    
    //         const friendDb=new friendModel( {
    //             username: userData.username,
    //             userid: user_id,
    //             friendList: [{ user_id: friendData._id, fName: friendData.username, fEmail: friendData.email }],
    //         } )
    
    //         await friendDb.save();
    //         res.send( 'Friend Added to the user who logged into the session' )
    
    //     } catch ( error ) {
    //         console.error( error )
    
    //         res.status( 500 ).send( "Internal Server Error for while adding Friend" )
    //     }
    
    // }





    //const acceptRequestFromSender=async ( req, res ) => {
        //     const receiverId=req.session.userSession.Userid;
        //     console.log( receiverId )
        //     const requestId=req.params.reqId;
        //     console.log( requestId )
        //     try {
        //         const pendingRequest=await friendReqModel.find( { sender: requestId } ).exec();
        //         console.log( pendingRequest )
        //         const friendRequest=await friendReqModel.find( { receiver: receiverId } ).exec();
        //         //console.log( friendRequest.receiver )
        //         let found=false; // Flag to track if the receiver ID matches
        
        //         friendRequest.forEach( request => {
        //             console.log( "Receiver:", request.receiver );
        //             // Check if the receiver ID matches the logged-in user
        //             if ( request.receiver===receiverId ) {
        //                 found=true; // Set the flag to true if receiver ID matches
        //             }
        //             // You can access other properties as well, such as request.sender, request.status, etc.
        //         } );
        
        //         // Check if the receiver ID was not found in any friend requests
        //         if ( !found ) {
        //             return res.status( 404 ).send( "Friend request not found or unauthorized" );
        //         }
        //         // Update the status of the friend request to 'accepted'
        //         for ( const request of friendRequest ) {
        //             request.status='accepted';
        //             await request.save();
        //         }
        
        //         // Add receiver to sender's friend list
        //         const senderFriendList=await friendModel.findOne( { userid: requestId } );
        //         senderFriendList.friendList.push( {
        //             user_id: receiverId,
        //             fName: req.session.userSession.username, // Assuming you have the username in the session
        //             fEmail: req.session.userSession.email // Assuming you have the email in the session
        //         } );
        //         await senderFriendList.save();
        
        //         // Add sender to receiver's friend list
        //         const receiverFriendList=await friendModel.findOne( { userid: receiverId } );
        //         receiverFriendList.friendList.push( {
        //             user_id: requestId,
        //             fName: senderFriendList.username, // Assuming you have the username in the friendModel
        //             fEmail: senderFriendList.email // Assuming you have the email in the friendModel
        //         } );
        //         await receiverFriendList.save();
        
        
        
        //     }
        //     catch ( err ) {
        //         console.error( err )
        //         res.status( 500 ).send( "Error Accepting friend Request" )
        //     }
        // }