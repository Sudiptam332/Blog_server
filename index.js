import express from "express"
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import { createRequire } from 'module';
import cookieParser from "cookie-parser";
import multer from "multer";

const require = createRequire(
    import.meta.url);
const cors = require("cors");

const app = express()

app.use(cors({
    origin: ["https://localhost:3000", "https://Blogers-area.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const port = process.env.PORT || 8800;
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function(req, res) {
    const file = req.file;
    res.status(200).json(file.req.filename);
});

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(port, () => {
    console.log("Connected!!")
})