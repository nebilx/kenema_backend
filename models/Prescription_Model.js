const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionItemSchema = new Schema({
    medicine_name: {
        type: String,
        required: [true, 'medicine name is required'],
    },
    dosage: Number,
    frequency: String,
    duration: String,
    quantity: Number
});

const PrescriptionSchema = new Schema({

    prescribedDate: Date,
    prescriptionItems: [PrescriptionItemSchema],
    patientID: {
        type: Number,
        required: [true, 'patient ID is required']
    },
    patientName: {
        type: String,
        required: [true, 'patient Name is required']
    },
    patientAge: {
        type: String,
        required: [true, 'patient Name is required']
    },    
    patientGender: {
        type: String,
        required: [true, 'patient Name is required']
    }
}, {timestamps: true});

module.exports = mongoose.model('Prescription', PrescriptionSchema);