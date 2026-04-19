import express from "express"
import { clerkMiddleware } from '@clerk/express'
import path from "path"

import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/authRoutes"
import messageRoutes from "./routes/authRoutes"
import userRoutes from "./routes/authRoutes"
import { errorHandler } from "./middleware/errorHandler"

const app = express();

app.use(express.json());

app.use(clerkMiddleware())

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running"});
})

app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../../web/dist")))

    app.get("/{*any}", (_, res) =>{
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
    });
}

export default app;
