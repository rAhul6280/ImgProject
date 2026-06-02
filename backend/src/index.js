import 'dotenv/config' 
import {app} from './app.js'
import connectDB from './db/mongodb.js'

 connectDB().then(
   ()=>{
    const port = process.env.PORT || 5000
   console.log(`App is running on port ${port}`);
}
).catch((err)=>console.log("Error: ",err))
