import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
dotenv.config();
import basicRoutes from "./routes/basicRoutes.js";
import jwtRoutes from "./routes/jwtRoutes.js";
const app = express();
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
app.use(express.json({ limit: "100kb" }));
app.use("/auth", basicRoutes);
app.use("/auth", jwtRoutes);
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});