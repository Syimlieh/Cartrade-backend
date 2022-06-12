const mongoose = require("mongoose");

const VehicleAdsSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title Required"],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description is Required"]
    },
    images: [
        {
            type: String,
            required: [true, "Require at least One Image"],
            trim: true
        }
    ],
    price: {
        type: Number,
        required: [true, "Please enter expected Price"]
    },
    address: {
        type: String,
        required: [true, "Please enter address"]
    },
    make: {
        type: String,
        require: "vehicle make expected"
    },
    year: String,
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
    status: {
        type: String,
        required: [true, "Please enter status Type"],
    },
},
{
    timestamps: true
}
)


module.exports = mongoose.model("VehicleAds", VehicleAdsSchema);