const express = require('express');
const app = express();
const fs = require('fs');
const request = require('request');
var cp = require('child_process');
const content = 'Some content!';
const { exec } = require('child_process');
var cors = require("cors");
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'textdb',
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
  const decodedData = decodeTextFile('/home/elior/express3/received_file.txt');
  // Insert the decoded data into a table in the database
  const sql = 'INSERT INTO my_table (data) VALUES (?)';
  connection.query(sql, [decodedData], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      return;
    }
    console.log('Data inserted into database:', result);
    connection.end(); // Close the connection
  });
});
function decodeTextFile(filePath) {
  // Read the file into a buffer
  const buffer = fs.readFileSync(filePath);

  // Decode the buffer into a string
  const decodedText = buffer.toString();

  return decodedText;
}
app.use(cors());
app.use(express.json());

app.post("/FirstHeader", (req, res) => {
  console.log(req.body.a)
  res.json(req.body.a)
  fs.writeFile('/home/elior/express3/protocol.json', JSON.stringify(req.body.a), err => {
    if (err) {s
      console.error(err);
    }
  });
});
app.post("/SecondHeader", (req, res) => {
  //console.log(req.body.a)
  res.json(JSON.stringify(req.body.a.DataHeader))
  const Headerdata = [JSON.stringify(req.body.a.DataHeader)];
  console.log(Headerdata);
  fs.writeFile('/home/elior/express3/protocolheader2.json', JSON.stringify(req.body.a), err => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFileSync('/home/elior/Fuzzer/Mutate/WebInfo/protocolheaderdata.h', `#ifndef PROTOCOLHEADERDATA_H\n#define PROTOCOLHEADERDATA_H\n\n char* protocolHeaderData = \n  ${Headerdata.join('",\n  "')}\n;\n\n#endif`);
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
app.get('/execute-dos', (req, res) => {
  console.log("reached");
  exec('sudo sh /home/elior/express3/compileddos.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  const cpuUsage = req.body.cpuUsage;
  console.log(`CPU usage: ${cpuUsage}`);
  res.sendStatus(200);

});
app.post('/cpu-status', (req, res) => {
  const cpuUsage = req.body.cpuUsage;
  console.log(`CPU usage: ${cpuUsage}`);
  res.sendStatus(200);
});


app.get('/random-inputs', (req, res) => {
  console.log("reached");
});
app.get('/jsonData', (req, res) => {
  fs.readFile('/home/elior/express3/recievestatistics.json', 'utf8', (err, data) => {
    if (err) throw err;
    let jsonArray = data.split("\n").filter(Boolean).map(JSON.parse);
    let numbersArray = jsonArray.reduce((acc, curr) => {
      return acc.concat(Object.values(curr).filter(val => typeof val === 'number'));
    }, []);
    console.log(numbersArray);
    res.send(numbersArray);
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
  const message = {
    text: 'Hello from Node.js!'
  };

  // Send the message as an HTTP POST request
  request.post({
    url: 'http://localhost:8083',
    json: message
  }, (error, response, body) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`Response: ${response.statusCode} ${response.statusMessage}`);
  });

});
app.get('/get-decoded-text', (req, res) => {
  // Read and decode the text file
  const decodedText = decodeTextFile('/home/elior/express3/received_file.txt');

  // Send the decoded text as the response
  res.send(decodedText);
});
app.get('/get-decoded-text2', (req, res) => {
  // Read and decode the text file
  const decodedText2 = decodeTextFile('/home/elior/Fuzzer/Mutate/InfoToSend/rawpackets.txt');

  // Send the decoded text as the response
  res.send(decodedText2);
});
app.listen(5000, () => { console.log("Listening on port 5000") })
cp.exec('sh u.sh', function (err, stdout, stderr) {
  // handle err, stdout, stderr
  console.log(stdout);
  console.log(err);
  console.log(stderr)
});
