// const User = require("../db/user-model");
// const bcrypt = require("bcryptjs");
// const { createToken } = require("../helpers/api-helpers");
// const gravatar = require("gravatar");
// const fs = require("fs/promises");
// const path = require("path");
// const resizeAvatar = require("../helpers/resize-avatar");

// const CreateUser = async (email, password, name, location, phone) => {
//   try {
//     const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
//     const avatarURL = gravatar.url(
//       `${email}`,
//       { protocol: "https", s: "240" },
//       true
//     );
//     const user = new User({
//       email,
//       password: hashPassword,
//       name,
//       location,
//       phone,
//       avatarURL,
//     });

//     const token = createToken(user._id);
//     user.token = token;
//     await user.save();

//     return user;
//   } catch (error) {
//     return error;
//   }
// };

// const login = async (email, password) => {
//   try {
//     const [user] = await User.find({ email }, { __v: 0, token: 0 });

//     if (!(await bcrypt.compare(password, user.password))) {
//       throw new Error();
//     }

//     const token = createToken(user._id);

//     user.token = token;
//     await user.save();

//     return user;
//   } catch (error) {
//     return error.message;
//   }
// };

// const getCurrentUser = async (token) => {
//   try {
//     const [user] = await User.find({ token });

//     return user;
//   } catch (error) {
//     return error;
//   }
// };

// const logout = async (_id) => {
//   try {
//     await User.findByIdAndUpdate(_id, { token: "" });
//   } catch (error) {
//     return error.message;
//   }
// };

// const updateUser = async (_id, fields) => {
//   try {
//     const responce = await User.findByIdAndUpdate(
//       { _id },
//       { ...fields },
//       { new: true }
//     );
//     return responce;
//   } catch (error) {
//     return error.message;
//   }
// };

// const updateAvatar = async (_id, user) => {
//   try {
//     const newAvatarPath = path.resolve(`./public/avatars/${_id}avatar.png`);
//     await resizeAvatar(user.pathAvatar);
//     await fs.rename(user.pathAvatar, newAvatarPath);
//     const avatarURL = newAvatarPath;
//     return avatarURL;
//   } catch (error) {
//     await fs.unlink(user.pathAvatar);
//     return error;
//   }
// };
// module.exports = {
//   CreateUser,
//   getCurrentUser,
//   logout,
//   login,
//   updateUser,
//   updateAvatar,
// };
