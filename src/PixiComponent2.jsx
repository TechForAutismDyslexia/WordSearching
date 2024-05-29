import {Stage, Text } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useEffect, useState } from 'react';
import { TextStyle } from 'pixi.js';

function PixiComponent2() {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    let completedWord = ["ant", "tan", "nib", "bat"];
    const [selectedWord, setSelectedWord] = useState("")

    
    
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
            });
        }
        setPuzzle(newPuzzle);
    }, [dimensions]);


    useEffect(() => {
        const handlePointerMove = (e) => {
            // if(!drawing){
            //     return;
            // }
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                let color = word.color;
                console.log("CCColor: "+color)
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if(distance< 50){
                    console.log(word.text)
                    // setLetter(word.text);
                }
                return {
                    ...word,
                    color: distance <= 50 ? 'green':color,
                };
            });

            // nearestWord.current = updatedPuzzle.find((word) => word.color === 'green');
            setPuzzle(updatedPuzzle);
            // SetMovePos({x: e.clientX, y: e.clientY})
        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [puzzle]);


    useEffect(() => {
        const handlePointerDown = (e) => {
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if(distance< 50){
                    console.log(word.text)
                        setSelectedWord(prev => prev + word.text)
                        // console.log("Selected Word: "+selectedWord)
                }
                if(distance <= 50){
                    return {
                        ...word,
                        color:'green'
                    };
            }
            return word;

        });
        setPuzzle(updatedPuzzle)
        };

        window.addEventListener('pointerdown', handlePointerDown);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [puzzle, selectedWord]);

    useEffect(()=>{
        for(let i = 0;i<completedWord.length;i++){
            if(completedWord[i] === selectedWord){
                alert("Congrats!!You have won")
                setSelectedWord("")
            }
        }
    },[selectedWord])

    return (
        <Stage x={0} y={0} options={{ backgroundColor: 0x808080 }} height={dimensions.height} width={dimensions.width}>
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
        </Stage>
    );
}

export default PixiComponent2;
