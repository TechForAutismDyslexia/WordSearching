import {Container, Stage, Text } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useEffect, useMemo, useState } from 'react';
import { TextStyle } from 'pixi.js';

function PixiComponent2() {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    let completedWord = useMemo(()=>["ant", "tan", "nib", "bat"], []);
    const [selectedWord, setSelectedWord] = useState("")
    const [drawing, setDrawing] = useState(false)
    const [indices, setIndices] = useState([])
    const [givenWords, setGivenWords] = useState("");
    const [completedWords, setCompletedWords] = useState([])
    // const [lines, setLines] = useState([])

    useEffect(()=>{
        setGivenWords(completedWord.join("\t\t"))
    },[])

    
    
    const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
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
    }, [dimensions]);


    useEffect(() => {
        const handlePointerMove = (e) => {
            if(drawing){
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                let color = word.color;
                console.log("CCColor: "+color)
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
                let color = word.color;
                console.log("CCColor: "+color)
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                )
                if(distance< 40){
                    console.log(word.text)
                }
                return {
                    ...word,
                    color: distance <= 40 ? 'green':word.initColor,
                };
            });

            setPuzzle(updatedPuzzle);
        }
        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [puzzle, drawing, indices]);


    useEffect(() => {
        const handlePointerDown = (e) => {
            setDrawing(true)
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if(distance< 40){
                    console.log(word.text)
                        setSelectedWord(prev => prev + word.text)
                        setIndices([...indices, word.index])
                        word.selected = true
                }
                if(distance <= 40){
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
                    }
                }
                }
                setSelectedWord("")
                setDrawing(false);
                setIndices([])
            } 
            else {
                setDrawing(false);
                // alert("Congrats!! You have found a word");
                if(!completedWords.filter(selectedWord)){
                setCompletedWords(completedWords + selectedWord+"\t\t");
                }
                setSelectedWord("");
                setIndices([])
                for(let l=0;l<indices.length;l++){
                    for(let k=0;k<puzzle.length;k++){
                    if(indices[l] === puzzle[k].index){
                        puzzle[k].initColor = 'green'
                        // puzzle[k].selected = false
                        setPuzzle(puzzle)
                    }
                }
                }
            }
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [puzzle, selectedWord, indices, completedWord, completedWords]);

    return (
        <Stage x={0} y={0} options={{ backgroundColor: '#AF8F6F' }} height={dimensions.height} width={dimensions.width}>
            <Container name='textArea'>
            {/* <Graphics
                    draw={g => {
                        g.clear();
                        g.beginFill('#bd9');  // Background color in hex
                        g.drawRect(puzzle[0].xPos-20, puzzle[0].yPos-20, puzzle[23].xPos, puzzle[23].yPos-120);
                        g.endFill();
                    }}
                /> */}
            {puzzle.map((word) => (
                <Text
                    key={word.index}
                    text={word.text}
                    x={word.xPos}
                    y={word.yPos}
                    style={new TextStyle({
                        fill: word.color,
                    })}
                />
            ))}
            </Container>
            {/* <Graphics draw={draw} />  */}
            <Text
                text={`Selected Word: ${selectedWord}`}
                x={50}
                y={50}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            />

                <Text
                text={`Given Words: ${givenWords}`}
                x={500}
                y={600}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            />
                <Text
                text={`Completed Words: ${completedWords}`}
                x={500}
                y={650}
                style={new TextStyle({
                    fill: 'white',
                    fontSize: 24,
                })}
            />
        </Stage>
    );
}

export default PixiComponent2;
