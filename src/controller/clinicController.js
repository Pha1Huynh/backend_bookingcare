import Clinicservice from "../services/Clinicservice";

let createClinic = async (req, res) => {
  try {
    let info = await Clinicservice.createClinic(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let info = await Clinicservice.getAllClinic();
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let info = await Clinicservice.getDetailClinicById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};