var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// couchDB ................

var db = require('nano')('https://thulasi.iriscouch.com/samsung_users');
//nano.db.create('books');
//var thulasi = nano.db.use('thulasi');

//Insert a book document in the books database
// books.insert({name: 'Histori of the man who is living'}, null, function(err, body) {
//   if (!err){
//     console.log(body);
//   }
// });

//db.destroy('books');
app.post('/register',function(req,res){
  console.log(req.body);
  db.insert(req.body,function(err,user){
    if (err) {console.log(error)};
    if (user) {console.log(user); res.send(user);};
  })
      // db.destroy({'name':'thulasi'},  function(err, body) {
      //   if (!err)
      //     console.log(body);
      // });
});
app.get('/list',function(req,res){
        // db.fetch('thulasi',function(err,body){
        //     // if (err) {console.error(err)};
        //     //     body.rows.forEach(function(doc) {
        //     //       console.log(doc);
        //     //       res.(doc);
        //     //     });
        // })
      
       db.get('f5752c24dd05e33d55da85cce9002c81', function(err, body) {
            if (!err)
              console.log(body.apple_users);
            res.send(body.htc_user);
      });

});

//Get a list of all books
// thulasi.get(function(err, body){
//   console.log(body.value);
// });


module.exports = app;
