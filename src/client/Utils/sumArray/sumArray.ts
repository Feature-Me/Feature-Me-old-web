function sumArray(array: Array<number>): number {
    return array.reduce((a, b) => a + b, 0);
}

export default sumArray;