const axios = require('axios');
const launchesDB = require('./launches.mongo.js');
const planetsMongo = require('./planets.mongo.js');
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
    console.log(`Loading Launch Data....`);
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }

            ]
        }
    })

    if (response.status !== 200) {
        console.log(`problem downloading launch data`);
        throw new Error(`Error Loading Launch Data: ${response.status}`)
    }

    const launchDocs = response.data.docs
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads']
        // console.log(`payloads:`, payloads);
        const customers = payloads.flatMap(payload => payload['customers'])
        // console.log(`customers:`, customers);
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: new Date(launchDoc['date_local']),
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
        }
        console.log(launch.flightNumber, launch.mission)
        await saveLaunches(launch)
    }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat",
    });
    if (firstLaunch) {
        console.log(`First Launch Already laoded: ${firstLaunch.flightNumber}`)
    } else {
        await populateLaunches()
    }
}

async function findLaunch(filter) {
    return await launchesDB.findOne(filter)
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({ flightNumber: launchId })
}

async function getLatestFlightNumber() {
    const latestFlightNumber = await launchesDB
        .findOne().sort('-flightNumber')
    if (!latestFlightNumber) {
        return 100
    }
    console.log("latestFlightNumber: ", latestFlightNumber.flightNumber);
    return latestFlightNumber.flightNumber
}

function getAllLaunches(skip, limit) {
    return launchesDB
        .find({}, { _id: 0, __v: 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit)
    // return Array.from(launches.values())
}

async function saveLaunches(launch) {
    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, { upsert: true })
}

async function scheduleNewLaunch(launch) {
    const planet = await planetsMongo.findOne({ keplerName: launch.target })
    if (!planet) { throw new Error("No Matching Planet Found") }
    const newFlightNumber = await getLatestFlightNumber() + 1
    const newLaunch = {
        ...launch,
        upcoming: true,
        success: true,
        customers: ["ZTM", "NASA"],
        flightNumber: newFlightNumber
    }
    await saveLaunches(newLaunch)
    console.log('newLaunch: ', newLaunch);
    return newLaunch
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDB.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false, success: false
    })
    return aborted.modifiedCount === 1
    // const aborted = launches.get(launchId)
    // aborted.upcoming = false;
    // aborted.success = false;
}

module.exports = {
    loadLaunchData,
    getAllLaunches,
    saveLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}
// console.log('launches: ', launches);
// console.log('launches.values(): ', launches.values());
// console.log('Array.from(launches.values())', Array.from(launches.values()));
// console.log('Object.values(launches): ', Object.values(launches));
// console.log('Object.values(launch): ', Object.values(launch));
// console.log("launch.values(): ", launch.values());

// const nameId ={
//     id : "7325894r59345985356"
// }
// const hojat = {
//     [nameId] : 'hojat',
//     lastNAme : "farahani"
// }
// delete hojat[nameId]
// console.log("hojat: ",hojat);
// const data = new Map()
// const handler = {
//     get(target, name)
//      {
//         const p=Proxy.bind(target)
//         return p;
//     },
//     set(target, prop, value) {
//         target.set(prop, value)
//     }
// };
// const dataProxied = new Proxy(data, handler);
// dataProxied['bla'] = 'blaa'
// dataProxied['bla2'] = 'blaaa2'
// dataProxied.has('bla')
// dataProxied.delete('bla2')