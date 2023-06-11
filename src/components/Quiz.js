import { useEffect,useState,useRef} from "react"
import Question from "./Question"
import {nanoid} from "nanoid"
import he from "he"
export default function Quiz(){
    const isStartPossible=useRef(true) 
    const [quizData,setQuizData]=useState([])
    const [isChecked,setIsChecked]=useState(false)
    const [correctAnswers,setCorrectAnswers]=useState(0)
    useEffect(()=>{
        if(isStartPossible.current){
            fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res=>res.json())
            .then(data=>setUserAnswers(data.results))
            isStartPossible.current=false
            
        }
    },[quizData])
    function setUserAnswers(data){
        const newArray=data.map((element)=>(
            {
                ...element,
                userAnswer:'',
                answers:mixAnswer(element.incorrect_answers,element.correct_answer),
                id:nanoid()
            }
        ))
        setQuizData(newArray)
    }
    function changeUserAnswer(questionId,answer){
        if(!isChecked){
            setQuizData(prevState=>prevState.map(question=>(
                question.id===questionId ? {
                    ...question,
                    userAnswer:answer
                } : question
            )))
        }
    }
    function mixAnswer(incorrectAnswers,correctAnswer){
        const array = []
        const incorrectAnswersCopy=incorrectAnswers.map(el=>el)
        while(incorrectAnswersCopy.length){
            const random=Math.floor(Math.random() * incorrectAnswersCopy.length)
            const element=incorrectAnswersCopy[random]
            array.push(he.decode(element))
            incorrectAnswersCopy.splice(random,1)
        }
        const random=Math.floor(Math.random() * (incorrectAnswers.length+1))
        array.splice(random,0,he.decode(correctAnswer))
        return array
    }
    const questions=quizData.map((question)=>{
        return(
            <Question
                key={question.id} 
                question={he.decode(question.question)} 
                userAnswer={question.userAnswer}
                correctAnswer={question.correct_answer}
                changeUserAnswer={changeUserAnswer}
                questionId={question.id}
                answers={question.answers}
                isChecked={isChecked}
                />
        )
    })
    function checkAnswer(){
        setIsChecked(true)
        const corrects=quizData.filter(object=>object.userAnswer===object.correct_answer)
        setCorrectAnswers(corrects.length)
    }
    function playAgain(){
        isStartPossible.current=true
        setIsChecked(false)
        setCorrectAnswers(0)
        setQuizData([])
    }
    return(
        <>
        {quizData.length===0 && <img className="loading" src="../images/loading.gif" alt="loading"/>}
        {quizData.length!==0 && 
            <div className="quiz">
                {questions}
                <div className="bottom">
                {isChecked ? <>
                    <h3>Your scored {correctAnswers}/{quizData.length} answers</h3>
                    <button onClick={playAgain}>Play again</button>
                    </>
                : <button onClick={checkAnswer}>Check answers</button>}
                </div>
            </div>}
        </>
    )
}