import mongoose, { Schema, model } from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    ip: String,
    userAgent: String,
    referrer: String,
  },
  { _id: false }
);

const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortPath: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: { type: Date },
  password: { type: String },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  clickDetails: [clickSchema]
}, { timestamps: true });

const Url = model("Url", UrlSchema);
export default Url;
