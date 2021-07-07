import jwt from 'jsonwebtoken';
const isLoggedIn = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1]

        const isCustomAuth = token.length < 500 

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decodedData?.id
        }
        else {
            // for google authentication
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error); 
        res.status(401).json({ error: "Not Authorized" })
    }
    
}

export { isLoggedIn };

