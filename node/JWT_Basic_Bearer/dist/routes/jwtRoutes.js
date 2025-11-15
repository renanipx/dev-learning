import { Router } from "express";
import { generateToken, verifyJWT } from "../auth/jwtAuth.js";
const router = Router();
router.post("/login", (req, res) => {
    const { userId } = req.body;
    if (!userId)
        return res.status(400).send("UserId necessário");
    const token = generateToken(userId);
    res.json({ token });
});
router.get("/jwt-protected", verifyJWT, (req, res) => {
    res.send("Você acessou uma rota protegida com Bearer Token (JWT)!");
});
export default router;