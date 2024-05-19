const express=require( 'express' );
const userController=require( '../Controller/userAuthController' )
const userReqController=require( '../Controller/userReqController' )
const middleware=require( '../Middleware/authentication' )


const apiRoute=express.Router();

apiRoute.post( '/newUserReg', userController.userRegister )
apiRoute.get( '/login', userController.userLogin )
apiRoute.get( "/all", middleware.verifySession, userController.allUserProfile )

apiRoute.post( '/logout', userController.logout )

apiRoute.get( '/', middleware.verifySession, userReqController.userProfile )

module.exports=apiRoute