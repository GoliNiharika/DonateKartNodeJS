const moment = require('moment');
const request = require('request');
//const rxjs = require('rxjs');

//sorts the json by totalAmount field and prints title, totalAmount, backersCount, endDate

request('https://testapi.donatekart.com/api/campaign', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var arr = body;
  arr.sort(function(a, b) {
    var keyA = new Date(a.totalAmount),
      keyB = new Date(b.totalAmount);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  console.log(arr.map(({title, totalAmount, backersCount, endDate}) => ({title, totalAmount, backersCount, endDate})));
});


request('https://testapi.donatekart.com/api/campaign', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var listOfActiveCampaigns = body.filter(array => moment(array.endDate).valueOf() >= moment().valueOf());
  console.log(listOfActiveCampaigns); // first condition  --> filtered records which ar active
  var listofWithinThirtyDays = listOfActiveCampaigns.filter(array => moment(array.created).valueOf() >= moment(moment().subtract(30, 'days')).valueOf())
  console.log(listofWithinThirtyDays); //second condition  --> filtered records further to get campaigns created from last one month
});



request('https://testapi.donatekart.com/api/campaign', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var listOfClosedCampaigns = body.filter(array => moment(array.endDate).valueOf() < moment().valueOf());
  console.log(listOfClosedCampaigns);   //printing closed campaigns
});


request('https://testapi.donatekart.com/api/campaign', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var list = body.filter(array => array.procuredAmount <= array.totalAmount);
  console.log(list);   
});


