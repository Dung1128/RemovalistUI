const router = require('express').Router();
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const service = client.chat.services(process.env.TWILIO_IPM_SERVICE_SID);


// GET /
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/list', function(req, res, next){
  service.channels.list()
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
  res.render('index');
});

router.get('/create', function(req, res, next) {
  const name = req.query.name
  service.channels.create({
    friendlyName: name,
    uniqueName: name,
  }).then(function(response) {
      console.log(response);
  }).fail(function(error) {
      console.log(error);      
  });  
  res.render('index');
});


router.get('/update', function(req, res, next) {
  const name = req.query.name
  const channelID = req.query.channelID
  service.channels(channelID).update({
    friendlyName: name,
    uniqueName: name,
  }).then(function(response) {
      console.log(response);
  }).fail(function(error) {
      console.log(error);      
  });  
  res.render('index');
});


module.exports = router;
