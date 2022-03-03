import _ from "lodash"

export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses
        this.#courseData = courseData
    } 
    addCourse(course) {
        course.hours = +course.hours
        course.cost = +course.cost
        course.openingDate = new Date(course.openingDate)
        const validationMessage = this.#getValidationMessage(course)
        if(!validationMessage) {
            return this.#courses.add(course)
        }
        return validationMessage
    }
    #getValidationMessage(course) {
        const { minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses } = this.#courseData
        const { cost, hours, openingDate, lecturer, name } = course

        let message = ''
        message += cost > maxCost || cost < minCost ?
        `wrong cost value - should be in range [${minCost}-${maxCost}] <br>`: ''
        message += hours > maxHours || hours < minHours ?
        `wrong hours value - should be in range [${minHours}-${maxHours}] <br>`: ''
        message += !lectors.includes(lecturer) ? `wrong course name - should be one from ${courses}` : ''
        message += !courses.includes(name) ? `wrong course name - should be one from ${courses}` : ''
        const year = openingDate.getFullYear()
        message += year < minYear || year > maxYear ?
        `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
        return message
    }
    getAllCourses() {
        return this.#courses.get()
    }
    sortCourses(key) {
        return _.sortBy(this.getAllCourses(), key)
    }
}

// 'Name was not added to the list'
// 'Lecturer was not added to the list'
// 'Hours should be between 80 and 500'
// 'Cost should be between 5000 and 30000'
// 'Year should be between 2000 and 2022'