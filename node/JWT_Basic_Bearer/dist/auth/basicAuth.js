// Fixed user only for study
const USER = "admin";
const PASS = "1234";
export function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).send("Missing Basic Authorization Header");
    }
    const base64Credentials = authHeader.replace("Basic ", "");
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");
    if (username === USER && password === PASS) {
        return next();
    }
    return res.status(401).send("Invalid Basic Auth credentials");
}