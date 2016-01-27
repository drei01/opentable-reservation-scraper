var scraper = require('./lib/scraper.js'),
    nodemailer = require('nodemailer'),
    smtpTransport = nodemailer.createTransport("SMTP",{
       service: "Gmail",
       auth: {
           user: process.env.GMAIL_USER,
           pass: process.env.GMAIL_PASSWORD
       }
    });

var check = function (restaurantId, date, time){
    scraper('http://www.opentable.co.uk/opentables.aspx?t=Single&rid=' + restaurantId + '&m=3131&p=4&d=' + date + '%20' + time + '&rtype=ism', function(json){
        smtpTransport.sendMail({
           from: 'YOUR EMAIL HERE',
           to: "YOUR EMAIL HERE",
           subject: "OpenTable Reservation Times",
           text: JSON.stringify(json)
        }, function(error, response){
           if(error){
               console.log(error);
           }
           process.exit();
        });
        return;
    });
}

var args = process.argv.slice(2);

if (args.length < 3 || args.length > 3) {
  console.log('Usage node index.js restaurantId date time');
  return;
}

var restaurantId = args[0]
  , date = args[1]
  , time = args[2];

check(restaurantId, date, time);