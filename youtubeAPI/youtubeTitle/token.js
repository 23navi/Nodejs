const {google}= require("googleapis");

(async ()=>{

    const client = new google.auth.OAuth2(
        process.env.clientID,
        process.env.clientSecret,
        "http://localhost",  //redirection
    );

    const url = client.generateAuthUrl({
        access_type:"offline",
        scope:[
            "https://www.googleapis.com/auth/youtube"
        ]
    });

    console.log(url);
    const {tokens} =await client.getToken(".... Token received after auth")
    console.log(tokens);

})();