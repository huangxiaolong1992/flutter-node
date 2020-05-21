const jwt= require('jsonwebtoken');

function getToken(req, res){
    const token = req.headers.authorization;
   
    return jwt.verify(token, 'dynamic', (err, decoded) => {       
        if(err) {
            return res.json(err)
        }else{
            return decoded;
        }
    })
}

module.exports = getToken;