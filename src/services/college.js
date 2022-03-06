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
    // getHoursStatistics(lengthInterval) {
    //     let interval = lengthInterval.interval
    //     let array = this.#courses.get()
    //     let objStat = _.countBy(array, e => {
    //         return Math.floor(e.interva / interval) * interval
    //     })
    //     return this.#countByStatistic(objStat, interval)
    // }
    // getCostStatistics(lengthInterval) {
    //     let interval = lengthInterval.interval
    //     let array = this.#courses.get()
    //     let objStat = _.countBy(array, e => {
    //         return Math.floor(e.intervalCost / interval) * interval
    //     })
    //     return this.#countByStatistic(objStat, interval)
    // }
    // #countByStatistic(objStat, lengthInterval) {
    //     let result = []
    //     for(let key in objStat) {
    //         let minInterval = key
    //         let maxInterval = +key + +lengthInterval - 1
    //         let amount = objStat[key]
    //         result.push({ minInterval: minInterval, maxInterval: maxInterval, amount: amount })
    //     }
    //     return result
    // } 

    getStatistics(lengthInterval, key) {
        const courses = this.getAllCourses();
        const statistics = _.countBy(courses, (course) => Math.floor(course[key] / lengthInterval));
        return Object.entries(statistics).map( e => (
            {
            minInterval : e[0] * lengthInterval, 
            maxInterval : (e[0] * lengthInterval) + (lengthInterval - 1),
            amount : e[1] 
            }));
    }
}

