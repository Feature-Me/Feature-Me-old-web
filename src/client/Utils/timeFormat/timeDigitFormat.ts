function timeDegitFormat(num: number | string) {
    if (typeof num == "number") num = num.toString();
    else {
        const number = Number(num);
        if (Number.isNaN(number)) throw new TypeError("Argument must be number of string that can convert to number, but got illegai value.");
    }
    return num.padStart(2, "0");
}

export default timeDegitFormat;