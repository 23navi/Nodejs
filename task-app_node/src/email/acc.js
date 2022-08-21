

//npm i @sendgrid/mail

const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


  const welcomeEmail=(username,email)=>{
    console.log(email)
    const msg = {
      to: email, 
      from: 'surekanavi@gmail.com', 
      subject: `Welcome ${username} to our platform`,
      html: '<strong>We are glad to welcome you to our platform.</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
       console.log('Email sent')
    })
      .catch((error) => {
       console.error(error)
    })
  }


  const deleteEmail=(username,email)=>{
    console.log(email)
    const msg = {
      to: email, 
      from: 'surekanavi@gmail.com', 
      subject: `Sorry ${username}`,
      html: '<strong>Tell us how can we improve our services.</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
       console.log('Email sent')
    })
      .catch((error) => {
       console.error(error)
    })
  }

  // welcomeEmail("navi","surekanavi@gmail.com");


  module.exports={
    welcomeEmail,
    deleteEmail
  }