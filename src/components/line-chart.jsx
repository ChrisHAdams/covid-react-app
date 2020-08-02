import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import Styled from 'styled-components';


const Panel = Styled.div`
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 1em;
    background-color: #293447;
    border: 2px solid #48aff0;
`;

function BasicLineChart(props) {

  if(props.data.length === 0) {

    return('');

  } else {

    return (
      <Panel>
      <br/>
      <div>{props.title}</div>
      <br/>
      <LineChart
        width={1100}
        height={500}
        data={props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.lineOneData} stroke="#4290f5" />
        <Line type="monotone" dataKey={props.lineTwoData} stroke="#92c78f" />

      </LineChart>
      <br/>
      </Panel>
    );

  }

}

export default BasicLineChart;
