var gcm = require("node-gcm");
var sender = new gcm.Sender("Your_Firebase_Cloud_Messaging_token");
var message = new gcm.Message({
    notification: {
        title: "Hello World! ",
        icon: "your_icon_name",
        body: "Here is a notification's body."
    },
});
var recipients = new gcm.IRecipient = { to: "/topics/all" };
sender.sendNoRetry(message, recipients, (err, response) => {
    if (err) console.error(err);
    else console.log(response);
});