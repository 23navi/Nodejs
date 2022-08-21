const api="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";

//npm i @sendgrid/mail

const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(api)

const msg = {
  to: 'surekanavi@gmail.com', // Change to your recipient
  from: 'surekanavi@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })