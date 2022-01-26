import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { useState } from "react";
import { useDispatch } from 'react-redux';


function TextWithCheckbox(props) {

    const dispatch = useDispatch()

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

    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = (event) => {
        if(event.key === 'Enter') {
            dispatch({
                type: 'EDIT',
                newVal: event.target.value,
                props
            })
            setIsEdit(false)
        }
        if(event.key === 'Escape') {
            setIsEdit(false)
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        if(window.confirm(`Delete item "${props.text}"?`)) {
            dispatch({
                type: 'DELETE',
                props
            })
        }
    }

    const color = props.checked ? '#1976d2' : '#888'

    return(
        <div className='tree-item'>
            <Checkbox
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onClick={(e) => e.stopPropagation()} 
                onChange={handleCheck} 
                style={{color}}
            /> 
            <div className='tree-item-lable' onClick={handleTextClick}> 
                {isEdit ? 
                <input className='edit-item' onClick={e => e.stopPropagation()} onKeyUp={handleEdit} defaultValue={props.text} /> :
                props.text} 

                <div className='tree-item-actions'>
                    {props.level !== 0 && !isEdit && <EditIcon className='edit-icon' fontSize='small' color='action' onClick={e => {e.stopPropagation(); setIsEdit(true)}} />}
                    {props.level !== 0 && <DeleteIcon className='delete-icon' color='action' onClick={handleDelete} /> }
                </div>
            </div> 
            
        </div>
    )
}

export default TextWithCheckbox