import { cloneDeep } from "lodash";

function quickSort(array:Array<number>):Array<number> {
    array = cloneDeep(array);
    function sort(start: number, end: number) {
        if (start >= end) {
            return;
        }
        let left = start;
        let right = end;
        const pivot = array[Math.round((left + right) / 2)];

        while (left < right) {
            if (array[left] >= pivot) {
                while (right > left) {
                    if (array[right] <= pivot) {
                        var tmp = array[left];
                        array[left] = array[right];
                        array[right] = tmp;
                        right--;
                        break;
                    }
                    right--;
                }
            }
            left++;
        }
        if (array[right] > pivot) {
            sort(start, right - 1);
            sort(right, end);
        } else if (array[right] < pivot) {
            sort(start, right);
            sort(right + 1, end);
        } else {
            sort(start, right - 1);
            sort(right + 1, end);
        }
    }

    sort(0, array.length - 1);

    return array;
}

