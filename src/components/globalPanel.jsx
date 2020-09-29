import React from 'react';
import Styled from 'styled-components';
import Panel from './panel';

const FlexGrid = Styled.div`
  display: flex;
`;

const FlexCol = Styled.div`
  flex: 1;
`;

function GlobalPanel(props) {

  let countryOneData = '';
  let countryTwoData = '';

  if(props.globalDeaths === 0) {

    return('');

  } else {

    if(props.countryOneCases > 0){

      countryOneData = <><h4>{props.countryOne} Cases {props.countryOneCases.toLocaleString()}.</h4>
      <h4>{props.countryOne} Deaths {props.countryOneDeaths.toLocaleString()}.</h4>
      <h4>{props.countryOne} Deaths {props.countryOneDeathsPercentage}%.</h4></>;

      countryTwoData = <><h4>{props.countryTwo} Cases {props.countryTwoCases.toLocaleString()}.</h4>
        <h4>{props.countryTwo} Deaths {props.countryTwoDeaths.toLocaleString()}.</h4>
        <h4>{props.countryTwo} Deaths {props.countryTwoDeathsPercentage}%.</h4></>;
    }

    return (
      <Panel>
        <FlexGrid>
          <br/>
            <FlexCol>
              <h4>Global Cases {props.globalCases.toLocaleString()}.</h4>
              <h4>Global Deaths {props.globalDeaths.toLocaleString()}.</h4>
              <h4>Global Deaths {props.globalDeathsPercentage}%.</h4>
            </FlexCol>
            <FlexCol>
              {countryOneData}
            </FlexCol>
            <FlexCol>
              {countryTwoData}
            </FlexCol>
          <br/>
        </FlexGrid>
      </Panel>

    );

  }

}

export default GlobalPanel;
