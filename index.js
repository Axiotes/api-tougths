const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const conn = require("./db/conn");
const cors = require("cors");

const app = express();

// CONTROLLERS
const ToughtController = require("./controllers/ToughtController");

// MODELS
const Tought = require("./models/Tought");
const User = require("./models/User");

// ROUTES
const toughtRoutes = require("./routes/toughtRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "our_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/toughts", toughtRoutes);
app.use("/", authRoutes);

app.get("/", ToughtController.showToughts);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
