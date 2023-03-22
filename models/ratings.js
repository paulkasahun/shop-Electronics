const  mongoose  = require("mongoose");

const rSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
});
module.exports = rSchema;