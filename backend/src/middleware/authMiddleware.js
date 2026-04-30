import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            let token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "not Authorized, no token!" });
    }
}

export default authMiddleware;