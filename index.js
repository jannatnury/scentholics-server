const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
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
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * --------------------------------------------------
 * api
 * --------------------------------------------------
 */

async function product() {
    try {
        /**
         * --------------------------------------------------
         * Connect to MongoDB
         * --------------------------------------------------
         */
        await client.connect();
        const productCollection = client.db('Scentholics').collection('Perfumes');
        



       
 

        /**
         * --------------------------------------------------
         * Get all products
         * --------------------------------------------------
         */

        app.get('/api/product', async (req, res) => {
            const query = req.query;
            const cursor = query ? query : {};
            const products = await productCollection.find(cursor).toArray();
            res.send(products);
        });

        

        /**
         * --------------------------------------------------
         * get product by id
         * --------------------------------------------------
         */

        app.get('/api/product/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const product = await productCollection.findOne({ _id: ObjectId(id) });
            res.send(product);
        });

        /**
         * --------------------------------------------------
         * add product
         * --------------------------------------------------
         */

        app.post('/api/product', async (req, res) => {
            const product = req.body;
            // console.log(product);
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        /**
         * --------------------------------------------------
         * shipped a product single or multiple
         * --------------------------------------------------
         */

        app.put('/api/product/shipped/:id', async (req, res) => {
            const id = req.params.id;
            const qtn = req.body.quantity;
            const product = await productCollection.findOne({ _id: ObjectId(id) });
            if (product) {
                const quantity = qtn ? parseInt(product.quantity) - parseInt(qtn) : parseInt(product.quantity) - 1;
                const result = await productCollection.updateOne({ _id: ObjectId(id) }, { $set: { quantity: quantity } });
                res.send(result);
            }
            else {
                res.send('product not found');
            }
        });

       
        /**
         * -------------
         * Heroku
         *------------- 
        */
       app.get('/api/product',(req,res)=>{
             res.send("Herokuuuuu....")
       });

    }
    finally {
    /**
     * --------------------------------------------------
     * disconnect from MongoDB
     * --------------------------------------------------
     */
    // client.close();
}
};

product().catch(console.dir);


 // root route

 app.get('/', (req, res) => {
    res.send('scentholics server is running...');
});


//  server listening

app.listen(port, () => {
    console.log(`Server started on port... ${port}`);
});