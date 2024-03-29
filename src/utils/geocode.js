const request = require('request')

const geocode = function geocode (address,callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia3VuYWxzaW5naGNjcyIsImEiOiJja3BiZThuMHUxMXRtMnpvZ3Bya3NuYTNtIn0.fZtFDV4cDUcl2h1sxoZDfw'

//     request({url,json:true},(error,{body})=>{
//         if(error){
//             callback('Unable to connect to location services !',undefined)
//         }else if (body.features.length === 0){
//             callback('Unable to find location !',undefined)
//         }else{
//             callback(undefined,{
//                 longitude: body.features[0].center[0],
//                 latitude: body.features[0].center[1],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services !',undefined)
        }else if (response.body.features.length === 0){
            callback('Unable to find location !',undefined)
        }else{
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode