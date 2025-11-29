import userModel from "../models/user.model.js";

export default class Users {
  getUsers = async () => {
    try {
      return await userModel.find();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  getUserByEmail = async (email) =>{
    try { 
        return await userModel.findOne({email})
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  getUserById = async (uid) => {
    try {
      return await userModel.findOne({ _id: uid });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };
  createUser = async (user) => {
    try {
      return await userModel.create(user);
    } catch (error) {
      console.error(error.message)
      return null;
    }
  };
  updateUser = async (uid, user) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
         uid,
        { $set: user },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      return null;
    }
  };

  setPasswordResetToken = async (email, token, expires) => {
    try {
        return await userModel.findOneAndUpdate (
            {email}, 
            {$set: {
                passwordResetToken : token,
                passwordResetExpires : expires,
            }},
            { new: true}
        )
    } catch (error){
        console.error(error.message);
        return null;
    }
  };

  getUserByResetToken = async (token) => {
    try {
      return await userModel.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }, //token sin expirar
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  updatePassword = async (uid, newPassword) => {
    try {
      return await userModel.findByIdAndUpdate(
        uid,
        {
          $set: {
            password: newPassword,
            passwordResetToken: null,
            passwordResetExpires: null,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  clearResetToken = async (uid) => {
    try {
      return await userModel.findByIdAndUpdate(
        uid,
        { $set: { passwordResetToken: null, passwordResetExpires: null } },
        { new: true }
      );
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };
}