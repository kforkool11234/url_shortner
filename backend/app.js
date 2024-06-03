import express from "express";
import mongoose from "mongoose";
import surl1 from "./schema/schema1.js";
import surl2 from "./schema/schema2.js";
import dotenv from "dotenv";
import { auth } from "./firebaseconfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongod_url) // Corrected environment variable name
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", async (req, res) => {
  try {
    const user = auth.currentUser;;
    
    const shurl1 = await surl1.find();
    let shurl2 = [];
    if (user) {
      shurl2 = await surl2.find({ name: user.displayName || user.email });
    }
    res.status(200).json({ shurl1, shurl2 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

app.post("/shorturl", async (req, res) => {
  const { value, check } = req.body;
  try {
    const user = auth.currentUser;
    const status = await axios.head(value);

    if (status.status === 200||204) {
      if (user && check) {
        await surl2.create({ name: user.displayName || user.email, full: value });
        res.status(200).json({ message: "Data received and stored with user info", value });
      } else {
        await surl1.create({ full: value });
        res.status(200).json({ message: "Data received and stored", value });
      }
    }
  } catch (error) {
    res.status(404).json({ message: "URL not found", value });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = jwt.sign(
      { uid: user.uid, email: user.email, displayName: user.displayName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: "User logged in", token, user });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = jwt.sign(
      { uid: user.uid, email: user.email, displayName: user.displayName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: "User signed up", token, user });
  } catch (error) {
    res.status(500).json({ message: "Sign up failed", error: error.message });
  }
});

app.post("/logout", async (req, res) => {
  try {
    await auth.signOut(); // Assuming auth.signOut() handles session destruction

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error logging out" });
  }
});

app.get("/:shorturl", async (req, res) => {
  try {
    const url = await surl1.findOne({ short: req.params.shorturl }) || await surl2.findOne({ short: req.params.shorturl });
    if (!url) {
      res.status(404).send("Not found");
    } else {
      url.clicks++;
      await url.save();
      res.redirect(url.full);
    }
  } catch (error) {
    res.status(500).json({ message: "Error handling click", error });
  }
});

app.get("/scam/:shorturl", async (req, res) => {
  try {
    const url = await surl2.findOne({ short: req.params.shorturl });
    if (!url) {
      res.status(404).send("Not found");
    } else {
      url.scam++;
      url.report = true;
      await url.save();
      res.status(200).send("scam counter increased");
    }
  } catch (error) {
    res.status(500).json({ message: "Error handling click", error });
  }
});

app.get("/del/:id",async (req,res)=>{
  try{
    await surl2.deleteOne({ _id: req.params.id })
    console.log("deleted")
  }catch(err){
    console.error("error",err)
  }
  
})

const port = process.env.PORT || 5000; // Corrected environment variable name
app.listen(port, () => console.log("Server listening on port", port));
