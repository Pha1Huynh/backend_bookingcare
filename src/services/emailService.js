require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Phat Huynh 👻" <anonymmous@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};
let getBodyHTMLEmail = async (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh trên PhatHuynh Care</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây</a></div>
    <div>Xin chân thành cảm ơn</div>
`;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}</h3>
    <p>You received this email because you booked a discovery on PhatHuynh Care</p>
    <p>Information to book a medical appointment: </p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
    <div>Have a nice day!</div>
`;
  }
  return result;
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh trên PhatHuynh Care thành công</p>
    <p>Thông tin hoá đơn: </p>
    <div>Xin chân thành cảm ơn</div>
`;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Hello name  ${dataSend.patientName}</h3>
    <p>You received this email because you booked a discovery on PhatHuynh Care success</p>
    <div>Have a nice day!</div>
`;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Phat Huynh 👻" <anonymmous@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [
          {
            // encoded string as an attachment
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64")[1],
            encoding: "base64",
          },
        ],
      });
      console.log("check info send email");
      console.log(info);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
