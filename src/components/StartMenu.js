export default function StartMenu({startGame}){
    return (
        <div className="startMenu">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={startGame}>Start quiz</button>
        </div>
    )
}