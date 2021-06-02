const request = require('request')

const forecast = (longitude,latitude,callback)=>{

    const url ='http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon='+ longitude +'&appid=12def8cfee884c0d70afef05076185b2&units=metric'

    //ES6 shorthand
//     request({url,json:true},(error,{body})=>{
//         if(error){
//             callback('Unable to connect to weather service',undefined)
//         }else if(body.message){
//                 callback(body.message,undefined)
//         }else{
//                 callback(undefined,'Temprature is ' +body.main.temp+' c')
//         }
//     })
// }
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(response.body.message){
                callback(response.body.message,undefined)
        }else{
                callback(undefined,'Temprature is ' +response.body.main.temp+' c')
        }
    })
}

module.exports = forecast