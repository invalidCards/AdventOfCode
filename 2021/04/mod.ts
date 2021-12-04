interface WinningBoard {
    board: string[][],
    markedPositions: string[],
    winningCall: number
}

const getWinningBoard = (seq: string[][][], pullSequence: string): WinningBoard | undefined => {
    const splitPull = pullSequence.split(',');
    const progressMap = new Map<number, string[]>();
    for (const pull of splitPull) {
        seq.forEach((board, k) => {
            board.forEach((line, l) => {
                line.forEach((value, m) => {
                    if (value === pull) {
                        let current = progressMap.get(k);
                        if (!current) current = [];
                        current.push(`${l},${m}`);
                        progressMap.set(k, current);
                    }
                });
            });
        });

        for (const index of progressMap.keys()) {
            const progress = progressMap.get(index);
            if (!progress) continue;

            for (let n = 0; n < 5; n++) {
                if (progress.filter(p => p.startsWith(`${n},`)).length === 5 || progress.filter(q => q.endsWith(`,${n}`)).length === 5) {
                    return {
                        board: seq[index],
                        markedPositions: progress,
                        winningCall: parseInt(pull)
                    }
                }
            }
        }
    }
}

const partOne = (input: string[]) => {
    const seq = transformInputToSeq(input);

    const winningBoard = getWinningBoard(seq[1] as string[][][], seq[0] as string);
    if (!winningBoard) return 'There is no winning board in part 1!';
    
    for (const pos of winningBoard.markedPositions) {
        const [row, col] = [...pos.split(',')];
        const nrow = parseInt(row), ncol = parseInt(col);
        winningBoard.board[nrow][ncol] = '';
    }

    let unmarkedTotal = 0;
    for (const line of winningBoard.board) {
        for (const item of line) {
            if (item !== '') unmarkedTotal += parseInt(item);
        }
    }

    return `The sum of unmarked items is ${unmarkedTotal}, the last call was ${winningBoard.winningCall}, and the answer is ${unmarkedTotal * winningBoard.winningCall}`
}

const partTwo = (input: string[]) => {
    const seq = transformInputToSeq(input);
    const boardsLeft = structuredClone(seq[1]) as string[][][];
    let lastWinningBoard: WinningBoard = {
        board: [['']],
        markedPositions: [''],
        winningCall: -1
    };

    while (boardsLeft.length > 0) {
        const winningBoard = getWinningBoard(boardsLeft, seq[0] as string);
        if (!winningBoard) break;
        lastWinningBoard = winningBoard;

        boardsLeft.splice(boardsLeft.indexOf(winningBoard.board), 1);
    }

    if (lastWinningBoard.winningCall === -1) {
        return 'There was no winning board found after the while loop of part 2!';
    }

    for (const pos of lastWinningBoard.markedPositions) {
        const [row, col] = [...pos.split(',')];
        const nrow = parseInt(row), ncol = parseInt(col);
        lastWinningBoard.board[nrow][ncol] = '';
    }

    let unmarkedTotal = 0;
    for (const line of lastWinningBoard.board) {
        for (const item of line) {
            if (item !== '') unmarkedTotal += parseInt(item);
        }
    }

    return `The sum of unmarked items for part 2 is ${unmarkedTotal}, the last call was ${lastWinningBoard.winningCall}, and the answer is ${unmarkedTotal * lastWinningBoard.winningCall}`

}

const transformInputToSeq = (seq: string[]) => {
    const [pullSequence, ...boards] = [...seq];
    const realBoards: string[][][] = [];

    for (let i = 0; i < boards.length; i++) {
        if (boards[i] !== '') continue;
        const arrayToPush = [];
        for (let j = 1; j < 6; j++) {
            if (!boards[i+j]) continue;
            arrayToPush.push([...boards[i+j].split(' ').filter(item => item !== '')]);
        }
        realBoards.push(arrayToPush);
    }

    return [pullSequence, realBoards];
}

const input = (await Deno.readTextFile('./input.txt')).split('\n');
console.log(partOne(input));
console.log(partTwo(input));