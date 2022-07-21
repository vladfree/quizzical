export default function RAnswer(props){
    return(
        <div>
            <input
                type="radio"
                id={props.id}
                name="answer"
                value={props.id}
                onClick={props.handleClick}
            />
            <label htmlFor={props.id}>{props.value}</label>
        </div>
    )
}