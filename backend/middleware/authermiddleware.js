const authorizetion = (req, res, next) => {
    const jwt=true
    if(jwt == true){
        req.myData={username:"sanjay"}
        next()
    }else{
        res.status(301).json({message:"you are not allowed"})
    }
}

module.exports = {authorizetion}
