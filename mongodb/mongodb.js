const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/carTrade',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
}

module.exports = connectDatabase;