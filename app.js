import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import wardRoutes from './routes/wardRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import msgRoutes from './routes/msgRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Set limit to 10MB for request body

// Routes
app.get("/", (req, res) => res.send("Hello"));

// Register routes
app.use("/user", userRoutes);
app.use("/login", wardRoutes);
app.use("/announcement", newsRoutes);
app.use("/poll", pollRoutes);
app.use("/message", msgRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://labeebap446:ToQ45iuThjuzgbkn@cluster0.ovqhyfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    // Start the server after successful database connection
    app.listen(4000, () => {
        console.log("Server started");
    });
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    // Exit the process if unable to connect to MongoDB
    process.exit(1);
});
