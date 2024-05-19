const express=require( 'express' )
const mongoose=require( 'mongoose' )
const router=require( './Router/userRouter' )
const friendRouter=require( './Router/friendRouter' )
const postRouter=require( './Router/postRouter' )
const likeRouter=require( './Router/likeDisLikeRouter' )
const session=require( 'express-session' );
const MongoStore=require( 'connect-mongo' );
const fs=require( 'fs' );
const crypto=require( 'crypto' );

// Read existing contents of .env file
let envContents='';
try {
    envContents=fs.readFileSync( '.env', 'utf8' );
} catch ( err ) {
    // File might not exist yet, which is okay
}
// Check if SESSION_SECRET_KEY already exists
if ( !envContents.includes( 'SESSION_SECRET_KEY' ) ) {
    // Generate a random secret
    const secret=crypto.randomBytes( 64 ).toString( 'hex' );
    // Append the new secret to the existing contents
    envContents+=`\nSESSION_SECRET_KEY=${ secret }\n`;
    // Write the updated contents back to the .env file
    fs.writeFileSync( '.env', envContents );
    console.log( 'Secret generated and appended to .env file.' );
} else {
    console.log( 'SESSION_SECRET_KEY already exists in .env file. Skipping generation.' );
}
require( 'dotenv' ).config();

const app=express();
app.use( express.json() );


app.use( session( {
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create( {
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24*3600, // time period in seconds
        dbName: 'project-session-db'
    } )
} ) );

mongoose.set( 'strictQuery', false );
const mongoDbURL=process.env.MONGO_URI;
main().catch( err => {
    console.log( err )
} )
async function main() {
    await mongoose.connect( mongoDbURL )
}
//app.use( '/reg', router )
const mongoDb=mongoose.connection;
mongoDb.on( 'error', err => {
    console.log( err )
} )
mongoDb.once( 'open', () => {
    console.log( 'Connection successfullly opened to MongoDb NoSQL' )
} )
// mongoDb.createCollection( 'UserDetails' )
app.use( '/reg', router )
app.use( '/user', router )
app.use( '/friend', friendRouter )
app.use( '/msg', postRouter )
app.use( '/heart', likeRouter )

const PORT=process.env.PORT;
app.listen( PORT, () => {
    console.log( `Server is listening on the port${ PORT }` )
} )

