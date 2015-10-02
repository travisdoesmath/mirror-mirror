var	mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dataSchema = new Schema({
	data: Schema.Types.Mixed,
	source: String,
	createDate: { type: Date, default: Date.now, expires: 3} 
})

module.exports = mongoose.model('Data', dataSchema);