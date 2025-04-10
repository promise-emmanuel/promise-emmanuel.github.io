// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());




// const mongoose = require('mongoose');
const uri = "mongodb+srv://promiseemmanuel:Promise@cse341-node-js.xii4bsn.mongodb.net/test";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
// mongodb+srv://promiseemmanuel:Promise@cse341-node-js.xii4bsn.mongodb.net/test



// Database connection (adjust the MongoDB URI as necessary)
// mongoose.connect('mongodb://localhost:27017/mean-mvp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/items', itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
