import { Graphics, Stage, Text } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextStyle } from 'pixi.js';

function PixiComponent() {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    const [word, setWord] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const initPos = useRef({ x: null, y: null });
    const nearestWord = useRef(null);

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
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX;
                const pointerPosition_y = e.clientY;
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                return {
                    ...word,
                    color: distance <= 50 ? 'green' : 'black',
                };
            });

            nearestWord.current = updatedPuzzle.find((word) => word.color === 'green');
            setPuzzle(updatedPuzzle);
        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [puzzle]);

    useEffect(() => {
        const handlePointerDown = () => {
            if (initPos.current.x === null && initPos.current.y === null) {
                if (nearestWord.current) {
                    initPos.current.x = nearestWord.current.xPos;
                    initPos.current.y = nearestWord.current.yPos;
                }
            } else {
                setWord(nearestWord.current || null);
                setDrawing(true);
            }
        };

        const handlePointerUp = () => {
            setDrawing(false);
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    const draw = useCallback((g) => {
        if (word && drawing) {
            g.lineStyle(4, 0xffd900, 1);
            g.moveTo(initPos.current.x, initPos.current.y);
            g.lineTo(nearestWord.current.xPos, nearestWord.current.yPos);
            initPos.current.x = nearestWord.current.xPos;
            initPos.current.y = nearestWord.current.yPos;
        }
    }, [word, drawing]);

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
