const express = require("express");
const cors = require("cors");
const app = express();
const {
  queryContainer,
  userContainer,
  commentContainer,
  replyContainer,
} = require("./db/db");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/userAuth");
//middleware for parsing json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes

app.get("/", async (req, res) => {
  try {
    const data = await queryContainer.items.query("SELECT * from c").fetchAll();
    res.send({
      data: data.resources,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/:user", async (req, res) => {
  const { user } = req.params;
  const querySpec = {
    query: "SELECT * FROM c WHERE c.username = @user",
    parameters: [
      {
        name: "@user",
        value: user,
      },
    ],
  };
  try {
    const { resources: queries } = await queryContainer.items
      .query(querySpec)
      .fetchAll();
    res.json(queries);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/upload", async (req, res) => {
  try {
    await queryContainer.items.create(req.body);
    res.send({ message: "Data inserted successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, full_name, email } = req.body;
    const oldUser = await userContainer.items
      .query(`SELECT * from c WHERE c.username = "${username}" `)
      .fetchAll();
    if (oldUser.resources.length > 0) {
      throw new Error("Username same");
    }
    await userContainer.items.create({
      username,
      password,
      full_name,
      email,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userContainer.items
      .query(
        `SELECT * from c WHERE c.username = "${username}" AND c.password = "${password}"`
      )
      .fetchAll();
    if (user.resources.length > 0) {
      const accessToken = jwt.sign(
        { ...user.resources[0] },
        "randomsecretfromankitandadarsh"
      );
      res.send({ message: "User logged in successfully", accessToken });
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.post("/verify", (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, "randomsecretfromankitandadarsh");
    res.send({ user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

app.get("/posts/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.category = @category",
      parameters: [
        {
          name: "@category",
          value: category,
        },
      ],
    };

    const {resources:posts} = await queryContainer.items
      .query(querySpec)
      .fetchAll()
        res.json({data:posts});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.post("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, username } = req.body;
    await commentContainer.items.create({ comment, query_id: id, username });
    res.sendStatus(201); 
    
    await axios.post("https://prod-79.eastus.logic.azure.com:443/workflows/e695d048b68440d8b2542f778850da12/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=8fVm1LBlEr3AwqGz7_Jyd5y1EITyDxdPC6VsixlB4vo",{
      to:"dipankar.baruah@pwc.com",
      body:"this is an email"
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});




app.get("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const querySpec = {
      query: "SELECT * FROM c WHERE c.query_id = @id",
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    };
    const { resources: comments } = await commentContainer.items
      .query(querySpec)
      .fetchAll();
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/reply/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reply, username } = req.body;
    await replyContainer.items.create({ reply, comment_id: id, username });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get("/reply/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const querySpec = {
      query: "SELECT * FROM c WHERE c.comment_id = @id",
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    };
    const { resources: replies } = await replyContainer.items
      .query(querySpec)
      .fetchAll();
    res.status(200).json({ replies });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const port = process.env.PORT || 8000;  
app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);  
});  