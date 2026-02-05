

let success=true;
export const checkAuth = (req, res, next) => {
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

