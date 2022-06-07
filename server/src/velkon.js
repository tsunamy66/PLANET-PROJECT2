
// const obj1 = JSON.parse(obj);
// const obj3 = JSON.stringify(obj1);
// const obj4 = JSON.stringify(obj1, null, 3);
// const obj2 = JSON.parse(obj, (key, value) => {
//     if (key === 'age') return value + 10;
//     return value;
// });
// console.log(obj1);
// console.log(obj3);
// console.log(obj4);

// async vs sync

// const axios = require('axios');

// promise in 2 ways:
// 1. Promise constructor
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//          resolve('done');
//         // reject('error');
//     }, 2000);
// });
// promise.then((data) => {
//     console.log(promise);
//     console.log(data);
//     promise.then((data) => {
//         console.log(data);
//     });
// }).catch((err) => {
//     console.log(err);
// });
// 2. async/await
// async function getData() {
//     try{
//         // await waits for the promise to resolve
//         let data = await promise;
//         let data1 = await promise;
//         let data2 = await promise;
//         let data3 = await promise;
//         return {data2: data2}
//     }catch(err){
//         // if promise is rejected, catch is called
//         throw err; 
//         // console.log(err);
//     }
// }

// call promise in 2 ways:
// 1. then/catch

// let gd = getData();
// gd.then((data) => {
//     console.log("Then Scope:");
//     console.log(gd);
//     console.log(data);
// }).catch((err) => {
//     console.log("Catch Scope:");
//     console.log(gd);
//     console.log(err);
// })

// axios.get('https://jsonplaceholder.typicode.com/posts/1').then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// });

// setTimeout(() => {
//     console.log("Hello");
// }, 0);
// async function getAxios() {
//     try{
//         let res = await axios.get('http://localhost:3000');
//         console.log(res.data);
//     }catch(err){
//         console.log(err);
//     }
// }

// getAxios()

// I/O (input/output):
// request lib: axios, node-fetch
// fs
// mongoose
// const express = require('express');
// const app = express()

// var obj = {name:"John", age:30, city:"New York"}
// console.log(obj['name']);
// console.log(obj.age);
// app.set('json replacer', replacer); // property transformation rules
// app.set('json spaces', 2); // number of spaces for indentation

// app.get("/", function (req, res) {
//     res.send(obj)
// })

// app.listen(3000, () => { 
//     console.log(obj);
// })

// const object = {
//     country: '🇨🇦',
//     cities: {city: 'vancouver' },
// };
//   let spreadClone = { ...object };//copy kam omgh spread operator
//   let objectClone = Object.assign({}, object);//copy kam omgh Object.assign()
//   let jsonClone = JSON.parse(JSON.stringify(object));//copy Amigh json.stringify()
//     // Changed our cloned object
//   object.country = '🇹🇼'
//   object.cities.city = 'taipei'
//   console.log("spreadClone: ", spreadClone);
//   console.log("objectClone: ", objectClone); 
//   console.log("jsonClone: ", jsonClone); 
////////////////////////////////////////////////////////////////
// let  str = "  Hello World  ".trim();
// let  str1 = Array.from(str);
// console.log(str1);
////////////////////////////////////////////////////////////////
// function httpAddNewLaunch(req, res) {
//     let launch = req.body;
//     console.log(launch.launchData)
//     console.log(req.body['launchData'])
//     Object.assign(launch, {launchDate: new Date(launch.launchData) });
//     addNewLaunch(launch);
//   }
/////////////////////////////////////////
// let date = new Date("febrary, 25, 1988xxx")
// console.log(date);
// console.log(date instanceof Date);
// console.log(isNaN(date));
////////////////////////////////////////////
// let launches = new Map()
// launches.set("a", 1);
// launches.set("b", 2);
// launches.set("c", 3);
// launches.set("d", 4);
// let launch = { a: false, "b": 2, "c": 3, "d": 4 };
// if( launch){
//     console.log("a is defined");
// }else{
//     console.log("a is not defined");
// }
// let strJson = JSON.stringify(launch);
// console.log(strJson);
// console.log('launch:', launch);

// let assObj = Object.assign(launch, {
//     upcoming: true,
//     success: true,
//     costumer: ["ZTM", "NASA"],
//     flightNumber: 100
// });
// console.log(`assObj:`, assObj);

// launch.a = 1;
// launch.b = 2;
// launch.c = 3;
// launch.d = 4;
// console.log(launches.get("a"));
// console.log('launches: ', launches);
// console.log('launch: ', launch);

// console.log('Array.from(launches.values()):', Array.from(launches.values())); //Array of values
// console.log('Array.from(launch.values()):', Array.from(launch.values())); //Not working

// console.log('launches.values(): ', launches.values()); //Object of values
// console.log("launch.values(): ", launch.values()); //not working

// console.log('Object.values(launches): ', Object.values(launches)); //Empty array
// console.log('Object.values(launch): ', Object.values(launch)); //Array of values
// console.log(Object.values(launch) == Array.from(launches.values()));//False
// function httpAbortLaunch(req, res) {
//   let { flightNumber } = req.params;
//   let launch = getAllLaunches().find(launch => launch.flightNumber === +flightNumber);
//   if (!launch) {
//     return res.status(404).json({
//       error: "Launch not found",
//     });
//   }
//   launch.upcoming = false;
//   launch.success = false;
//   return res.status(200).json(launch);
// }
//////////////////////////////////////////////////////////////
let arr1 = [2, 3, 4, 5];
arr1.flatMap(function(x,y,z){
    console.log(x,y,z)
    })
// let a = arr1.map(x => [x * 2]);
// console.log('arr1.map(x => [x * 2])= ', a);
// // [[2], [4], [6], [8]]
// let b = arr1.flatMap(x => [x * 2]);
// console.log('arr1.flatMap(x => [x * 2])= ', b);
// // [2, 4, 6, 8]
// // only one level is flattened
// let c = arr1.flatMap(x => [[x * 2]]);
// console.log('arr1.flatMap(x => [[x * 2]])= ', c);
// // [[2], [4], [6], [8]]
// var arr = [1, 2, 3, 4];
// let d = arr.flatMap(x => [x, x * 2]);
// console.log('arr.flatMap(x => [x, x * 2])= ', d);
// // is equivalent to
// var n = arr.length;
// console.log('arr.length= ', n);
// var acc = new Array(n * 2);
// console.log('new Array(n * 2)= ', acc);
// for (let i = 0; i < n; i++) {
//     var x = arr[i];
//     acc[i * 2] = x;
//     acc[i * 2 + 1] = x * 2;
// }
// console.log('acc= ', acc);
// [1, 2, 2, 4, 3, 6, 4, 8]
//////////////////////////////////////////////////////////////
// let arr1 = ["it's Sunny in", "", "California"];
// console.log('arr1.map(x => x.split(" "))= ', arr1.map(x => x.split(" ")));
// // [["it's","Sunny","in"],[""],["California"]]
// console.log('arr1.flatMap(x => x.split(" "))= ', arr1.flatMap(x => x.split(" ")));
// ["it's","Sunny","in", "", "California"]
//////////////////////////////////////////////////////////////
