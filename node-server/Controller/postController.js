const postModel=require( '../Schema/postSchema' )
const userModel=require( '../Schema/userData' );
const { like }=require( './postLikesDislikes' );

const userPost=async ( req, res ) => {
    const user_Id=req.session.userSession.Userid;

    const { postMessage }=req.body;
    console.log( postMessage )
    try {
        const userData=await userModel.findById( user_Id ).exec();
        let postDatabse=await postModel.findOne( { uid: user_Id } ).exec();
        // console.log( postDatabse )
        if ( !postDatabse ) {
            ///console.log( userData )

            postDatabse=new postModel( {
                uid: user_Id,
                username: userData.username,
                messagesList: [{ userPost: postMessage, like: 1, disLikes: 1 }],

            } )
        } else {

            postDatabse.messagesList.push( { userPost: postMessage } );

        }

        await postDatabse.save();
        res.send( "User post saved asuccessfully to the Post DB" )

    } catch ( err ) {
        res.status( 500 ).send( "Internal server error" );

    }
}


const geloginUserPost=async ( req, res ) => {
    const user_ID=req.session.userSession.Userid;
    try {
        const postDatabse=await postModel.findOne( { uid: user_ID } ).exec();
        const usersAllPost=postDatabse.messagesList.map( p => p.userPost )
        console.log( usersAllPost )
        res.json( usersAllPost )



    } catch ( err ) {
        res.status( 500 ).send( "Internal Server Error" )

    }
}

const allUserPost=async ( req, res ) => {
    console.log( "hello" )
    try {
        const postDatabse=await postModel.find().exec();
        const messages=postDatabse.map( p => p.messagesList ).flat()
        messages.forEach( post => {
            console.log( "User Post:", post.userPost );
            console.log( "_id:", post._id );
            // Do whatever you need with the post datas
        } );

        //console.log( messages )
        res.send( messages )

    } catch ( err ) {
        res.status( 500 ).send( "Internal Server Error" )
    }
}
module.exports={ userPost, geloginUserPost, allUserPost }