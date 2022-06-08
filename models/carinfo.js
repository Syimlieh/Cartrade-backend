const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    make: {
        type: String,
        require: "vehicle make expected"
    },
    year: String,
    model: String,
    fuel: {
        type: String,
        enum: {
            values: [
                'Diesel',
                'Petrol',
                'Electric',
                'LPG',
                'CNG & Hybrids'
            ],
            message: 'Please select correct Fuel type'
        }, 
    },
    kmsDriven: {
        type: Number,
        required: true,
    },
    noOwner: {
        type: String,
        required: [true, "Please enter type of owner"],
        enum: {
            values: [
                '1st Owner',
                '2nd Owner',
                '3rd Owner',
                '4th Owner',
                '5th Owner'
            ],
            message: 'Please select correct options for Type of Owner'
        }, 
    },
    category: String,
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Vehicle", vehicleSchema) 













