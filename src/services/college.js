export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses
        this.#courseData = courseData
    } 
    addCourse(course) {
        let validationMessage
        course.openingDate = new Date(course.openingDate)
        course.cost = +course.cost
        course.hours = +course.hours
        validationMessage = this.#checkValidation(course, validationMessage)
        if(!validationMessage) {
            return this.#courses.add(course)
        }
        return validationMessage
    }
    #checkValidation(course, validationMessage) {
        if(course.cost < 5000 || course.cost > 30000) {
            return validationMessage = this.#getValidationMessage( 1)
        }
        if(course.hours < 80 || course.hours > 500) {
            return validationMessage = this.#getValidationMessage( 2)
        }
        if(course.openingDate.getYear() < 100 || course.openingDate.getYear() > 122) {
            return validationMessage = this.#getValidationMessage( 3)
        } 
        else {
            validationMessage = this.#getValidationMessage()
        }
        return validationMessage
    }
    #getValidationMessage(numberOfError) {
        let wrong = ''
        switch(wrong) {
            case 1 : wrong = wrong + 'Cost should be between 5000 and 30000'; return wrong
            case 2 : wrong = wrong + 'Hours should be between 80 and 500'; return wrong
            case 3 : wrong = wrong + 'Year should be between 2000 and 2022'; return wrong
            default: return wrong
        }
    }
}

// 'Name was not added to the list'
// 'Lecturer was not added to the list'
// 'Hours should be between 80 and 500'
// 'Cost should be between 5000 and 30000'
// 'Year should be between 2000 and 2022'