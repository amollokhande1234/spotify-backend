const jwt = require('jsonwebtoken');


async function authArtist(req, res, next) {
    try {
        const { token } = req.body;

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Middleware Data " + decode);


        if (decode.role !== 'artist') {
            return res.status(403).json({
                message: "Unothorized to access the artist"
            });
        }
        req.user = decode;
        next();

    } catch (e) {
        console.log(e);
        return res.status(403).json({
            message: "Unothorized to access the artist"
        });
    }
}

async function authUser(req, res, next) {
    try {
        const { token } = req.body;
        const isUser = jwt.verify(token, process.env.JWT_SECRET);

        if (isUser.role !== 'user' && isUser.role !== 'artist') {
            res.status(403).json({
                message: "Unothorized User",
            });
        }

        req.user = isUser;
        next();
    } catch (e) {
        console.log("Auth User Error" + e);
        return res.status(403).json({
            message: "Unothorized"
        });
    }
}

module.exports = { authArtist, authUser }