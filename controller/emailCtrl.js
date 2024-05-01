const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler")

const sendEmail = asyncHandler( async(data,req,res)=>{

    const transporter = nodemailer.createTransport({
          host: "smtp.gmail.email",
          port: 587,
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP,
          },
        });
        
        
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"HEY 👻" <maddison53@ethereal.email>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.text, // plain text body
            html: data.html, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        
          console.log("previw URL: %s",nodemailer.getTestMessagerUrl(info));


    }
)


module.exports = sendEmail
