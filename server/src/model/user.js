import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },
  fullname: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, 
    minLength: [5, "Password must be at least 5 characters"],
  },

});
const User = model("User", userSchema);
export default User;
