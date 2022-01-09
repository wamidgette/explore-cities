import styled from 'styled-components'

const CheckBoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

const CheckBoxLabel = styled.label`
  input{
    position: absolute;
    opacity: 0;
  }
  transition: 0.3s;
  width: max-content;
  height: 50px;
  border-radius: 10px;
  border: 2px solid var(--secondary-color);
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  background: white;
  &.checked{
    background: orange;
  }
`;
/**
 * takes param optionsData array and createsradio buttons with data
 * @param {optionsdata} param0 
 * @returns 
 */

export default function RadioOptions({optionsData}){
  function styleChange(e){
    if(e.target.checked){
      e.target.parentElement.classList.add('checked')
    }
    else{
      e.target.parentElement.classList.remove('checked')
    }
  }
  return(<>
  <CheckBoxContainer>
    {optionsData.map((data, index) => 
      <CheckBoxLabel for={data}>
        <input onChange={styleChange} type="checkbox" id={data} naem ={data} key={index} value={data}/>
        <div>
          <span>{data}</span>
        </div>
      </CheckBoxLabel>
    )}
  </CheckBoxContainer>
  </>)
}