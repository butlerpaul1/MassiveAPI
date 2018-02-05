const express = require('express');
const http = require('http');
const massive = require('massive');

const routes = require('./routes/api');

const app = express();

massive({
  host: 'localhost',
  port: 5432,
  database: 'pgguide',
  user: 'paul',
  password: '1234'
}).then(instance => {
  app.set('db', instance);

//content
app.use(express.static('public'));


//apis
  app.use(routes);

  app.get('/', (req, res) =>{
    console.log('Get Request');
    res.end();
  });

 //get users/id
  app.get('/', (req, res) => {
    req.app.get('db').users.find({
      'id =': 2
    }).then(items => {
      res.json(items);
    });
  });

  app.listen(3000, () => console.log('Example app listening on port 3000!'))


});
