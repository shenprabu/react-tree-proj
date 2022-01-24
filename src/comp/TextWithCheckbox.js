import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

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
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onClick={(e) => e.stopPropagation()} 
                onChange={handleCheck} 
            /> 
            <a onClick={handleTextClick}> {props.text} <DeleteIcon className='delete-item' color='action' onClick={e => e.stopPropagation()} /> </a> 
            
        </div>
    )
}

export default TextWithCheckbox