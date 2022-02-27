// fake Data provisioning module
// data are the regular JS array

import { getRandomNumber } from "../utils/random"

export default class Courses {
    #courses
    #minId
    #maxId
    constructor(minId, maxId, courses) {
        this.#courses = courses ?? []
        this.#minId = minId ?? 1
        this.#maxId = maxId ?? 10000000
    }
    add(course) {
        course.id = this.#getId()
        this.#courses.push(course)
        return course
    }
    #getId() {
        let id
        do{
            id = getRandomNumber(this.#minId, this.#maxId)
        }while (this.exists(id))
        return id
    }
    //TODO 
     exists(id) {
        return !!(this.#courses.find(courses => {
            courses.id === id
        }))
    }

}