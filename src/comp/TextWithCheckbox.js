import { useDispatch } from 'react-redux';


function TextWithCheckbox(props) {

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatchCheck(event.target.checked)
        // indeterminate => $(`[id='${id}']`).indeterminate = true
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
            <input type="checkbox"
                id={props.text} 
                checked={props.checked} 
                onClick={(e) => e.stopPropagation()} 
                onChange={handleChange} 
            /> 
            <a onClick={handleTextClick}> {props.text} </a>
        </div>
    )
}

export default TextWithCheckbox