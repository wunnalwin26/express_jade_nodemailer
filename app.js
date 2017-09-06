var express = require('express')
var path = require('path')
var bodyParser= require('body-parser')
var nodemailer= require('nodemailer')

var app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))


app.get('/',function(req,res){
  console.log('Hello World');
  res.render('index');
})

app.get('/about',function(req,res){
  console.log('Hello About page');
  res.render('about');
})

app.get('/contact',function(req,res){
  console.log('Hello Contact page');
  res.render('contact');
})


app.post('/contact/send',function(req,res){
  var transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user:'mr.wunnalwin@gmail.com',
        pass:'wearethebest'
      }
    })
    var mailOption = {
      from:'Wunna Lwin <wunnalwin@rebbiz.com>',
      to:'mr.wunnalwin91@gmail.com',
      subject:'Website Submmision with nodemailer',
      text:'You have a submmision with the following detail... Name: '+req.body.name+'Email : '+req.body.email+'Message : '+req.body.message,
      html: '<p>You have a submmision with the following detail...</p><ul><li> Name : '+req.body.name +'</li><li> Email : '+ req.body.email+'</li><li> Message : '+req.body.message+'</li></ul>'

    };
    transport.sendMail(mailOption,function(err,info){
      if(err){
        console.log(err)
        res.redirect('/')
      }else{
        console.log('Message Sent : ' + info.response)
        res.redirect('/')

      }
  })
})

app.listen(3000)
console.log('Server is running at on port 3000 ')
