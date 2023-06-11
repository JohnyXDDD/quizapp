import {nanoid} from "nanoid"
export default function Question({question,userAnswer,correctAnswer,changeUserAnswer,questionId,answers,isChecked}){
    const correct={
        backgroundColor:"#94D7A2",
        border:"1px solid #94D7A2"
    }
    const wasWrong={
        backgroundColor: "#F8BCBC",
        opacity:0.5,
        border:"1px solid #F8BCBC"
    }
    const rest={
        opacity:0.5
    }
    const selectedAnswerStyle={
        backgroundColor:"#d6dbf5",
        border:"1px solid #d6dbf5"
    }
    const answersButtons=answers.map((answer) => {
        const styles= isChecked ? 
        answer===correctAnswer ? correct : answer===userAnswer ? wasWrong : rest
        : answer===userAnswer ? selectedAnswerStyle :null
        return (
        <button key={nanoid()} style={styles} 
        onClick={()=>changeUserAnswer(questionId,answer)}>
            {answer}
        </button>
        )})
    return(
        <div className="question">
            <h2>{question}</h2>
            <div className="answer">
                {answersButtons}
            </div>
        </div>
    )
}