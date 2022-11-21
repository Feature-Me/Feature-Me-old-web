import heapSort from "Utils/Sort/heapSort";
import insertionSort from "Utils/Sort/insertionSort";

function getNearest(value: number, numbers: Array<number>): number {

    return numbers.length < 8192 ?
        getNearestWithoutSort(value, numbers) :
        getNearestWithSort(value, numbers)
}

function getNearestWithoutSort(value: number, numbers: Array<number>): number {
    if (numbers.find(n => n == value)) return value;

    let nearest = 0;
    numbers.forEach(n => {
        if (Math.abs(value - nearest) > Math.abs(value - n)) nearest = n
    });

    return nearest

}

function getNearestWithSort(value: number, numbers: Array<number>): number {
    if (numbers.find(n => n == value)) return value;
    numbers = insertionSort(numbers);
    let numberSet = new Set(numbers);
    let nearest = 0;
    let diff = Infinity;
    numberSet.forEach(n => {
        const currentDiff = Math.abs(value - n);
        if (currentDiff > diff) return;
        diff = currentDiff;
        if (Math.abs(value - nearest) > currentDiff) nearest = n
    });
    return nearest;
}

export default getNearest