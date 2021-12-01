const numArray = (await Deno.readTextFile('./input.txt')).split('\n').map(l => parseInt(l));
const windows = [0,0,0];
let prevTotal = -Infinity;
let sumIncreases = 0;
for (let i = 0; i < numArray.length; i++) {
    const item = numArray[i];
    windows[i%3] = item; //start
    if (i > 0) {
        windows[(i%3)-1 < 0 ? (i%3)+2 : (i%3)-1] += item; //add to
    }
    if (i > 1) {
        let finishWindow = windows[(i%3)-2 < 0 ? (i%3)+1 : (i%3)-2];
        finishWindow += item; //finish
        if (prevTotal !== -Infinity && finishWindow > prevTotal) sumIncreases++;
        prevTotal = finishWindow;
    }
}
console.log(`There were ${sumIncreases} increases in sliding window sums.`);

/*

i = 0 => start i%3
i = 1 => add to i%3-1, start i%3
i = 2 => finish i%3-2, add to i%3-1, start i%3
i = 3 => start i%3, finish i%3+1, add to i%3+2
i = 4 => add to i%3-1, start i%3, finish i%3+1
i = 5 => finish i%3-2, add to i%3-1, start i%3
i = 6 => start i%3, finish i%3+1, add to i%3+2

*/