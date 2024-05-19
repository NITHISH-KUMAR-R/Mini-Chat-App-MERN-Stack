const mongoose=require( 'mongoose' )
const Schema=mongoose.Schema;
const FriendReqSchema=new Schema( {
    sender: { type: String },
    receiver: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
} )

module.exports=mongoose.model( 'friendRequest', FriendReqSchema )