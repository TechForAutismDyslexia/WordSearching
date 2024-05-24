// import './App.css';
// import '@pixi/events';
// import { useState, useEffect, useRef } from 'react';
// import { Stage, Container, Text } from '@pixi/react';
// import { TextStyle } from 'pixi.js';

// function PixiComponent() {
//     const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
//     const [texts, setTexts] = useState([]);
//     const stageRef = useRef(null);
//     const heighlightMinLength = 50;

//     useEffect(() => {
//         const handleResize = () => {
//             setDimensions({ width: window.innerWidth, height: window.innerHeight });
//         };

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         const textArr = ["a", "e", "e", "d", "n", "s", "e", "p", "t", "a", "n", "a", "a", "e", "i", "i", "a", "s", "o", "d", "t", "y", "t", "t", "b", "t", "r"];
//         // const heighlightMinLength = 50;
//         let k = 0;

//         const newTexts = textArr.map((char, ind) => {
//             let y;
//             if (ind <= 8) {
//                 y = 150;
//             } else if (ind <= 17) {
//                 y = 50;
//                 if (ind === 9) k = 0;
//             } else {
//                 y = -50;
//                 if (ind === 18) k = 0;
//             }

//             const x = (dimensions.width / 2) - 400 + (100 * k);
//             k++;

//             return {
//                 text: char,
//                 x,
//                 y: (dimensions.height / 2) - y,
//                 style: new TextStyle({ fill: 'black' }),
//             };
//         });

//         setTexts(newTexts);
//     }, [dimensions]);

//     const handlePointerMove = (e) => {
//         const pointerPosition_x = e.clientX;
//         const pointerPosition_y = e.clientY;

//         setTexts((prevTexts) => prevTexts.map((textObj) => {
//             const distance = Math.sqrt(
//                 Math.pow(pointerPosition_x - (stageRef.current.x + textObj.x), 2) +
//                 Math.pow(pointerPosition_y - (stageRef.current.y + textObj.y), 2)
//             );

//             return {
//                 ...textObj,
//                 style: new TextStyle({ fill: distance <= heighlightMinLength ? 'green' : 'black' }),
//             };
//         }));
//     };

//     return (
//         <Stage
//             ref={stageRef}
//             options={{ backgroundColor: 0xAF8F6F }}
//             width={dimensions.width}
//             height={dimensions.height}
//             onPointerMove={handlePointerMove}
//         >
//             <Container>
//                 {texts.map((textObj, index) => (
//                     <Text
//                         key={index}
//                         text={textObj.text}
//                         anchor={{ x: 0.5, y: 0.5 }} 
//                         x={textObj.x}
//                         y={textObj.y}
//                         style={textObj.style}
//                     />
//                 ))}
//             </Container>
//         </Stage>
//     );
// }

// export default PixiComponent;
