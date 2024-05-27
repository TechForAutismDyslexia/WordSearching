import { Graphics, Stage, Text } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextStyle } from 'pixi.js';

function PixiComponent() {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const nearestWord = useRef(null);
    const [movePos, SetMovePos] = useState({x: null, y: null});
    const [startPos, setStartPos] = useState({ x: null, y: null });
    const [lines, setLines] = useState([])
    
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
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if(distance< 50 && drawing){
                    console.log(word.text)
                }
                return {
                    ...word,
                    color: distance <= 50 ? 'green' : 'black',
                };
            });

            nearestWord.current = updatedPuzzle.find((word) => word.color === 'green');
            setPuzzle(updatedPuzzle);
            SetMovePos({x: e.clientX, y: e.clientY})
        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [puzzle, drawing]);

    useEffect(() => {
        const handlePointerDown = (e) => {
            setDrawing(true)
            if(lines.length === 0){
                setStartPos({ x: e.clientX, y: e.clientY });
            }
            else{
                setStartPos(lines[lines.length-1].end);
            }
        };

        const handlePointerUp = () => {
            setDrawing(false);
            setLines((line)=>[
                ...line,{start: startPos, end: movePos}
            ])
            setStartPos(movePos)
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [startPos, movePos, lines]);

    const draw = useCallback((g) => {
        g.clear()
        g.lineStyle(3, 0xffd900);
        lines.forEach((line) =>{
        g.moveTo(line.start.x, line.start.y)
        g.lineTo(line.end.x, line.end.y)
        })          //For previous lines (if any)
        if (drawing && movePos.x !== null && movePos.y !== null) {

            g.moveTo(startPos.x, startPos.y);
            g.lineTo(movePos.x, movePos.y);
        }
    }, [drawing, startPos, movePos, lines]);

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
            <Graphics draw={draw} />
        </Stage>
    );
}

export default PixiComponent;
