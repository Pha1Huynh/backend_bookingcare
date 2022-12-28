import patientService from "../services/patientService";
let postBookAppointment = async (req, res) => {
  try {
    let user = await patientService.postBookAppointment(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postVerifyAppointment = async (req, res) => {
  try {
    let user = await patientService.postVerifyAppointment(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyAppointment: postVerifyAppointment,
};
