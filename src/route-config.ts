import BookForm from './components/bookForm/BookForm'
import HomePage from './components/homePage/HomePage'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'

const routes = [
  { path: '/', component: HomePage },
  { path: '/Login', component: Login },
  { path: '/Profile', component: Profile },
  { path: '/CreateBook', component: BookForm },
  { path: '*', component: HomePage }
]

export default routes
