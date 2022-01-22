import { useDispatch } from 'react-redux';


function TextWithCheckbox(props) {

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch({
            type: 'CHECK',
            checkVal: event.target.checked,
            props
        })
        // indeterminate => $(`[id='${id}']`).indeterminate = true
    }

    const handleTextClick = (event) => {
        event.stopPropagation();

        dispatch({
            type: 'CHECK',
            checkVal: !props.checked,
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