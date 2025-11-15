import { Router } from "express";
import { basicAuth } from "../auth/basicAuth.js";
const router = Router();
router.get("/basic-protected", basicAuth, (req, res) => {
    res.send("Você acessou uma rota protegida com Basic Auth!");
});
export default router;