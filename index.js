const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').objectId;


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

    // get users
    app.get('/user', async (req, res) => {
      const query = {};
      const curser = userCollection.find(query);
      const user = await curser.toArray();
      res.send(user);
    })


    // POST User : add a new user
    app.post('/user', async (req, res) => {
      const newUser = req.body;
      console.log('new user added ', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result)
    })

     // delete a user

     app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: objectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
     })

  }
  finally {
    // await client.close();
  }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hurrah!. My Node working')
})

app.listen(port, () => {
  console.log('system is working but MongoDB is not working!');
})