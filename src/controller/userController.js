import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameters!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  //check email exist
  //compare password
  //return userInfo
  //access token: JWT
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //All, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing require parammeter",
      Users: [],
    });
  }
  let Users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    Users: Users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameters",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllcodeservice(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "ERROR FROM SERVER",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
