import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "segredo-estudo";
export function generateToken(userId) {
    return jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
}
export function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Token not provided");
    }
    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(401).send("Invalid or expired token");
    }
}