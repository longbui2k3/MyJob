const nodemailer = require("nodemailer");

class Email {
  constructor({ type, email, value }) {
    this.type = type;
    this.email = email;
    this.value = value;
  }
  async sendEmail() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    return await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // sender address
      to: this.email, // list of receivers
      subject: this.type === "signup" ? "Verify OTP ✅" : "Password Reset", // Subject line
      html:
        this.type === "signup"
          ? `
            <h3>Verify OTP ✅</h3>
            <p>Welcome!</p>
            <p>Here is your verification code: ${this.value} </p>
            <p>Please use this code to complete the authentication process.</p>`
          : `<p>We heard that you lost the password. </p>
            <p>Don't worry, use the link below to reset it.</p>
            <p>This link <b>expires in 60 minutes</b>. Press
            <a href=${
              `${process.env.CLIENT_DOMAIN}/resetpassword/` + this.value
            }>here<a/> to proceed.</p>`, // html body
    });
  }
}

module.exports = Email;
