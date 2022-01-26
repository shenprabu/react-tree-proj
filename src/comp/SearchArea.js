import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch } from 'react-redux';


function SearchArea(props) {

    const dispatch = useDispatch();

    const handleCheck = (event) => {
        dispatchCheck(event.target.checked)
    }

    const dispatchCheck = (checkVal) => {
        dispatch({
            type: 'CHECK',
            checkVal,
            props
        })
    }

    const clearSearch = (event) => {
        props.clearSearch();
    }

    const color = props.checked ? '#1976d2' : '#888'

    return(
        <div className='search-area'>
            <Checkbox
                checked={props.checked} 
                indeterminate={props.indeterminate}
                onChange={handleCheck} 
                style={{color}}
            /> 
            <input onChange={props.onSearch} value={props.searchKey}/> <ClearIcon className='clear-search' fontSize='5px' color='action' onClick={clearSearch} />
        </div>
    )
}

export default SearchArea