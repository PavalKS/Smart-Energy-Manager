const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { UserModel, EmergencyModel, MedicalInfoModel, EnergySuggestionModel, DeviceInfoModel} = require('./models/model');

const app = express();
app.use(express.json());
app.use(cors());

// Device states (simulated data, replace with your device control logic)
let deviceStates = {
  tv: false,
  light: false,
  fridge: false,
  ac: false,
};


mongoose.connect("mongodb://127.0.0.1:27017/loginsignupsmarthome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

/*
mongoose.connect("mongodb+srv://pavalsudakar:Rct93tZE6FNMuQK9@cluster0.s8qtvil.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/


app.post('/Signup', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});


app.post('/DeviceRegistration', async (req, res) => {
  try {
    const newDevice = await DeviceInfoModel.create(req.body);
    res.json(newDevice);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post("/Login", async (req, res) => {
  const {email, password} = req.body;
  UserModel.findOne({ Email: email })
    .then(user => {
      if (user) {
        if (user.Password === password) {
            res.json("Success");
        } else {
          res.json("Incorrect Password");
        }
      } else {
        res.json("User Doesn't exist, please Sign Up");
      }
    });
});

// Get user profile information by email
app.get('/users/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ Email: email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching user' });
  }
});

app.post('/Emergency', async (req, res) => {
  try {
    const newEmergency = await EmergencyModel.create(req.body);
    res.json(newEmergency);
  } catch (error) {
    console.error('Error:', error);
  }
});

app.post('/Profile', async (req, res) => {
  try {
    const newMedicalInfo = await MedicalInfoModel.create(req.body);
    res.json(newMedicalInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/Suggestion-Provider', async (req, res) => {
  try {
    const newEnergySuggestion = await EnergySuggestionModel.create(req.body);
    res.json(newEnergySuggestion);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/Suggestion-Provider-Getter', async (req, res) => {
  try {
    const allSuggestion = await EnergySuggestionModel.find({});
    res.json(allSuggestion);
  } catch (error) {
    console.error('Error fetching Suggestion details:', error);
    res.status(500).json({ error: 'An error occurred while fetching Suggestion details' });
  }
});

app.delete('/Suggestion-Provider-Deleter/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await EnergySuggestionModel.findByIdAndDelete(id);
    res.json({ message: 'Suggestion deleted successfully' });
  } catch (error) {
    console.error('Error deleting suggestion:', error);
    res.status(500).json({ error: 'An error occurred while deleting Suggestion' });
  }
});

// Fetch all emergency details
app.get('/EmergencyResponse', async (req, res) => {
  try {
    const allEmergencies = await EmergencyModel.find({});
    res.json(allEmergencies);
  } catch (error) {
    console.error('Error fetching emergency details:', error);
    res.status(500).json({ error: 'An error occurred while fetching emergency details' });
  }
});

app.get('/MedicalDetails', async (req, res) => {
  try {
    const allMedicalDetails = await MedicalInfoModel.find({});
    res.json(allMedicalDetails);
  } catch (error) {
    console.error('Error fetching Medical details:', error);
    res.status(500).json({ error: 'An error occurred while fetching Medical details' });
  }
});

app.delete('/EmergencyResponse/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await EmergencyModel.findByIdAndDelete(id);
    res.json({ message: 'Emergency resolved and deleted successfully' });
  } catch (error) {
    console.error('Error resolving and deleting emergency:', error);
    res.status(500).json({ error: 'An error occurred while resolving and deleting emergency' });
  }
});

//const deviceBaseUrl = 'http://<device_ip_address>:<device_port>';
// Toggle device state
app.put('/devices/:device', (req, res) => {
  const { device } = req.params;
  const { state } = req.body;
  // const response = await axios.put(`${deviceBaseUrl}/${device}`, { state });
  // Simulated logic to toggle device state
  if (deviceStates.hasOwnProperty(device)) {
    deviceStates[device] = state;
    res.status(200).json({ message: `Toggled ${device} successfully` });
  } else {
    res.status(400).json({ error: `Device ${device} not found` });
  }
});

app.get('/deviceinfo/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const devices = await DeviceInfoModel.find({ RoomNumber: roomNumber });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/UserManagement', async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching User details:', error);
    res.status(500).json({ error: 'An error occurred while fetching User details' });
  }
});

app.delete('/UserManagement/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const Room = deletedUser.Room; // Assuming 'roomNumber' is the field containing room number
    // Deleting medical details of users with the same room number as the deleted user
    await MedicalInfoModel.deleteMany({ Room }); // Assuming 'roomNumber' is the field in MedicalModel
    res.json({ message: 'User and associated medical details deleted successfully' });
  } catch (error) {
    console.error('Error deleting user and associated medical details:', error);
    res.status(500).json({ error: 'An error occurred while deleting user and associated medical details' });
  }
});


app.listen(3001, () => {
  console.log("Server is running");
});
