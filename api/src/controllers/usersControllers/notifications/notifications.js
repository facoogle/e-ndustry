const nodemailer = require("nodemailer")
const { HOST_EMAIL, PORT_EMAIL, EMAIL, EMAIL_PASS, DB_HOST, DB_PORT, CLIENT_PORT, REACT_APP_HOST } = process.env;

async function bannedUserNotification(email,banned){
    let transporter = nodemailer.createTransport({
        host: `${HOST_EMAIL}`,
        port:`${PORT_EMAIL}`,
        secure:false,
        auth:{
            user:`${EMAIL}`,
            pass:`${EMAIL_PASS}`
        }
    });


if(banned.toString() == "false"){
    return transporter.sendMail({
        from: "endustry@gmail.com",
        to: email,
        subject:"Su cuenta fue desbloqueada",
        html:`<p>Su cuenta fue desbloqueada - Endustry</p>`,
    })
}

if(banned.toString() == "true") {
    return transporter.sendMail({
        from: "endustry@gmail.com",
        to: email,
        subject:"Su cuenta fue bloqueada",
        html:`<p>Contacta con un administrador - Endustry</p>`,
    })
}


}

async function changePasswordNotification(email,token){
    let transporter = nodemailer.createTransport({
        host: `${HOST_EMAIL}`,
        port:`${PORT_EMAIL}`,
        secure:false,
        auth:{
            user:`${EMAIL}`,
            pass:`${EMAIL_PASS}`
        }
    });

const urlConfirm = `http://${REACT_APP_HOST}/change-password/${token}`;
if(email && token){
    return transporter.sendMail({
        from: "endustry@gmail.com",
        to: email,
        subject:"Change Password your Nutri-u Account",
        html:`<p>Enter the following link and reset your password<a href="${urlConfirm}"> Change Password</a></p>`,
    })
}


}


module.exports = {
    //adminLogin,
    bannedUserNotification,
    changePasswordNotification
}