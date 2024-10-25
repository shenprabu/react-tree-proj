import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { useState } from "react";
import { useDispatch } from 'react-redux';

import { check, edit, remove } from '../slices/treeSlice';
import { colorCodes, keys } from '../consts/StringConsts'

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
        dispatch(check({
            checkVal,
            props
        }))
    }

    const [isEdit, setIsEdit] = useState(false)
    const [isHoverd, setisHoverd] = useState(false)

    const handleEdit = (event) => {
        if(event.key === keys.ENTER) {
            dispatch(edit({
                newVal: event.target.value,
                props
            }))
            setIsEdit(false)
        }
        if(event.key === keys.ESCAPE) {
            setIsEdit(false)
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        if(window.confirm(`Delete item "${props.text}"?`)) {
            dispatch(remove(props))
        }
    }

    const color = props.checked ? colorCodes.BLUE : colorCodes.GREY

    return(
        <div className='tree-item' onMouseEnter={() => setisHoverd(true)} onMouseLeave={() => setisHoverd(false)}>
            <Checkbox
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onClick={(e) => e.stopPropagation()} 
                onChange={handleCheck} 
                style={{color}}
            /> 
            <div className='tree-item-lable' onClick={handleTextClick} > 
                {isEdit ? 
                <input className='edit-item' onClick={e => e.stopPropagation()} onKeyUp={handleEdit} defaultValue={props.text} /> :
                props.text} 

                {props.level !== 0 && isHoverd && <div className='tree-item-actions'>
                    {!isEdit && <EditIcon className='edit-icon' fontSize='small' color='action' onClick={e => {e.stopPropagation(); setIsEdit(true)}} />}
                    <DeleteIcon className='delete-icon' color='action' onClick={handleDelete} />
                </div>}
            </div> 
            
        </div>
    )
}

export default TextWithCheckbox