const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const findData = require('./utile/index');
// const states_ = require('./data/nigeria.state.js');
let states_ = require('./data/nigeria.state');

var app = express();
app.use(cors());

const rootEndPoint = '/api/v1';
 
// create application/json parser
var jsonParser = bodyParser.json();
app.use(jsonParser);
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
 
// POST /login gets urlencoded bodies
app.get(rootEndPoint+'/countries', function (req, res) {
    res.json({
        countries: [{
            name: 'Nigeria',
            id: 1
        }]
    });
});
 
// POST /api/users gets JSON bodies
app.get(rootEndPoint + '/states', function (req, res) {
    // => /state?countryId=ID
    const countryId = req.query.countryId;
    if (Number(countryId) === 1) {
        const country = 'Nigeria';
        res.status(200).json({
            states: states_
        });   
        return;
    }
    res.json({
        message: 'Country not in support yet!!!'
    })
});

app.get(rootEndPoint + '/lga', function(req, res){
    const stateId = req.query.stateId;
    const newData = _.find(states_, { id: Number(stateId) });
    res.status(200).json({
        lga: newData.locals
    });
});

app.post(rootEndPoint + '/getdata', function(req, res){
    const { stateId, lgaId } = req.body;
    const data = { stateId, lgaId };
    const newData = findData(data, states_);
    res.status(200).json(newData);
});

app.get('/', function(req, res){
    const header = req.header;
    res.json({
        headerData: header,
        date: new Date(),
        message: "This is Loky service",
        endPoint: {
            rootEndPoint: rootEndPoint,
            api_1: '[GET]=> /countries ',
            api_2: '[GET]=>  /api/v1/',
            api_3: '[GET]=> /lga?stateId=ID',
            api_4: '[GET]=> /getdata'
        }
    });
});

app.listen(process.env.PORT || 3000);
console.log('Server litening......');