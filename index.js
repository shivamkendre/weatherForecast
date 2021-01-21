const http = require("http");
const fs = require("fs");
const requests = require("requests");
var data = fs.readFileSync("home.html", "UTF-8");
const server = http.createServer((req, res)=>{
        requests("https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=e6778392aaeb5d71c756182bb63986e7")
        .on('data', (chunk) =>{
          var obj = JSON.parse(chunk);
            var realData =  data.replace("{%temp%}", (obj.main.temp - 273.15).toFixed(2));
            realData = realData.replace("{%country%}", obj.sys.country);
            realData = realData.replace("{%city%}", obj.name);
            realData = realData.replace("{%mintemp%}", obj.main.temp_min - 273.15);
            realData = realData.replace("{%maxtemp%}", obj.main.temp_max - 273.15);
            realData = realData.replace("{%tempstatus%}", obj.weather[0].main);
          res.writeHead(200, {"content-type": "text/html"});
          res.write(String(realData));
          res.end();
        })
        .on('end', (err)=> {
          if (err) return console.log('connection closed due to errors', err);
         
          console.log('end');
        });
});
server.listen(8000, "localhost", ()=>{
        console.log("Server is listening at port 8000");
});


// [  
//         {
//           coord: { lon: 72.85, lat: 19.01 },
//           weather: [ [Object] ],
//           base: 'stations',
//           main: {
//             temp: 298.15,
//             feels_like: 299.94,
//             temp_min: 298.15,
//             temp_max: 298.15,
//             pressure: 1012,
//             humidity: 73
//           },
//           visibility: 2500,
//           wind: { speed: 2.6, deg: 300 },
//           clouds: { all: 46 },
//           dt: 1609600035,
//           sys: {
//             type: 1,
//             id: 9052,
//             country: 'IN',
//             sunrise: 1609551724,
//             sunset: 1609591366
//           },
//           timezone: 19800,
//           id: 1275339,
//           name: 'Mumbai',
//           cod: 200
//         }
//       ]