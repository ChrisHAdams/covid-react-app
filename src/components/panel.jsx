import React from 'react';
import Styled from 'styled-components';


const PanelStyle = Styled.div`
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 1em;
    background-color: #293447;
    border: 2px solid #48aff0;
`;


function Panel(props) {

  return (
    <PanelStyle>
      {props.children}
    </PanelStyle>

  );

}

export default Panel;
