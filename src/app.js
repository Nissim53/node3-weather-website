const path = require('path')
const express = require('express')
var hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app!',
        name: 'Nissim',
        directory: __filename
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Nissim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'help',
        name: 'Nissim'
    })
}) 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
                            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {longtitude, latitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longtitude, latitude, (error2, forecastData) => {
            if (error2) {
                return res.send({error2})
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nissim',        
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nissim',        
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port' + port)
})