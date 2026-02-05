

let success=true;
export const checkAuth = (req, res, next) => {
    console.log("Checking Authentication");
    console.log(req.body);
    const {token}  = req.headers;
    const {authorization} = req.headers;
    console.log("Received Token:", token);
    console.log("Received Authorization:", authorization);
   if(success){
        console.log("Authentication Checked");

        next();
   }else{
        console.log("Authentication Failed");
        // res.send(401,()=>{
        //     message:"Authentication Failed",
        //     success:false
        // })
        res.status(401).json({
            message: "Authentication Failed",
            success: false
        });
   }
};

export const validateUserId = (req, res, next) => {
    console.log("Validating User ID:", req.params.id);
    const {id} = req.params;

    if(!id || id.length < 5){
        return res.status(400).json({
            success: false,
            message: "Invalid User ID"
        });
    }
    next();
};

export const validate= (schema)=>(req,res,next)=>{
    let result=schema.safeParse(req.body);
    if(result.success){
        next();
    }
    else{
        const messages = result.error.issues.map(err => err.message);
        console.log("Validation Errors:", messages);
        return res.status(400).json({
            success:false,
            message: messages.join(', '),
            errors: messages
        });
    }
}