const { getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById } = require("../../models/launches.model");
const { getpagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  // console.log("req.params: ", req.params);
  // console.log("req.query: ", req.query);
  // console.log("req.url: ", req.url);
  const {skip, limit} = getpagination(req.query);
  // console.log('getAllLaunches() : ',getAllLaunches());
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}
async function httpAddNewLaunch(req, res) {
  let launch = req.body;
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  // let allPlanets = await getAllPlanets()
  // let planet = allPlanets.find(p => p.keplerName === launch.target)
  // if (!planet) { return res.status(400).json({ error: "Target Planet not found in DataBase" }); }
  Object.assign(launch, { launchDate: new Date(launch.launchDate) });
  if (isNaN(launch.launchDate)) { //or if(launch.launchDate.toString() === 'Invalid Date')
    return res.status(400).json({ error: "Invalid launch date" });
  }
  let newLaunch = await scheduleNewLaunch(launch);
  return res.status(201).json(newLaunch);
  // req.pipe(res); 
  // res.end()
}

async function httpAbortLaunch(req, res) {
  let launchId = Number(req.params.id);
  const existsLaunch = await existsLaunchWithId(launchId);
  console.log("existsLaunch: ", existsLaunch);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    })
  }
  const aborted = await abortLaunchById(launchId);
  console.log("launchId: ", aborted);
  if (!aborted) { return res.status(500).json({ error: "Could not abort launch" }); }
  return res.status(200).json({
    message: "Launch aborted",
  })
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}
