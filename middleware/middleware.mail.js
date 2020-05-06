const nodemailer = require("nodemailer")

const defaultConfig = 'smtps://uitusur@mail.ru:S_etuOtaYT33@smtp.mail.ru'
const poolConfig = 'smtps://uitusur@mail.ru:S_etuOtaYT33@smtp.mail.ru/?pool=true'

const transporter = nodemailer.createTransport(
  {
    pool: true,
    // maxConnections: 5,
    // maxMessages: 'infinity',
    // rateLimit: 3,
    // rateDelta: 2000,
    // socketTimeout: 60000,
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // 465 - true
    auth: {
      user: 'uitusur@mail.ru',
      pass: 'S_etuOtaYT33'
    }
  }, {
  from: 'Кафедра управления инновациями <uitusur@mail.ru>'
});

transporter.verify((error, success) => {
  error ? console.log(error)
    : console.log("Server is ready for messages: ", success);

})

const mailer = async message => {
  transporter.sendMail(message,
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      // console.log("Message sent: %s", info);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  );
}

module.exports = mailer