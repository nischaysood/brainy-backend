import mongoose, { model, Schema } from "mongoose";

// Connect to MongoDB (Simplified)
mongoose.connect("mongodb+srv://nischay02sood:YXJU9GaYm9DM9ylp@cluster0.hixxe.mongodb.net/second-brain")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create & Export Model
export const UserModel = model("User", userSchema);