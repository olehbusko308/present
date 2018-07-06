const express = require('express')
const axios = require('axios')
const app = express()
const FormData = require('form-data');
const querystring = require('querystring');
const bodyParser = require('body-parser')

var data = {
  clicked: 'Yes',
  dVin: '',
  dLotid: 'AIRPORTCDJR'
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('/client/index.html', {root: './'});
})

app.get('/submit', (req, res) => {
  if (data.dVin == '') {
    res.sendFile('/client/index.html', {root: './'});
    return;
  }
  axios.post('https://www.airportcdj.com/ajax-autocheck-postcode.php', querystring.stringify(data)).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.sendFile('/client/index.html', {root: './'});
  })
})

app.post('/credentials', (req, res) => {
  if ('dVin' in req.body) {
    data.dVin = req.body.dVin;
    res.send('success');
  } else {
    res.send('failure')
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
