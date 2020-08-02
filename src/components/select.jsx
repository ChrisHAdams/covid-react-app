import React from 'react'
import Styled from 'styled-components'

const SelectStyle = Styled.select`
  border: 2px solid ;
  border-color: #428bca;
  border-top-color: #428bca;
  border-bottom-color: #428bca;
  border-left-color: #428bca;
  border-right-color: #428bca;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 20%;
  height: 30px;
  font-size: .8rem;
  background-color: ${props => props.disabled ? 'LightGray' : 'white' };

  @media (max-width: 500px) {
    width: 20%;
   }

  `;

const SelectLabelStyle = Styled.label`
    width: 40%;
  `;


function Select(props){

  return (
    <div >
      <SelectLabelStyle>{props.labelText}</SelectLabelStyle>
      <SelectStyle
        id ={props.id}
        className={props.className}
        defultValue={props.value}
        onChange={props.controlFunc}
        disabled={props.disabled}
        data-testid={props.dataTestId}>
        {props.options.map(item => <option key={item.key} value={item.value}>{item.text}</option>)}

      </SelectStyle>
    </div>
  );
}

export default Select;