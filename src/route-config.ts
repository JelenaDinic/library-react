import BookList from './components/bookList/BookList'
import Login from './components/login/Login'

const routes = [
  { path: '/', component: BookList, exact: true },
  { path: '/Login', component: Login },
  { path: '*', component: BookList }
]

export default routes
