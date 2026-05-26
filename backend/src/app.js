import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import errorHandler from './middlewares/errorhanler.middleware.js';

const app = express();
app.use(cookieparser());

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}));

app.use(express.static('public'));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.json({limit:'16kb'}));

app.get('/',(req,res)=>{
    res.send("Api is running")
})

//routes

import userRouter from './routes/user.route.js';
app.use('/api/v1/user',userRouter)


app.use(errorHandler)
export {app}