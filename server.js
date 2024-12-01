import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import CookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import { app,  server } from "./config/socket.js";
import path from "path";


dotenv.config()
app.use(express.json({ limit: '100mb' }));
app.use(CookieParser());
app.use(cors(
    {
     origin: "https://chat.hyweb.in",
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     credentials: true

  }
));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://chat.hyweb.in'); // Specify your frontend's origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you need to send cookies
    next();
});

const PORT = process.env.PORT

connectDB();
app.use("/api/auth", authRoutes)
app.use("/api/message",messageRoutes)


if (process.env.NODE_ENV === 'production') {
    const dirPath = path.resolve();

    app.use(express.static('./Frontend/dist'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(dirPath, "./Frontend/dist","index.html"));
    })
}


app.get('/',(req,res) => {
    res.send("API WORKING")
})


server.listen(PORT, () => {
    console.log("Server is Running in Port: " + PORT)
})
