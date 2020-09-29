import React from 'react';
import Panel from './panel';
import Styled from 'styled-components';
import PanelList from './panelList';
import Select from './select';

const FlexGrid = Styled.div`
  display: flex;
`;

const FlexCol = Styled.div`
  flex: 1;
`;

function TopTenPanel(props) {

  return (
    <Panel someProp='Some text'>
      <h3>Lists</h3>
      <Select
          id ="TopListSelect"
          className="topListSelect"
          value={props.topListValue}
          controlFunc={props.controlFunc}
          options={props.topListOptions}
        />
      <FlexGrid>
          <br/>
            <FlexCol>
              <PanelList title={'Top Infected'} data={props.topInfected} switch={props.topListValue}/>
            </FlexCol>
            <FlexCol>
              <PanelList title={'Top Deaths'} data={props.topDeaths} switch={props.topListValue}/>
            </FlexCol>
            <FlexCol>
              <PanelList title={'Top Spike Counts (increase in last 3 days)'} data={props.topSpikes} switch={props.topListValue}/>
            </FlexCol>
          <br/>
        </FlexGrid>
    </Panel>
  );

}

export default TopTenPanel;
