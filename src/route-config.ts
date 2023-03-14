import CreateBook from './components/createBook/CreateBook'
import HomePage from './components/homePage/HomePage'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'

const routes = [
  { path: '/', component: HomePage },
  { path: '/Login', component: Login },
  { path: '/Profile', component: Profile },
  { path: '/CreateBook', component: CreateBook },
  { path: '*', component: HomePage }
]

export default routes
