const { getAllPlanets } = require('../../models/planets.model');

// promise.then(function(data){
//     // console.log(
//     //     data.map(function (planet) {
//     //         return planet.kepler_name;
//     //     }))
//         getAllPlanets()
// }).catch(function(err){
//     console.log(err)
// });
async function httpGetAllPlanets(req, res) { //this is the function that will be called when the get request is made
    // console.log(planets);
    return res.status(200).json(await getAllPlanets()) // return the response as a json object
}
// async function waitPlanets() {
//     await loadPlanetData();
//     console.log(planets);
//}
// waitPlanets();
// getAllPlanets()
module.exports = {
    httpGetAllPlanets
}