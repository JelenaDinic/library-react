import BookList from './components/bookList/BookList'
import CreateBook from './components/createBook/CreateBook'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'

const routes = [
  { path: '/', component: BookList },
  { path: '/Login', component: Login },
  { path: '/Profile', component: Profile },
  { path: '/CreateBook', component: CreateBook },
  { path: '*', component: BookList }
]

export default routes
