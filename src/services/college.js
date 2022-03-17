import _ from "lodash";

// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    async addCourse(course) {
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openingDate = course.openingDate //getFullYear()}-${course.openingDate.getMonth().toString().padStart(2, '0')}-${course.openingDate.getDate().toString().padStart(2, '0')}`
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
            console.log(course);
           return await this.#courses.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses} = this.#courseData;
        const {cost, hours, openingDate, lecturer, name} = course
        
        let message = '';
        message += cost > maxCost || cost < minCost ?
         `wrong cost value - should be in range [${minCost}-${maxCost}] <br>`: '';
         message += hours > maxHours || hours < minHours ?
         `wrong hours value - should be in range [${minHours}-${maxHours}] <br>`: '';
         message += !lectors.includes(lecturer) ? `wrong lecturer name - should be one from ${lectors} <br>`: '';
         message += !courses.includes(name) ? `wrong course name - should be one from ${courses}`:'';
         const year = openingDate.getFullYear();
         message += year < minYear || year > maxYear ?
          `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
         return message;
    }
    async getAllCourses() {
        return await this.#courses.get()
    }
    async sortCourses(key) {
        return _.sortBy(await this.getAllCourses(), key)
    }
    async #getStatistics(interval, field) {
        const courses = await this.getAllCourses();
        const objStat =  _.countBy(courses, e => {   
            return Math.floor(e[field]/interval);
         });
         return Object.keys(objStat).map(s => {
             return {minInterval: s * interval,
                 maxInterval: s * interval + interval -1,
                amount: objStat[s]}
         })
    }
      getHoursStatistics(lengthInterval){
        return this.#getStatistics(lengthInterval, 'hours');
    }
    getCostStatistics(lengthInterval) {
        return this.#getStatistics(lengthInterval, 'cost')
    }
    async removeCourse(id) {
        if (!await this.#courses.exists(id)) {
            throw `course with id ${id} not found`
        }
        return await this.#courses.remove(id);
    }

   
}