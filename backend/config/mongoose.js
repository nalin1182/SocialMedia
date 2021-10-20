const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/facegramDev',{useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection failed'));

db.once('open', function() {
    console.log("successfully connected");
});