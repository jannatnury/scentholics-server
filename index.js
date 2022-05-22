const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
// require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

/**
 * --------------------------------------------------
 * Middleware
 * --------------------------------------------------
 */
app.use(cors());
app.use(express.json());



/**
 * --------------------------------------------------
 * Config database
 * --------------------------------------------------
 * Mongo DB
 * --------------------------------------------------
 */



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6t6ti.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("scentholics").collection("perfumes");

//   // perform actions on the collection object
//   console.log("Mongo is connected");
//   client.close();
// });



/**
 * --------------------------------------------------
 * api
 * --------------------------------------------------
 */

// async function products() {
//     try {
//         /**
//          * --------------------------------------------------
//          * Connect to MongoDB
//          * --------------------------------------------------
//          */
//         await client.connect();
//         const productCollection = client.db('Scentholics').collection('Perfumes');



// root route

app.get('/', (req, res) => {
    res.send('scentholics server is running...');
});

     




//  server listening

app.listen(port, () => {
    console.log(`Server started on port... ${port}`);
});