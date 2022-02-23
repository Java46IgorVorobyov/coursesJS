import { createCourse } from "../models/course";
import { getRandomNumber } from "./random";
import { getRandomDate } from "./random";
import { getRandomElement } from "./random";

export function getRandomCourse(courseData) {
    //TODO getting random arguments for the below function call
    const id = getRandomNumber(courseData['minId'], courseData['maxId'])
    const name = getRandomElement(courseData['courses'])
    const lectors = getRandomElement(courseData['lectors'])
    const hours = getRandomNumber(courseData['minHours'], courseData['maxHours'])
    const howMuch = getRandomNumber(courseData['minCost'], courseData['maxCost'])
    const dateStart = getRandomDate(courseData['minYear'], courseData['maxYear'])

    return createCourse(id, name, lectors, hours, howMuch, dateStart)
}