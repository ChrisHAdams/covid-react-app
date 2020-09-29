import React, { useState, useEffect } from "react";
import PageLayout from './components/page-layout';
import TopTenPanel from './components/topTenPanel';
import Panel from './components/panel';

//import buildChartData from './helpers/common';
import {buildChartData,getTopDeaths, getTopInfections, getTopSpikes} from './helpers/common';

import './css/page-layout.css';
import Select from './components/select';
import Button from './components/button';
import BasicLineChart from './components/line-chart';
import GlobalPanel from './components/globalPanel';
import Styled from 'styled-components';


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [covidData, setCovidData] = useState({});
  const [countrySelectList, setSelectCountryList] = useState([]);
  const [countryOne, setCountryOne] = useState('');
  const [countryTwo, setCountryTwo] = useState('');
  const [chartData, setChartData] = useState([]);
  const [globalCases, setGlobalCases] = useState(0);
  const [globalDeaths, setGlobalDeaths] = useState(0);
  const [globalDeathsPercentage, setGlobalDeathsPercentage] = useState(0);
  const [countryOneCases, setCountryOneCases] = useState(0);
  const [countryOneDeaths, setCountryOneDeaths] = useState(0);
  const [countryOneDeathsPercentage, setCountryOneDeathsPercentage] = useState(0);
  const [countryTwoCases, setCountryTwoCases] = useState(0);
  const [countryTwoDeaths, setCountryTwoDeaths] = useState(0);
  const [countryTwoDeathsPercentage, setCountryTwoDeathsPercentage] = useState(0);
  const [topInfectionCounts, setTopInfectionCounts] = useState([]);
  const [topDeathCounts, setTopDeathCounts] = useState([]);
  const [topSpikeCounts, setTopSpikeCounts] = useState([]);
  const [topListValue, setTopListSwitch] = useState('TopTen');

  const handleCountryOneChange = event => changeCountryOne(event.target.value);
  const handleCountryTwoChange = event => changeCountryTwo(event.target.value);

  const topListOptions = [{"key": "0", "value": "TopTen", "text": "Top Ten"},
                          {"key": "1", "value": "All", "text": "All"}];

  const handleTopListOptions = event => changeTopListOptions(event.target.value);

  useEffect(() => {
    fetch(`https://pomber.github.io/covid19/timeseries.json`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setCovidData(response);
        buildCountrySelectList(Object.keys(response));
        getGlobalValues(response);
        getTopLists(response);
        setIsLoading(false);
      })
   .catch(error => console.log(error));
  }, []);


  function buildCountrySelectList(countryList){

    let tempArray = [];
    let count = 0;

    let obj = `{"key": "${count}", "value": "None Selected", "text": "None Selected"}`;
    tempArray.push(JSON.parse(obj));

    countryList.forEach(function(item){

      count ++;
      let obj = `{"key": "${count}", "value": "${item}", "text": "${item}"}`;

      tempArray.push(JSON.parse(obj));

    });

    setSelectCountryList(tempArray);

  }

  function getGlobalValues(data){

    const countryList = Object.keys(data);
    let globalDeaths = 0;
    let globalCases = 0;

    countryList.forEach(function(country){

      globalCases += data[country][data[country].length - 1].confirmed;
      globalDeaths += data[country][data[country].length - 1].deaths;

    });

    let globaldeathsPercentage = (globalDeaths / globalCases) * 100;

    setGlobalCases(globalCases);
    setGlobalDeaths(globalDeaths);
    setGlobalDeathsPercentage(globaldeathsPercentage.toFixed(2));

  }

  function getTopLists(data){

    setTopDeathCounts(getTopDeaths(data));
    setTopInfectionCounts(getTopInfections(data));
    setTopSpikeCounts(getTopSpikes(data));

  }

  function plotDataClick(){
    const chartData = buildChartData(covidData, countryOne, countryTwo);
    setChartData(chartData);

    let cOneCases = chartData[chartData.length - 1].countryOneConfirmed;
    let cOneDeaths = chartData[chartData.length - 1].countryOneDeaths;

    setCountryOneCases(cOneCases);
    setCountryOneDeaths(cOneDeaths);

    setCountryOneDeathsPercentage(((cOneDeaths / cOneCases) * 100).toFixed(2));

    let cTwoCases = chartData[chartData.length - 1].countryTwoConfirmed;
    let cTwoDeaths = chartData[chartData.length - 1].countryTwoDeaths;

    setCountryTwoCases(cTwoCases);
    setCountryTwoDeaths(cTwoDeaths);

    setCountryTwoDeathsPercentage(((cTwoDeaths / cTwoCases) * 100).toFixed(2));

  }

  function changeCountryOne(value) {
    setCountryOne(value);
  }

  function changeCountryTwo(value) {
    setCountryTwo(value);
  }

  function changeTopListOptions(value) {
    setTopListSwitch(value);
  }

  return (
    <PageLayout>
      <h2>Covid-19 Graphs Page</h2>
      <Panel>
        <br/>
        <Select
          id ="countryOne"
          className="countryOneSelect"
          value="1"
          controlFunc={handleCountryOneChange}
          disabled={isLoading}
          data-testid="countryOneTestId"
          labelText="Country One"
          options={countrySelectList}
        />
        <Select
          id ="countryTwo"
          className="countryTwoSelect"
          value="1"
          controlFunc={handleCountryTwoChange}
          disabled={isLoading}
          data-testid="countryTwoTestId"
          labelText="Country Two"
          options={countrySelectList}
        />
        <br/>
        <Button
          id = "plotButton"
          className = "plotButton"
          disabled={isLoading}
          buttonText="Plot Charts"
          controlFunc= {plotDataClick}
        />

        {isLoading && <p>Wait, loading data...</p>}

        <br/>

      </Panel>
      <br/>
      <GlobalPanel
        globalDeaths={globalDeaths}
        globalCases={globalCases}
        globalDeathsPercentage={globalDeathsPercentage}
        countryOne={countryOne}
        countryOneCases={countryOneCases}
        countryOneDeaths={countryOneDeaths}
        countryOneDeathsPercentage={countryOneDeathsPercentage}
        countryTwo={countryTwo}
        countryTwoCases={countryTwoCases}
        countryTwoDeaths={countryTwoDeaths}
        countryTwoDeathsPercentage={countryTwoDeathsPercentage}
      />

      <br/>
      <BasicLineChart
        title={"Confirmed Cases - Running Totals"}
        data={chartData}
        lineOneData={"countryOneConfirmed"}
        lineTwoData={"countryTwoConfirmed"} />
      <br/>
      <BasicLineChart
        title={"Daily Count of New Cases"}
        data={chartData}
        lineOneData={"countryOneIncrease"}
        lineTwoData={"countryTwoIncrease"} />
      <br/>
      <BasicLineChart
        title={"Confirmed Deaths - Running Totals"}
        data={chartData}
        lineOneData={"countryOneDeaths"}
        lineTwoData={"countryTwoDeaths"} />
      <br/>
      <BasicLineChart
        title={"Daily Count of Deaths"}
        data={chartData}
        lineOneData={"countryOneDeathIncrease"}
        lineTwoData={"countryTwoDeathIncrease"} />
      <br/>
      <TopTenPanel
        topDeaths={topDeathCounts}
        topInfected={topInfectionCounts}
        topSpikes={topSpikeCounts}
        topListValue={topListValue}
        topListOptions={topListOptions}
        controlFunc={handleTopListOptions}
      />
    </PageLayout>
  );
}

export default App;
