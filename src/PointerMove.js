const handlePointerMove = (
    mobile, drawing, puzzle, setSelectedWord, setIndices, indices, setLines, setPuzzle
) => {
    return (e) => {
        if (!Array.isArray(puzzle)) return;

        let pointerPosition_x, pointerPosition_y;
        if (drawing) {
            const updatedPuzzle = puzzle.map((word) => {
                if (window.innerHeight > 630 && window.innerWidth > 830) {
                    pointerPosition_x = e.clientX + window.scrollX;
                    pointerPosition_y = e.clientY + window.scrollY;
                } else {
                    pointerPosition_x = e.clientX;
                    pointerPosition_y = e.clientY;
                }
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if (distance < 40 && word.selected === false) {
                    setSelectedWord((prev) => prev + word.text);
                    setIndices([...indices, word.index]);
                    word.selected = true;
                    if (indices.length >= 2) {
                        setLines((line) => [
                            ...line, {
                                start_x: puzzle[indices[indices.length - 2]].xPos,
                                start_y: puzzle[indices[indices.length - 2]].yPos,
                                end_x: puzzle[indices[indices.length - 1]].xPos,
                                end_y: puzzle[indices[indices.length - 1]].yPos,
                                clear: "none"
                            }
                        ]);
                    }
                }
                return {
                    ...word,
                    color: distance <= 40 ? 'green' : word.color,
                };
            });

            setPuzzle(updatedPuzzle);
        } else {
            const updatedPuzzle = puzzle.map((word) => {
                pointerPosition_x = e.clientX;
                pointerPosition_y = e.clientY;
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                return {
                    ...word,
                    color: distance === 0 ? 'green' : word.initColor,
                };
            });

            setPuzzle(updatedPuzzle);
        }
    };
};

export default handlePointerMove;
