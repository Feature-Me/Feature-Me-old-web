function swap(array:Array<number> ,baseIndex:number, replaceIndex?:number) {
    replaceIndex??=baseIndex+1;
    const tempValue:number = array[baseIndex];
    array[baseIndex] = array[replaceIndex];
    array[replaceIndex] = tempValue;
    return array;
}