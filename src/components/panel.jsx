import React from 'react';
import Styled from 'styled-components';


const PanelStyle = Styled.div`
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 1em;
    background-color: #293447;
    border: 2px solid #48aff0;

    @media (max-width: 600px) {
      border: 1px solid #48aff0;
      padding: 0.25em;
      margin: 0.25em;
    }

`;


function Panel(props) {

  return (
    <PanelStyle>
      {props.children}
    </PanelStyle>

  );

}

export default Panel;
