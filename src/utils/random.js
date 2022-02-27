export function getRandomNumber(min, max) {
    min > max ? [min, max] = [max, min] : [min,max] 
    return Math.floor(Math.random() * (max - min + 1)) + min

}

export function getRandomElement(array) {

    return array[getRandomNumber(0, array.length-1)]

}

export function getRandomDate(minYear, maxYear) {
    
    const day = getRandomNumber(1, 31)
    const month = getRandomNumber(0, 11)
    const year = getRandomNumber(minYear, maxYear)
    const date = new Date(year, month, day)
    return date.toString()
}



