var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var VacationSchema = new Schema({
   description: String,
   location: String
});

var Vacation = mongoose.model('Vacation', VacationSchema);

module.exports = Vacation;
