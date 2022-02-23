import courseData from './config/courseData.json' 
import { getRandomCourse } from './utils/randomeCourse'

const N_COURSES = 100

function createCourses() {
    const courses = []
    for (let i = 0; i < N_COURSES; i++) {
        
        courses.push(getRandomCourse(courseData))

    }
    return courses
}

function goToHtml() {
    const result = document.getElementById('courses')
    const result2 = createCourses()
    result.innerHTML = result2.map(p=> `<p>${JSON.stringify(p)}</p>`).join('')
}
goToHtml()
