import jwt from 'jsonwebtoken'

const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader||!authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message: 'No access'
        })
    }

    const token=authHeader.split(' ')[1]

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message: 'No access'
        })
    }
}

export default authMiddleware

