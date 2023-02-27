const mongoose = require('mongoose');
const { mongo } = require('./credentials');
mongoose.connect(mongo.development.connectionString + 'test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));