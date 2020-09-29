
export function buildChartData(covidData, countryOne, countryTwo) {

  let countryOneData = [];
  let countryTwoData = [];
  let chartData = [];

  covidData[countryOne].forEach(function(item){

    let increase = 0;
    let deathIncrease = 0;
    let increasePercentage = 0;

    if(countryOneData.length > 1 ) {
      increase = parseInt(item.confirmed) - parseInt(countryOneData[countryOneData.length - 1].confirmed);
      increasePercentage = (increase / parseInt(countryOneData[countryOneData.length - 1].confirmed)) * 100;
      deathIncrease = parseInt(item.deaths) - parseInt(countryOneData[countryOneData.length - 1].deaths);

      if(!isFinite(increasePercentage)) { increasePercentage = 0}
    }

    let obj = `{"date": "${getShortDate(item.date)}",
                "confirmed": "${item.confirmed}",
                "deaths": "${item.deaths}",
                "increase": "${increase}",
                "increasePercentage": "${increasePercentage}",
                "deathIncrease": "${deathIncrease}"}`;

    countryOneData.push(JSON.parse(obj));

  });

  covidData[countryTwo].forEach(function(item){

    let increase = 0;
    let increasePercentage = 0;
    let deathIncrease = 0;

    if(countryTwoData.length > 1 ) {
      increase = parseInt(item.confirmed) - parseInt(countryTwoData[countryTwoData.length - 1].confirmed);
      increasePercentage = (increase / parseInt(countryTwoData[countryTwoData.length - 1].confirmed)) * 100;
      deathIncrease = parseInt(item.deaths) - parseInt(countryTwoData[countryTwoData.length - 1].deaths);

      if(!isFinite(increasePercentage)) { increasePercentage = 0}

    }

    let obj = `{"date": "${getShortDate(item.date)}",
                "confirmed": "${item.confirmed}",
                "deaths": "${item.deaths}",
                "increase": "${increase}",
                "increasePercentage": "${increasePercentage}",
                "deathIncrease": "${deathIncrease}"}`;

    countryTwoData.push(JSON.parse(obj));

  });

  for(let i = 0; i < countryOneData.length; i++) {

    let start = false;

    if (!start){
      if((countryOneData[i].confirmed > 0) || (countryTwoData[i].confirmed > 0)) {
        start=true;
      }
    }

    if(start){
      let obj= `{"date": "${countryOneData[i].date}",
                 "countryOneConfirmed": ${countryOneData[i].confirmed},
                 "countryOneDeaths" : ${countryOneData[i].deaths},
                 "countryOneDeathIncrease" : ${countryOneData[i].deathIncrease},
                 "countryOneIncrease" : ${countryOneData[i].increase},
                 "countryOneIncreasePercentage" : ${countryOneData[i].increasePercentage},
                 "countryTwoConfirmed": ${countryTwoData[i].confirmed},
                 "countryTwoDeaths" : ${countryTwoData[i].deaths},
                 "countryTwoIncrease" : ${countryTwoData[i].increase},
                 "countryTwoIncreasePercentage" : ${countryTwoData[i].increasePercentage},
                 "countryTwoDeathIncrease" : ${countryTwoData[i].deathIncrease}}`;

      chartData.push(JSON.parse(obj));
    }

  }

  console.log(chartData);

  return chartData;

}

export function getTopSpikes(chartdata){

  let response = [];
  let tempArray = [];
  console.log(chartdata);

  const countryList = Object.keys(chartdata);

  countryList.forEach(function(country){

    let spike = chartdata[country][chartdata[country].length - 1].confirmed - chartdata[country][chartdata[country].length - 4].confirmed;

    if (spike <= 0) { spike = 0; }

    let tempObj={};
    tempObj.country = country;
    tempObj.count = spike;

    tempArray.push(tempObj);

  });

  tempArray.sort(function (a, b) {
    return b.count - a.count;
  });

  for (let count = 0; count < tempArray.length; count ++) {
    let tempObj = {};
    tempObj.country = tempArray[count].country;
    tempObj.count = tempArray[count].count;
    response.push(tempObj);
  }

  console.log(response);

  return response;

}

export function getTopDeaths(chartdata){

  let response = [];
  let tempArray = [];

  const countryList = Object.keys(chartdata);

  countryList.forEach(function(country){

    let tempObj = chartdata[country][chartdata[country].length - 1];
    tempObj.country = country;

    tempArray.push(tempObj);
  });

  tempArray.sort(function (a, b) {
    return b.deaths - a.deaths;
  });

  for (let count = 0; count < tempArray.length; count ++) {
    let tempObj = {};
    tempObj.country = tempArray[count].country;
    tempObj.count = tempArray[count].deaths;
    response.push(tempObj);
  }

  console.log(response);

  return response;

}

export function getTopInfections(chartdata){

  let response = [];
  let tempArray = [];

  const countryList = Object.keys(chartdata);

  countryList.forEach(function(country){

    let tempObj = chartdata[country][chartdata[country].length - 1];
    tempObj.country = country;

    tempArray.push(tempObj);
  });

  tempArray.sort(function (a, b) {
    return b.confirmed - a.confirmed;
  });

  for (let count = 0; count < tempArray.length; count ++) {
    let tempObj = {};
    tempObj.country = tempArray[count].country;
    tempObj.count = tempArray[count].confirmed;
    response.push(tempObj);
  }

  console.log(response);

  return response;

}

function getShortDate(dateString) {

  try {

    const a = new Date(dateString.replace(/-/g, "/"));

    var month = "0" + (a.getMonth() + 1).toString();
    month = month.substring(month.length - 2, month.length);

    var date = "0" + a.getDate().toString();
    date = date.substring(date.length - 2, date.length);

    var shortDate = date + '-' + month;

    return shortDate;

  } catch(err) {
    console.log(err);
    return '';
  }

}



