var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// couchDB ................

var db = require('nano')('http://thulasi:thulasi@thulasi.iriscouch.com/samsung_users');
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
  });
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
      
       db.get('thulasi@gmail.com', function(err, body) {
            if (!err){
              console.log(body);
              res.send(body.name);
            }
            
      });

});

app.get('/login',function(req,res){
  res.sendfile('public/views/login.html');
});

app.post('/login',function(req,res){
  console.log(req.body);

    db.get(req.body.username,function(err,body){
      if (err) {throw err};
        res.send(body);
    });

});

app.get('/fulldata',function(req,res){
      //   db.view('/_design/users/_view/byname',{key: "thulasig7@gmal.com"}, function (err, resp) {
      //     if (!err) {throw err;};
      //     if (resp) {console.log(resp)};
      // });
      db.view('users', 'byname', function(err, body) {
                if (!err) {
                  res.send(body);
                  // body.rows.forEach(function(doc) {
                  //   //console.log(doc.value);
                  //   res.JsonStrignify(doc)
                  // });
            }
          });
});



// { db: 
 //  { create: [Function: create_db],
 //    get: [Function: get_db],
 //    destroy: [Function: destroy_db],
 //    list: [Function: list_dbs],
 //    use: [Function: document_module],
 //    scope: [Function: document_module],
 //    compact: [Function: compact_db],
 //    replicate: [Function: replicate_db],
 //    changes: [Function: changes_db] },
 // use: [Function: document_module],
 // scope: [Function: document_module],
 // request: [Function: relax],
 // config: { url: 'http://localhost:5984' },
 // relax: [Function: relax],
 // dinosaur: [Function: relax] }


//Get a list of all books
// thulasi.get(function(err, body){
//   console.log(body.value);
// });


module.exports = app;
