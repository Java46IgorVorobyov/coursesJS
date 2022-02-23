export function getRandomNumber(min, max) {
    min > max ? [min, max] = [max, min] : [min,max] 
    return Math.floor(Math.random() * (max - min + 1)) + min

}

export function getRandomElement(arr) {

    return arr[getRandomNumber(0, arr.length-1)]

}

export function getRandomDate(minYear, maxYear) {
    
    const day = getRandomNumber(1, 28)
    const month = getRandomNumber(1, 12)
    const year = getRandomNumber(minYear, maxYear)
    
    return new Date (year, month, day).toLocaleDateString()
}



