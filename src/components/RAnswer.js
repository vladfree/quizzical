export default function RAnswer(props){
    return(
        <div>
            <input
                type="radio"
                id={props.id}
                name="answer"
                value={props.id}
                checked={props.isHeld}
                onChange={props.handleClick}
            />
            <label htmlFor={props.id}>{props.value}</label>
        </div>
    )
}