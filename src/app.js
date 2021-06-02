const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location 
app.set('views', viewPath)
app.set('view engine','hbs')  
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Kunal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        name:'Kunal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some useful text',
        name:'Kunal'
    })  
})

app.get('/weather',(req, res)=>{
    if(!req.query.address)
        return res.send({error : 'No address Provided'})
    
    geocode(req.query.address,(error,geocodeData)=>{
        if(error){
            return res.send({error : error })
        }    
    
        forecast(geocodeData.longitude,geocodeData.latitude,(error,forecastData)=>{
            if(error){
                return res.send({error : error})
            }
            res.send({
                location : geocodeData.location,
                forecastData:forecastData
            })
        })
    })
})    
        
app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Kunal',
        errorMessage: 'Page not found'
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 Help',
        name:'Kunal',
        errorMessage: 'Help article not found'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port' + port )
})