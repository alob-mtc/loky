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
    const httpheaders = req.headers;
    var body = '';
    for (const key in httpheaders) {
        if (httpheaders.hasOwnProperty(key)) {
            const element = httpheaders[key];
            body += `
                <tr>
                    <td>${key}</td>
                    <td>${element}</td>
                </tr>
            `;
        }
    }
    var table = `
        <table>
            <tr>
                <th>Inex</th>
                <th>Value</th>
            </tr>
            ${body}
        </table>
    `;
    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
        <style>
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        max-width: 80rem;
        }
        
        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }
        
        tr:nth-child(even) {
        background-color: #dddddd;
        }
        </style>
        </head>
        <body>
            <center>
                <div>
                    <h1>Locky Service</h1>
                    <h3>${new Date()}</h3>
                    <h3>Root endpoint: ${rootEndPoint}</h3>
                    <h3>api_1: '[GET]=>  /api/v1/countries</h3>
                    <h3>api_2: '[GET]=> /lga?stateId=ID</h3>
                    <h3>api_3: '[GET]=> /getdata</h3>
                </div>
                <h2>HTTP Headers</h2>
                ${table}
            </center>
        
        </body>
    </html>
        
    `)
});

app.listen(process.env.PORT || 3000);
console.log('Server listening............');