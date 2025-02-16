import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Connect to MongoDB (Simplified)
mongoose.connect("mongodb+srv://nischay02sood:YXJU9GaYm9DM9ylp@cluster0.hixxe.mongodb.net/second-brain")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model("User", userSchema);
export { UserModel };

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const ContentModel = model("Content", ContentSchema);