// const cluster = require('cluster');
// const {isMainThread,Worker} = require('worker_threads');
// const CPUs = require('os').cpus()
const http = require('http');
require('dotenv').config();
const { mongoConnect } = require('./services/mongo');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const underScore = require('./utils/underscore');
const {loadLaunchData } = require('./models/launches.model');
const server = http.createServer(app);//app is a function that returns an http server
const PORT = process.env.PORT || 8000; // if PORT is not defined, use 8000
const launch = {
    flightNumber: 100, //flight_number
    mission: 'Kepler Fathpour',//name
    rocket: 'Explorer IS1',//rocket.name
    launchDate: new Date('December 27,2030'),//date_local
    target: "Kepler-442 b",//not applicable
    customers: ['ZTM', 'NASA'],//payloads.customers for each payload
    upcoming: true, //upcomig
    success: true//success
}

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, function () {
        console.group('Server:');
        console.log("app.toString():: ", app.toString())
        console.groupEnd();
        underScore()
    });
}

startServer();

// if (isMainThread) {
//     console.log(`main thread!Process ID: ${process.pid}`);
//     new Worker(__filename)
//     new Worker(__filename)
// } else {
//     console.log(`worker thread!Process ID: ${process.pid}`);
//     startServer()
// }

// cluster.schedulingPolicy = cluster.SCHED_RR
// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} started...`)
//     for (let i = 0; i < CPUs.length; i++) {
//         cluster.fork();
//     }
    // cluster.on('exit', (worker, code, signal) => {
    //     console.log(`worker ${worker.process.pid} died`);
    //   });
// } else {
// startServer();
//     console.log(`Worker ${process.pid} started`)
// }