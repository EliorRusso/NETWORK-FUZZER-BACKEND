const express = require('express');
const app = express();
const fs = require('fs');
var cp = require('child_process');
const content = 'Some content!';
const { exec } = require('child_process');
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/api", (req, res) => {
    console.log(req.body.a)
    res.json(req.body.a)
    fs.writeFile('/home/elior/express3/protocol.json', JSON.stringify(req.body.a), err => {
        if (err) {
          console.error(err);
        }
      });
});
app.post("/api2", (req, res) => {
  console.log(req.body.a)
  res.json(req.body.a)
  fs.writeFile('/home/elior/express3/packetdata.json', JSON.stringify(req.body.a), err => {
      if (err) {
        console.error(err);
      }
    });
});
app.post("/api3", (req, res) => {
  console.log(req.body.a)
  res.json(req.body.a)
  fs.writeFile('/home/elior/express3/packetdata2.json', JSON.stringify(req.body.a), err => {
      if (err) {
        console.error(err);
      }
    });
});

app.listen(5000, () => { console.log("Listening on port 5000")})
cp.exec('sh u.sh', function(err, stdout, stderr) {
  // handle err, stdout, stderr
  console.log(stdout);
  console.log(err);
  console.log(stderr)
});