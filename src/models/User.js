import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const expiryDate = process.env.ACCESS_TOKEN_EXPIRY;

const userSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
      require: [
        true,
        "User name is required and must be greater than or equal to 3 character",
      ],
      unique: true,
      lowercase: true,
      trim: true,
      min: 3,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);



// pre hook is the hook which is called just before certain event  { in following case  called before  saving the document in db  i.e before save function}

// for reference of this using function instead of ()=>{}
// this is injecting middleware to the mongoose schema


userSchema.pre("save", async  function (next) {

    if(this.isModified("password")){
         this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});


// this is injecting method to mongoose schema

userSchema.methods.checkPassword = async function (planePassword) {
    return await bcrypt.compare(planePassword, this.password)
}

// may be using async await
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname
        },
        secretKey,
        {
            expiresIn: expiryDate
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
return jwt.sign(
  {
    _id: this._id,
    username: this.username,
  },
  secretKey,
  {
    expiresIn: expiryDate,
  }
);
}

const User = model("User", userSchema);

export { User, userSchema };
