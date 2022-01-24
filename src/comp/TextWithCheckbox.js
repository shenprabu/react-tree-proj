import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/EditOutlined'
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
        <div className='tree-item'>
            <Checkbox
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onClick={(e) => e.stopPropagation()} 
                onChange={handleCheck} 
            /> 
            <div className='tree-item-lable' onClick={handleTextClick}> 
                {props.text} 
                <div className='tree-item-actions'>
                    {props.level !==0 && <EditIcon className='edit-icon' fontSize='small' color='action' onClick={e => e.stopPropagation()} />}
                    {props.level !== 0 && <DeleteIcon className='delete-icon' color='action' onClick={e => e.stopPropagation()} /> }
                </div>
            </div> 
            
        </div>
    )
}

export default TextWithCheckbox