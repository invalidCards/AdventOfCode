const array = (await Deno.readTextFile('./input.txt')).split('\n');
let prev = -Infinity;
let increases = 0;
array.forEach(element => {
    const curr = parseInt(element);
    if (prev !== -Infinity) {
        if (curr > prev) increases++;
    }
    prev = curr;
});
console.log(`There were ${increases} increases.`)