"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
// Connect to MongoDB (Simplified)
mongoose_1.default.connect("mongodb+srv://nischay02sood:YXJU9GaYm9DM9ylp@cluster0.hixxe.mongodb.net/second-brain")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
// Define User Schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const UserModel = model("User", userSchema);
exports.UserModel = UserModel;
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true }
});
exports.ContentModel = model("Content", ContentSchema);
