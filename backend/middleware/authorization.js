const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{

    try {
        if(req.headers.authorization===undefined){
            return res.status(406).json({error:'No authentication token,authorization denied'}); 
        }
    
        let token = req.headers.authorization;
    
        const verify = jwt.verify(token,process.env.JWT_SECRET);
    
        if(!verify){
            return res.status(406).json({error:'Token verification failed,autorization denied'}); 
        }
    
        req.user_id = verify.id;
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    next();

}

module.exports = auth;