import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import wardRoutes from './routes/wardRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello"));

// Register user routes
app.use("/user", userRoutes);
app.use("/wardmemberlogin",wardRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://labeebap446:JxNN2Fk494gbplqj@cluster0.ovqhyfr.mongodb.net/", {
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
