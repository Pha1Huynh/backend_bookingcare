import specialtyServices from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let info = await specialtyServices.createSpecialty(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let info = await specialtyServices.getAllSpecialty();
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    let info = await specialtyServices.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
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
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
