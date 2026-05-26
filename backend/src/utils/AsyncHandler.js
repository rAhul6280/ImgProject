const asycHandler= (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch(err=>next(err));
    }
}

export default asycHandler

//isko samajhne ke liye ulta flow smjho