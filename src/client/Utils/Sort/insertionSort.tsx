function insertionSort(array: Array<number>): Array<number> {
    const length = array.length;
    for (var i = 1; i < length; i++) {
        for (var j = i; j > 0 && array[j - 1] > array[j]; j--) {
            var tmp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = tmp;
        }
    }
    return array;
}

export default insertionSort;