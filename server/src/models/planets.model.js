const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");
const planets = require('./planets.mongo.js');
let savePromise = new Promise((resolve) => {
    saveResolve = resolve;
});
let i = 0;

function isHabitablePlanet(planet) {
    return (
        planet[`koi_disposition`] === `CONFIRMED` &&
        planet[`koi_insol`] > 0.36 &&
        planet[`koi_insol`] < 1.11 &&
        planet[`koi_prad`] < 1.6
    );
    // planet.username == "tsunamy"
}
// xparse.on(`data`, (chunk)=>{
//        console.log(chunk);
// })
// console.log(typeof xparse);

// process.stdout.write(xcreatReadStream)
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({ comment: `#`, columns: true }))
            .on(`data`, async function (data) {
                if (isHabitablePlanet(data)) {
                    savePlanet(data);
                }
            })
            .on(`error`, function (err) {
                console.log(err);
                reject(err);
            })
            .on(`end`, async function () {
                const countPlanetFound = (await getAllPlanets()).length;
                console.log(`${countPlanetFound} habitable planet found!`);
                await savePromise;
                resolve();
            });
    })
}
// promise.then(function(data){
//     console.log(
//         data.map(function (planet) {
//             return planet.kepler_name;
//         }))
// }).catch(function(err){
//     console.log(err)
// });
async function getAllPlanets() {
    const allPlanets = await planets.find({}, { _id: 0, __v: 0 });
    // console.log(allPlanets);
    return allPlanets;
}
async function savePlanet(planet) {
    try {
        i++
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        });
        console.log(--i);
        if(i == 0){ saveResolve()} 
    } catch (err) {
        console.error(`Could not save planet ${planet.keplerName}`, err);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};

//const a = [1,2,3]
// let aa = JSON.parse('{ "p" : 5}', (key, value) =>
//   typeof value === 'number'
//     ? value * 2 // return value * 2 for numbers
//     : value     // return everything else unchanged
// );
// console.log(aa);
// let bb = JSON.stringify(aa)
// console.log(bb);
// // { p: 10 }

// let xx = JSON.parse('{"1": 10,"2": 20,"3":{"4":40,"5":{"6": 60}}}',(key, value) => {
//   //console.log(key); // log the current property name, the last is "".
//   if(typeof value === 'number'){
//     return (value*2)
//   }else{
//     return value   // return the unchanged property value.
//   }
// });
// console.log(xx);
// let yy = JSON.stringify(xx)
// console.log(yy);
// console.log("xx:",xx);

// JSON.parse('{"foo" : 1}');

// JSON.parse('{"foo": 1}');

// 1
// 2
// 4
// 6
// 5
// 3
// ""
