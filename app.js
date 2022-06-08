const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
require('dotenv').config('./.env');
const mongoose = require('mongoose');
const credentials = require('./middleware/credentials.js');
var cors = require('cors')
const connectDatabase = require('./mongodb/mongodb.js')
const corsOptions = require("./config/corsOption");
const Vehicle = require('./models/carinfo');
const applyMiddleware = require("./middleware/errors");
const Errorhandler = require('./utils/errorHandler.js');

// app.use(cors({origin: 'http://localhost:3000', credentials:true}));
app.use(cors(
    {
      credentials:true,
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      
    }
  ));
app.get("/refresh", (req, res) => {
  res.status(200)
    .cookie("refreshing", {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date()),
    httpOnly: true
  }).json({
    message: "cookie Being Initiate"
  })
})

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

  app.use(express.urlencoded({ extended: false }));

  // built-in middleware for json 
  app.use(express.json());
  
  //middleware for cookies
  app.use(cookieParser());
  
// get vehicle data
// const getVehicleData = async () => {
//   const response = await fetch(
//     'https://parseapi.back4app.com/classes/Car_Model_List',
//     {
//       headers: {
//         'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z', // This is the fake app's application id
//         'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW', // This is the fake app's readonly master key
//       }
//     }
//   );
//   const data = await response.json(); // Here you have the data that you need
//   let vehicle;
//   console.log(JSON.stringify(data.results, null, 2));
//   data.results.map((item) => (
//     vehicle = await Vehicle.create({
//       year: item.Year,
//       make: item.Make,
//       model: item.Model,
//       category: item.Category,
//       createdAt: item.createdAt,
//       updatedAt: item.updatedAt
//     })  
//   ))
  
// };
// getVehicleData();

connectDatabase();

const auth = require("./routes/auth")
const verifyToken = require("./routes/verifyToken");
const getVehicle = require('./routes/vehicle');
const vehicleAds = require('./routes/vehicleAds');

app.use('/api/v1/', auth);
app.use('/api/v1/refreshToken', verifyToken);
app.use('/api/v1/', getVehicle);
app.use('/api/v1/vehicle/ads/', vehicleAds);

app.all("*", (req, res, next) => {
  next(new Errorhandler(`${req.originalUrl} does not found`, 404))
})

app.use(applyMiddleware)

const PORT = process.env.PORT
app.listen(5000, () => {
    console.log(`server Listening on Port ${PORT}`);
})