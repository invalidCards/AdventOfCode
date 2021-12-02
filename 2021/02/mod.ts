const partOne = (input: string[]) => {
    let depth = 0, pos = 0;
    for (const cmd of input) {
        const [dir, qty] = [...cmd.split(' ')];
        if (!dir || !qty) continue;
        const numqty = parseInt(qty);

        switch (dir) {
            case 'forward': pos += numqty; break;
            case 'down': depth += numqty; break;
            case 'up': depth -= numqty; break;
        }
    }
    return depth * pos;
}

const partTwo = (input: string[]) => {
    let depth = 0, pos = 0, aim = 0;
    for (const cmd of input) {
        const [dir, qty] = [...cmd.split(' ')];
        if (!dir || !qty) continue;
        const numqty = parseInt(qty);

        switch (dir) {
            case 'forward': {
                pos += numqty;
                depth += (aim * numqty);
                break;
            }
            case 'down': aim += numqty; break;
            case 'up': aim -= numqty; break;
        }
    }
    return depth * pos;
}

const input = await Deno.readTextFile('./input.txt');

console.log(`Part 1: Position times depth is ${partOne(input.split('\n'))}`);
console.log(`Part 2: Position times depth is ${partTwo(input.split('\n'))}`);