import Signup from './components/Signup.svelte'
import Dashboard from './components/dashboard/Dashboard.svelte'
import NotFound from './components/NotFound.svelte'
import AddStudentToCourse from './components/courses/AddStudentToCourse.svelte'
import Profile from './components/Profile.svelte'
import Course from './components/courses/Course.svelte'
import Session from './components/sessions/Session.svelte'
import ChangePassword from './components/ChangePassword.svelte'

export default {
  '/': Dashboard,
  '/signup': Signup,
  '/join-course': AddStudentToCourse,
  '/me': Profile,
  '/course/:id': Course,
  '/session/:id': Session,
  '/change-password': ChangePassword,
  '*': NotFound
}
