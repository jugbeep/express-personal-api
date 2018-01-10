// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

db = require('./models');

var new_vacation = [{
	location: 'Bahamas',
	date: '7/16/16', 
	description: "White sandy beaches, and expensive accomadations."
	}]

db.Vacation.create(new_vacation, function(err, vacation) {
	if (err){
		return console.log("error: ", err);
	}

	console.log('Seeded the database with: ', vacation._id)
	process.exit(); 	
})
