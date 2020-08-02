import React from 'react'
import Styled from 'styled-components'

const ButtonStyle = Styled.button`
  border: 2px solid ;
  border-color: #428bca;
  border-top-color: #428bca;
  border-bottom-color: #428bca;
  border-left-color: #428bca;
  border-right-color: #428bca;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 10%;
  height: 30px;
  font-size: .8rem;
  background-color: ${props => props.disabled ? 'LightGray' : 'white' };

  @media (max-width: 500px) {
    width: 20%;
   }

  `;


function Button(props){

  return (
    <div >

      <ButtonStyle
        id ={props.id}
        className={props.className}
        defultValue={props.value}
        disabled={props.disabled}
        data-testid={props.dataTestId}
        onClick={props.controlFunc}>
        {props.buttonText}
      </ButtonStyle>
    </div>
  );
}

export default Button;