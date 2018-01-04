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

// var db = require('./models');

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
    woops_i_has_forgot_to_document_all_my_endpoints: 
      {"/api/profile": {
      "get": {
        "name": "returns my name",
        "github": "returns my username at github",
        "github_prof_image": "returns a url of my github profile image",
        "current_city": "returns where I live currently",
        "pets": "returns an array of my pets with their 'name', 'type' and 'breed'"
      }
    }
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
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

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
