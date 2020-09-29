import React from 'react';
import Styled from 'styled-components';
import Panel from './panel';

const FlexGrid = Styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const FlexCol = Styled.div`
  flex: 1;
`;

const H4Style = Styled.h4`

  @media (max-width: 1200px) {
    font-size: 0.9em;
  }
  @media (max-width: 1000px) {
    font-size: 0.8em;
  }
  @media (max-width: 600px) {
    font-size: 0.75em;
  }

`;

function GlobalPanel(props) {

  let countryOneData = '';
  let countryTwoData = '';

  if(props.globalDeaths === 0) {

    return('');

  } else {

    if(props.countryOneCases > 0){

      countryOneData = <><H4Style>{props.countryOne} Cases {props.countryOneCases.toLocaleString()}.</H4Style>
      <H4Style>{props.countryOne} Deaths {props.countryOneDeaths.toLocaleString()}.</H4Style>
      <H4Style>{props.countryOne} Deaths {props.countryOneDeathsPercentage}%.</H4Style></>;

      countryTwoData = <><H4Style>{props.countryTwo} Cases {props.countryTwoCases.toLocaleString()}.</H4Style>
        <H4Style>{props.countryTwo} Deaths {props.countryTwoDeaths.toLocaleString()}.</H4Style>
        <H4Style>{props.countryTwo} Deaths {props.countryTwoDeathsPercentage}%.</H4Style></>;
    }

    return (
      <Panel>
        <FlexGrid>
          <br/>
            <FlexCol>
              <H4Style>Global Cases {props.globalCases.toLocaleString()}.</H4Style>
              <H4Style>Global Deaths {props.globalDeaths.toLocaleString()}.</H4Style>
              <H4Style>Global Deaths {props.globalDeathsPercentage}%.</H4Style>
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
