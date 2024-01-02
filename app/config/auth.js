import jwt  from 'jsonwebtoken';



export const tokenValidation = (req, res, next) => {

    try {
        let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        if (! token) {
            return res.status(403).send("A token is required for authentication");
        }
        token = token.replace("Bearer ", "")
        const temp = jwt.verify(token, 'your-secret-key');
        req.decoded = temp
        next();

    } catch (err) {
        console.log("Error:", err);
        return res.status(400).send({stausCode: 0, data: err.toString()});
    }  

}

