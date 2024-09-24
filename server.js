const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');



const dotenv = require("dotenv");

//config dotenv
dotenv.config({ path: "./config/config.env" });

//initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


//body parser the incoming request
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//set ports
const PORT = process.env.PORT || 8000;

//import routes
const loginRouter = require("./routes/loginRouter.js");
const AboutRouter  = require("./routes/aboutRouter.js");
const AssignRouter  = require("./routes/beatRouter.js");
const ReportRouter = require("./routes/reportRouter.js")

//use routes
app.use("/logins", loginRouter);
app.use("/about", AboutRouter);
app.use("/assign",AssignRouter);
app.use("/report",ReportRouter);




//allow cross domain requests
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const locations = {}; // To store the locations of workers
const socketToWorkerMap = {}; // To map socket IDs to worker IDs

io.on('connection', (socket) => {
  console.log('A user connected'+ socket.id);

  socket.on('workerLocation', (data) => {
    console.log(data);
    const { workerId, latitude, longitude,beat } = data;
    

    locations[workerId] = { value:{latitude, longitude},label: String(beat) };

    socketToWorkerMap[socket.id] = workerId;
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const workerId = socketToWorkerMap[socket.id];

    if(workerId){
      delete locations[workerId];
      delete socketToWorkerMap[socket.id];
    }
  });
});

setInterval(() => {
  // Emitting locations to master client

  io.emit('currentLocations', {
    PC_3721: {
      value: { latitude: 37.421998333333335, longitude: -122.084 },
      label: "1"
    },    worker2: { value:{ latitude: 34.0522, longitude: -118.2437},label:"beat2"},
    worker3: { value:{ latitude: 51.5074, longitude: -0.1278},label:"beat3" }
  });
  // console.log(locations);
}, 5000);

//make app listen to port 8000
server.listen(PORT, () => {
  console.log(
    `Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
