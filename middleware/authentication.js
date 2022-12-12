
const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {

    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, process.env.KEY)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send("Please login")
        }  
    }
    else{
        res.send("Please login")
    }
}

module.exports = {Authentication}