const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./auth");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const fs = require("fs");

const CodeSnippet = require("./models/CodeSnippet");
const User = require("./models/User");

const { createFile } = require("./fileHandler");
const { addJobToQueue } = require("./jobQueue");
const Job = require("./models/Job");

const MONGO_URL = "mongodb://mongo:27017/compiler";

mongoose.set("strictQuery", false);
mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Successfully connected to mongoDB database");
  }
);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "cats",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

app.get("/auth/userdata", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/failure",
  })
);

app.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.send("Logout successfull");
  });
});

app.get("/auth/failure", (req, res) => {
  res.send("Could not authenticate");
});

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if (jobId == undefined) {
    return res.status(400).json({ success: false, error: "Missing ID" });
  }

  try {
    const job = await Job.findById(jobId);

    if (job == undefined) {
      return res.status(404).json({ success: false, error: "Invalid ID" });
    }

    return res.status(200).json({ success: true, job });
  } catch (err) {
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

app.get("/download", async (req, res) => {
  const sourceFile = req.query.path;
  const jobId = path.basename(sourceFile).split(".")[0];
  const filePath = path.join(__dirname, "codal", jobId + ".hex");

  res.download(filePath, "MICROBIT.hex");
});

app.post("/compile", async (req, res) => {
  const { language, code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const filePath = await createFile(code);

    const job = await new Job({ language, filePath }).save();
    const jobId = job["_id"];
    addJobToQueue(jobId);

    res.status(201).json({ success: true, jobId });
  } catch (err) {
    return res.status(500).json({ success: false, err: JSON.stringify(err) });
  }
});

app.post("/save", async (req, res) => {
  const codeSnippet = req.body;

  try {
    const currentDate = new Date();

    const updatedSnippet = await CodeSnippet.findOneAndUpdate(
      { _id: codeSnippet._id ?? new mongoose.Types.ObjectId() },
      {
        user: codeSnippet.user,
        fileName: codeSnippet.fileName,
        code: codeSnippet.code,
        lastEdited: currentDate,
      },
      { new: true, upsert: true }
    );

    res.json(updatedSnippet);
  } catch (error) {
    console.error("Error creating code snippet:", error);
  }
});

app.get("/codesnippets", async (req, res) => {
  try {
    const { googleId } = req.query;
    const codeSnippets = await CodeSnippet.find({ user: googleId });
    res.json({ codeSnippets });
  } catch (error) {
    console.error("Error fetching code snippets:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});

app.delete("/codesnippets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const codeSnippet = await CodeSnippet.findByIdAndDelete(id);
    if (codeSnippet) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: "Code snippet not found" });
    }
  } catch (error) {
    console.error("Error deleting code snippet:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/codesnippets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const codeSnippet = await CodeSnippet.findById(id);

    if (codeSnippet) {
      res.json(codeSnippet);
    } else {
      res.status(404).json({ error: "Code snippet not found" });
    }
  } catch (error) {
    console.error("Error fetching code snippet:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
