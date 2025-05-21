import { Schema, model } from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Url = model("Url", UrlSchema);
export default Url;
