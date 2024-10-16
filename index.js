// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

const parseDate = (dateString) => {
  let date;

  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  return date;
};

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const dateString = req.params.date;
  const date = parseDate(dateString);

  if (isNaN(date.getTime())) return res.json({ error: "Invalid Date" });

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
