// const cluster = require('cluster');
// const {isMainThread,Worker} = require('worker_threads');
// const CPUs = require('os').cpus()
const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const underScore = require('./utils/underscore');
const {loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000; // if PORT is not defined, use 8000

const server = http.createServer(app);//app is a function that returns an http server

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