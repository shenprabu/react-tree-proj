import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch } from 'react-redux';

import { check } from '../slices/treeSlice';
import { colorCodes } from '../consts/StringConsts';


function SearchArea(props) {

    const dispatch = useDispatch();

    const handleCheck = (event) => {
        if(!props.isNodata)
        dispatchCheck(event.target.checked)
    }

    const dispatchCheck = (checkVal) => {
        dispatch(check({
            checkVal,
            props: {...props, isCheckAll: true}
        }))
    }

    const clearSearch = () => {
        props.clearSearch()
        document.getElementById('search-box').value = ''
    }

    const color = props.checked ? colorCodes.BLUE : colorCodes.GREY

    return(
        <div className='search-area'>
            <Checkbox
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onChange={handleCheck} 
                style={{color}}
            /> 
            <input id='search-box' onChange={props.onSearch} /> <ClearIcon className='clear-search' fontSize='5px' color='action' onClick={clearSearch} />
        </div>
    )
}

export default SearchArea