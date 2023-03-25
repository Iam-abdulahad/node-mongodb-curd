const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//Use middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://ahmmedsumon086:cLbfveWeSGLW5xuK@cluster0.tdy11iu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");

    const user = {nmae: 'Adil Ahanaf Habib', email: 'habib@gmail.com' };
    const result = await userCollection.insertOne(user);
    console.log(`User inserted with id ${result.insertedId}`);

  }
  finally {
    await client.close();
  }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hurrah!. My Node working with mongoDB baal kaj korenah')
})

app.listen(port, () => {
  console.log('system is working but MongoDB is not working!');
})