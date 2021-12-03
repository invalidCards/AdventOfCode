const partOne = (sequence: string[]) => {
    const tally: number[][] = new Array(sequence[0].length);
    for (let i = 0; i < tally.length; i++) {
        tally[i] = new Array(2).fill(0);
    }

    for (const bstr of sequence) {
        bstr.split('').forEach((char, i) => {
            const nchar = parseInt(char);
            if (!isNaN(nchar)) {
                tally[i][nchar]++;
            }
        });
    }

    let binaryGamma = '';
    for (const pos of tally) {
        if (pos[0] > pos[1]) binaryGamma += '0';
        else binaryGamma += '1';
    }
    const binaryEpsilon = binaryGamma.split('').map(i => i === '0' ? '1' : '0').join('');

    return `Gamma is ${parseInt(binaryGamma, 2)}, Epsilon is ${parseInt(binaryEpsilon, 2)}, and the total power consumption is ${parseInt(binaryGamma, 2) * parseInt(binaryEpsilon, 2)}`;
}

const partTwo = (sequence: string[]) => {
    const o2WorkingSet = structuredClone(sequence);
    const co2WorkingSet = structuredClone(sequence);

    const process = (seq: string[], least = false, pos = 0): string[] => {
        if (seq.length <= 1 || pos > seq[0].length) return seq;

        const tally: number[] = new Array(2).fill(0);

        for (const bstr of seq) {
            const nchar = parseInt(bstr[pos]);
            if (!isNaN(nchar)) {
                tally[nchar]++;
            }
        }

        let result = '';
        if (least) {
            if (tally[0] === tally[1]) result = '0';
            else result = tally[0] > tally[1] ? '1' : '0';
        } else {
            if (tally[0] === tally[1]) result = '1';
            else result = tally[0] > tally[1] ? '0' : '1';
        }
        seq = seq.filter(n => n[pos] === result);
        return process(seq, least, ++pos);
    }

    const o2result = process(o2WorkingSet, false);
    if (!o2result) {
        console.error('No result found for O2 generator rating!');
        return;
    }
    if (o2result.length > 1) {
        console.error('More than 1 possible result found for O2 generator rating!');
        return;
    }
    const co2result = process(co2WorkingSet, true);
    if (!co2result) {
        console.error('No result found for CO2 scrubber rating!');
        return;
    }
    if (co2result.length > 1) {
        console.error('More than 1 possible result found for CO2 scrubber rating!');
        return;
    }

    return `The O2 generator rating is ${parseInt(o2result[0], 2)}, the CO2 scrubber rating is ${parseInt(co2result[0], 2)}, and the life support rating is ${parseInt(o2result[0], 2) * parseInt(co2result[0], 2)}`;
}

const input = await Deno.readTextFile('./input.txt');

console.log(partOne(input.split('\n')));
console.log(partTwo(input.split('\n')));