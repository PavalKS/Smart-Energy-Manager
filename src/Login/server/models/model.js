const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Room: String,
    Password: String,
    User: String
});

const UserModel = mongoose.model("Users",UserSchema)

const EmergencySchema = new mongoose.Schema({
    EmergencyType: String,
    BasicInfo: String,
    Room: String,
    Remarks: String,
    Resolved: Boolean
})

const EmergencyModel = mongoose.model("Emergency", EmergencySchema)

const MedicalInfoSchema = new mongoose.Schema({
    Name: String,
    Room: String,
    Age: String,
    Sex: String,
    Address: String,
    MedicalCondition: String,
    Medications: String,
    BloodGroup: String,
    EmergencyContact: String
})

const MedicalInfoModel = mongoose.model("MedicalInfo", MedicalInfoSchema)

const EnergySuggestionSchema = new mongoose.Schema({
    Suggestion: String
});

const EnergySuggestionModel = mongoose.model("EnergySuggestion", EnergySuggestionSchema)

module.exports = {
    UserModel,
    EmergencyModel,
    MedicalInfoModel,
    EnergySuggestionModel
};