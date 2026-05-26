
const errorHandler= async (err,req,res,next) => { 
    const statusCode=err.statusCode || 500;
    const response={
        success:false,
        message:err.message || "Internal Server Error",
        errors:err.errors || [],
        data:null
    }
    if(process.env.NODE_ENV==='development'){
        response.stack=err.stack
    }

    res.status(statusCode).json(response);
    
}

export default errorHandler;