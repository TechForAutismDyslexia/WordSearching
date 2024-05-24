import { Graphics, Stage, Text } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useCallback, useEffect, useState } from 'react';
import { TextStyle } from 'pixi.js';


function PixiComponent(){

    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [puzzle, setPuzzle] = useState([])
    const [word, setWord] = useState(null)
    const [initpos, setInitPos] = useState({x: null, y: null});
    const [drawing, setDrawing] = useState(false)

    const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    useEffect(() => {

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(()=>{
        // let textt = []
        const textArr = ["a", "e", "e", "d", "n", "s", "e", "p", "t","a", "n", "a", "a", "e", "i", "i", "a", "s","o", "d", "t", "y", "t", "t", "b","t","r"]
        let hei;
        let k = 0;
        let newPuzzle = []
        for(let ind=0;ind<27;ind++){
            // textt[ind] = textArr[ind];
            if(ind<=8){
                hei = 150;
            }
            else if(ind<=17){
                hei = 50;
                if(ind == 9){
                    k = 0;
                }
            }
            else{
                hei = -50;
                if(ind == 18){
                    k = 0;
                }
            }
            let xPos = dimensions.width/2 - 400 + 100*(k);
        let yPos = dimensions.height/2 - hei;
        k++;

        newPuzzle.push({
            text: textArr[ind],
            xPos,
            yPos,
            color: 'black',
            index: ind,
        })
        
    }
    setPuzzle(newPuzzle)
    console.log(newPuzzle[2].color)
    // console.log('Hello: '+puzzle[1].text)
},[dimensions])


    useEffect(()=>{
        window.addEventListener('pointermove', (e) => {
            const updatedPuzzle = puzzle.map((word)=>{
            const pointerPosition_x = e.clientX;
            const pointerPosition_y = e.clientY;
            const letterPosition = {x: word.xPos, y: word.yPos};
            const distance = Math.sqrt(
                Math.pow(pointerPosition_x - letterPosition.x, 2) +
                Math.pow(pointerPosition_y - letterPosition.y, 2)
            );
            return {
                ...word,
                color: distance <= 50 ? 'green' : 'black',
            };
        })

        const nearestWord = updatedPuzzle.find((word) => word.color === 'green')
        setPuzzle(updatedPuzzle)
        if(initpos.x === null && initpos.y === null){
            if(nearestWord){
                initpos.x = nearestWord.xPos
                initpos.y = nearestWord.yPos
            }
        }
        else{
        setWord(nearestWord || null)
        }
        });
    },[puzzle])

    const draw = useCallback((g) =>{
        if(word && drawing){
            g.beginFill('yellow');
            g.lineStyle(4, 0xffd900, 1);
            g.moveTo(initpos.x, initpos.y);
            g.lineTo(word.xPos, word.yPos)
            initpos.x = word.xPos
            initpos.y = word.yPos
        }

    },[word])

    window.addEventListener('pointerdown', ()=>{
        setDrawing(true)
    })
    window.addEventListener('pointerup', ()=>{
        setDrawing(false)
        // setDrawing(true)
    })

    return(
        <Stage x={0} y={0} options={{backgroundColor: 0x808080 }} height={dimensions.height} width={dimensions.width}>
                {puzzle.map((word)=>(
                    <Text
                    key = {word.index}
                    text={word.text}
                        x={word.xPos}
                        y={word.yPos}
                        style={new TextStyle({
                            fill: word.color
                          })}
                        />

                ))}

                <Graphics draw={draw}/>
        </Stage>
    )
}

export default PixiComponent