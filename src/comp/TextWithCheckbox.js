import Checkbox from '@mui/material/Checkbox';

import { useDispatch } from 'react-redux';


function TextWithCheckbox(props) {

    const dispatch = useDispatch();

    const handleCheck = (event) => {
        dispatchCheck(event.target.checked)
    }

    const handleTextClick = (event) => {
        event.stopPropagation();
        dispatchCheck(!props.checked)
    }

    const dispatchCheck = (checkVal) => {
        dispatch({
            type: 'CHECK',
            checkVal,
            props
        })
    }

    return(
        <div>
            <Checkbox
                id={props.text} 
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onClick={(e) => e.stopPropagation()} 
                onChange={handleCheck} 
            /> 
            {props.isSearch &&
            <input onChange={props.onChange} defaultValue={props.text}/> ||
            <a onClick={handleTextClick}> {props.text} </a>}
            
        </div>
    )
}

export default TextWithCheckbox