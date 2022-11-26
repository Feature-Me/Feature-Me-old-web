function heapSort(array: Array<number>) {
    let pivot = array.length / 2 - 1 | 0;
    
    for (; pivot >= 0; pivot--) {
        heapify(array, pivot, array.length);
    }

    for (pivot = array.length - 1; pivot > 0; pivot--) {
        swap(array, 0, pivot);
        heapify(array, 0, pivot);
    }
    return array;
}

function heapify(array: Array<number>, index: number, size: number) {
    var l = 2 * index + 1, r = 2 * index + 2, largest = 0;
    if (l < size && array[l] > array[index]) {
        largest = l;
    } else {
        largest = index;
    }
    if (r < size && array[r] > array[largest]) {
        largest = r;
    }
    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, size);
    }
};

export default heapSort;