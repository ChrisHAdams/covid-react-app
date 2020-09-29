import React from 'react';
import Panel from './panel';
import Styled from 'styled-components';

const UlStyle = Styled.ul`

    @media (max-width: 800px) {
      padding: 0.25em;
      margin: 0.25em;
    }

`;

const LiStyle = Styled.li`

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

function PanelList(props) {

  const styleObj = {"list-style-type": "none"};


  function getListItems(topListValue){

    let listItems = props.data.map((item, index) =>
      <LiStyle key={index} style={styleObj}>
        {index+1} - {item.country} - {item.count.toLocaleString()}
      </LiStyle>
    );

    if(topListValue ==='TopTen'){

      listItems = listItems.slice(0, 10);
    }

    return listItems;

  }

  const listItems = getListItems(props.switch);

  return (
    <Panel>
      <h5>{props.title}</h5>
      <UlStyle>{listItems}</UlStyle>
    </Panel>
  );

}

export default PanelList;
