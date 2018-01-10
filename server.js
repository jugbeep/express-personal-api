// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/jugbeep/express_self_api/README.md", // CHANGE ME
    base_url: "http://afternoon-sands-49249.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/vaction", description: "all of the vacations"},
      {method: "GET", path: "/api/vaction/:id", description: "Returns data from one of the vacations"},
      {method: "POST", path: "/api/vaction", description: "creates a vacation idea"} // CHANGE ME
    ]
  });
});
 

app.get('/api/profile', function (req, res) {
  //res.send('this is profile endpoint');
  res.json({
    'name': 'Patrick',
    'github': 'jugbeep',
    'github_prof_image': 'https://avatars3.githubusercontent.com/u/26702439?s=460&v=4',
    'current_city': 'Denver',
    'pets': [{name: 'Zuchinni',
              type: 'cat',
              breed: 'Unknown'
              },
              {
              name:'Chardonnay',
              type: 'cat',
              breed: 'Unknown'}
              ]
  });
});

app.get('/api/vacation', function(req, res) {
  db.Vacation.find(function(err, results){
    console.log(results);
    res.json(results);
  });
});

app.get('/api/vacation/:id', function(req, res) {
  let foundId = req.params.id;
  console.log(foundId);
  db.Vacation.findById(foundId, function (err, results) {
    console.log(results);
    res.json(results);
  });
});

app.post('/api/vacation', function(req, res) {
  let incomingDat = req.body;
  console.log(incomingDat);
  db.Vacation.create(incomingDat);
  res.json(incomingDat);
});

app.put('/api/vacation/:id', function(req, res) {
  let putItem = req.params.id;
  console.log(putItem);
  db.Vacation.findById(putItem, function (err, result){
    if (err) throw err;
    console.log(result)
    
      result.date = req.body.date;
      result.location = req.body.location;
      result.description = req.body.description;

    db.Vacation.create(result);
    res.send(result);
  });  
});

app.delete('/api/vacation/:id', function(req, res) {
  foundId = req.params.id;
  db.Vacation.findByIdAndRemove(foundId, function(err, doc){
    console.log('findByIdAndRemove doc:', doc);
    res.send('Deleted: ' + doc);
  });
  

})

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
