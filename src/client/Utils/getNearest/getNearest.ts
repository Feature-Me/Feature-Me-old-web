import heapSort from "Utils/Sort/heapSort";
import insertionSort from "Utils/Sort/insertionSort";

function getNearest(value: number, numbers: Array<number>): number {

    if (numbers.find(n => n == value)) return value;

    let nearest = 0;
    numbers.forEach(n => {
        if (Math.abs(value - nearest) > Math.abs(value - n)) nearest = n
    });

    return nearest
}

export default getNearest