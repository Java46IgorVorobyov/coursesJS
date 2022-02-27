import courseData from './config/courseData.json'
import College from './services/college'
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import { getRandomCourse } from './utils/randomeCourse';

const N_COURSES = 5;

function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
function getCourseItems(courses) {
    return courses.map(c => `<p>${JSON.stringify(c)}</p>`).join('');
}

const element = document.getElementById('courses')
const courses = createCourses()
element.innerHTML = `${getCourseItems(courses)}`
const getTheDate = new Courses(courseData.minId, courseData.maxId, courses)
const formTheDate = new College(getTheDate, courseData)
const formHandler = new FormHandler("courses-form", "alert")
formHandler.addHandler(course => {
    const message = formTheDate.addCourse(course)
    if(typeof message != 'string') {
        element.innerHTML += `<p>${JSON.stringify(course)}</p>`
    }else return message
})
    
