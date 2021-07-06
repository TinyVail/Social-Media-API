/**
	This file contains the code for the Reaction model in the MONGODB database
*/

const mongoose = require('mongoose');

const name = "Reaction";

const reactionSchema = new mongoose.Schema({
	reactionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: name,
		default: () => { return new mongoose.Types.ObjectId() }
	},
	reactionBody: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},

});

module.exports = {
	schema: reactionSchema,
	name: name
};