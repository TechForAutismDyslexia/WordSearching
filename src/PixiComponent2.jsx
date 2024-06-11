import {Container, Stage, Text, Graphics } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextStyle } from 'pixi.js';
// import { clear } from 'console';
// import confetti from 'canvas-confetti';

function PixiComponent2() {
    
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    let completedWord = useMemo(()=>["ant", "tan", "nib", "bat"], []);
    const [selectedWord, setSelectedWord] = useState("")
    const [drawing, setDrawing] = useState(false)
    const [indices, setIndices] = useState([])
    const [givenWords, setGivenWords] = useState("");
    const [completedWords, setCompletedWords] = useState([])
    const [lineClear, setLineClear] = useState(false)
    const [lines, setLines] = useState([])
    const [StrCompletedWords,setStrCompletedWords] = useState("");
    let [tries, setTries] = useState(0)
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [completedTime, setCompletedTime] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [mobile, setMobile] = useState(false)


    // useEffect(() => {
    //     setStartTime(new Date());
    //     const interval = setInterval(() => {
    //         setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    //     }, 1000);

    //     // Clear the interval when the component unmounts
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     if (completedWords.length === completedWord.length && startTime) {
    //         setEndTime(new Date());
    //     }
    // }, [completedWords, completedWord, startTime]);

    // useEffect(() => {
    //     if (startTime && endTime) {
    //         const elapsed = endTime - startTime;
    //         setCompletedTime(elapsed);
    //     }
    // }, [startTime, endTime]);

    // useEffect(() => {
    //     if (completedTime !== null) {
    //         alert(`Congratulations! You completed the game in ${completedTime} milliseconds.`);
    //     }
    // }, [completedTime]);


    useEffect(()=>{
        setGivenWords(completedWord.join("\t\t"))
    },[completedWord])

    const draw = useCallback((g)=>{
        if(lines.length > 0){
        lines.forEach(line=>{
            if(line.clear === true){
                g.clear;
            }})}

        if(indices.length >=2 && !lineClear){
        g.clear()
        g.lineStyle(2, 15853020);
        if(lines.length > 0){
        lines.forEach(line=>{
            if(line.clear === true){
                g.clear;
            }
            else{
                g.moveTo(line.start_x, line.start_y)
                g.lineTo(line.end_x, line.end_y)
            }
            console.log("Length of line: "+lines.length);
        })
    }
        g.moveTo(puzzle[indices[indices.length - 2]].xPos, puzzle[indices[indices.length-2]].yPos);
        g.lineTo(puzzle[indices[indices.length - 1]].xPos, puzzle[indices[indices.length - 1]].yPos);
        
        console.log("length: "+lines.length)
        g.endFill();
        }
        if(lineClear){
            lines.forEach(line=>{
                if(line.clear === "none"){
                    g.clear;
                }
            })
            setLineClear(false)
        }
    },[indices, puzzle, lineClear, lines])

    
    
    const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        setLines([])
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        if(window.innerHeight > 630 && window.innerWidth > 830){
        const textArr = ["a", "e", "e", "d", "n", "s", "e", "p", "t", "a", "n", "a", "a", "e", "i", "i", "a", "s", "o", "d", "t", "y", "t", "t", "b", "t", "r"];
        let hei;
        let k = 0;
        let newPuzzle = [];
        for (let ind = 0; ind < 27; ind++) {
            if (ind <= 8) {
                hei = 150;
            } else if (ind <= 17) {
                hei = 50;
                if (ind === 9) {
                    k = 0;
                }
            } else {
                hei = -50;
                if (ind === 18) {
                    k = 0;
                }
            }
            let xPos = dimensions.width / 2 - 400 + 100 * (k);
            let yPos = dimensions.height / 2 - hei;
            k++;

            newPuzzle.push({
                text: textArr[ind],
                xPos,
                yPos,
                color: 'black',
                index: ind,
                selected: false,
                initColor: 'black'
            });
        }
        setPuzzle(newPuzzle);
    }
    else{
        const textArr = ["a", "e", "e", "d", "n", "s", "e", "p", "t", "a", "n", "a", "a", "e", "i", "i", "a", "s", "o", "d", "t", "y", "t", "t", "b", "t", "r"];
        let hei;
        let k = 0;
        let newPuzzle = [];
        setMobile(true)
        for (let ind = 0; ind < 27; ind++) {
            if (ind <= 8) {
                hei = 150;
            } else if (ind <= 17) {
                hei = 100;
                if (ind === 9) {
                    k = 0;
                }
            } else {
                hei = 50;
                if (ind === 18) {
                    k = 0;
                }
            }
            let xPos = dimensions.width / 2 - 155 + 40 * (k);
            let yPos = dimensions.height / 2 - hei*2;
            k++;

            newPuzzle.push({
                text: textArr[ind],
                xPos,
                yPos,
                color: 'black',
                index: ind,
                selected: false,
                initColor: 'black'
            });
        }
        setPuzzle(newPuzzle);
    }
    }, [dimensions]);


    useEffect(() => {
        const handlePointerMove = (e) => {
            if(!drawing){
                return;
            }
            if(drawing){
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                let color = word.color;
                // console.log("CCColor: "+color)
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                )
                if(distance< 40 && word.selected === false){
                    console.log(word.text)
                    setSelectedWord(prev => prev + word.text)
                    setIndices([...indices, word.index])
                    word.selected = true
                    if(indices.length >= 2){
                    setLines((line)=>[
                        ...line,{start_x: puzzle[indices[indices.length - 2]].xPos, start_y: puzzle[indices[indices.length - 2]].yPos, end_x:puzzle[indices[indices.length - 1]].xPos, end_y:puzzle[indices[indices.length - 1]].yPos, clear: "none"}
                    ])
                }
                    // word.initColor = 'green'
                }
                return {
                    ...word,
                    color: distance <= 40 ? 'green':color,
                };
            });

            setPuzzle(updatedPuzzle);
        }
        else{
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                // let color = word.color;
                // console.log("CCColor: "+color)
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                )
                if(distance< 40 && !mobile){
                    console.log(word.text)
                return {
                    ...word,
                    color: distance <= 40 ? 'green':word.initColor,
                };
            }
            else{
                console.log(word.text)
                return {
                    ...word,
                    color: distance <= 5 ? 'green':word.initColor,
                };
            }
            });

            setPuzzle(updatedPuzzle);
        }
        };
        const handlePointerDown = (e) => {
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if(distance< 40 && mobile){
                    console.log(word.text)
                    setDrawing(true)
                        setSelectedWord(prev => prev + word.text)
                        setIndices([...indices, word.index])
                        word.selected = true
                        setTries(tries++);
                        return {
                            ...word,
                            color:'green'
                        };
            }
                else if(distance<5 && mobile){
                    console.log(word.text)
                    setDrawing(true)
                        setSelectedWord(prev => prev + word.text)
                        setIndices([...indices, word.index])
                        word.selected = true
                        setTries(tries++);
                        return {
                            ...word,
                            color:'green'
                        };
            }
            return word;

        });
        setPuzzle(updatedPuzzle)
        };

        const handlePointerUp = () => {
            setDrawing(false);
            console.log(indices)
            if (!completedWord.includes(selectedWord)) {
                for(let l=0;l<indices.length;l++){
                    for(let k=0;k<puzzle.length;k++){
                    if(indices[l] === puzzle[k].index){
                        puzzle[k].color="black"
                        puzzle[k].selected = false
                        setPuzzle(puzzle)
                        lines.forEach(line=>{
                            if(line.clear === "none"){
                                line.clear = true
                            }
                        })
                    }
                }
                }
                setSelectedWord("")
                setDrawing(false);
                setIndices([])
                setLineClear(true)
            } 
            else if(!completedWords.includes(selectedWord)){
                setDrawing(false);
                // alert("Congrats!! You have found a word");
                setCompletedWords([...completedWords,selectedWord+"\t\t"]);
                setStrCompletedWords(prev => prev + selectedWord + "\t\t");
                console.log("completed:"+completedWords[0])
                if(indices.length >= 2){
                    setLines((line)=>[
                        ...line,{start_x: puzzle[indices[indices.length - 2]].xPos, start_y: puzzle[indices[indices.length - 2]].yPos, end_x:puzzle[indices[indices.length - 1]].xPos, end_y:puzzle[indices[indices.length - 1]].yPos}
                    ])
                }
                setSelectedWord("");
                setIndices([])
                for(let l=0;l<indices.length;l++){
                    for(let k=0;k<puzzle.length;k++){
                    if(indices[l] === puzzle[k].index){
                        puzzle[k].initColor = 'green'
                        setPuzzle(puzzle)
                        lines.forEach(line=>{
                            if(line.clear === "none"){
                                line.clear = false;
                            }
                        })
                    }
                }
                }
            }
            else{
                alert("Already found the word "+selectedWord+"!!")
                setSelectedWord("")
            }
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp); 
        window.addEventListener('pointermove', handlePointerMove);
       
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [puzzle, selectedWord, indices, completedWord, completedWords, drawing, lines, tries]);

    useEffect(()=>{
       if (completedWords.length === completedWord.length) {
            // confetti();
            alert("Congrats!!You have finished the game.")
    }},[completedWords, completedWord])



    return (
    <>
        <Stage x={0} y={0} options={{ backgroundColor: 11505519 }} height={dimensions.height - 250} width={dimensions.width}>
        <Graphics draw={draw} /> 

            <Container name='textArea'>
            {puzzle.map((word) => (
                <Text
                    key={word.index}
                    text={word.text}
                    anchor={0.5}
                    x={word.xPos}
                    y={word.yPos}
                    style={new TextStyle({
                        fill: word.color,
                    })}
                    interactive={true}
                />
            ))}
            {/* <Graphics draw={draw} />  */}
            </Container>
            {/* <Text
                text={`Selected Word: ${selectedWord}`}
                x={50}
                y={50}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            /> */}

                {/* <Text
                text={`Given Words: ${givenWords}`}
                x={500}
                y={600}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            />
                <Text
                text={`Completed Words: ${StrCompletedWords}`}
                x={500}
                y={650}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            />
                <Text
                text={`Number of tries: ${tries}`}
                x={500}
                y={700}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            /> */}
        </Stage>
        {/* <canvas ref={confettiCanvasRef} className="confetti-canvas"></canvas> */}
        <br/>
        <br/>
        <h3>Selected Word: {selectedWord}</h3>
        <h1>Given Words: {givenWords}</h1>
        <h3>Completed Words: {StrCompletedWords}</h3>
        {/* <h3>Time: {elapsedSeconds}</h3>
        {completedTime && (
                <h3>Time taken to complete: {completedTime / 1000} seconds</h3>
            )} */}
        </>
    );
}

export default PixiComponent2;