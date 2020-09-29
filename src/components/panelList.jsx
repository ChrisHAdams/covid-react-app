import React from 'react';
import Panel from './panel';

function PanelList(props) {

  const styleObj = {"list-style-type": "none"};


  function getListItems(topListValue){

    console.log("Selected " + topListValue);

    let listItems = props.data.map((item, index) =>
      <li key={index} style={styleObj}>
        {index+1} - {item.country} - {item.count.toLocaleString()}
      </li>
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
      <ul>{listItems}</ul>
    </Panel>
  );

}

export default PanelList;
