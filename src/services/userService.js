import bcrypt from "bcryptjs";
import db from "../models/index";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //User is already exist
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //error
        userData.errCode = 1;
        userData.errMessage = `Your Email isn't exist, please try an other one`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
};
