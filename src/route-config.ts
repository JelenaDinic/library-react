import BookDetail from './components/bookDetail/BookDetail'
import BookForm from './components/bookForm/BookForm'
import HomePage from './components/homePage/HomePage'
import Login from './components/login/Login'

const routes = [
  { path: '/', component: HomePage },
  { path: '/Login', component: Login },
  { path: '/CreateBook', component: BookForm },
  { path: '/BookDetail/:bookId', component: BookDetail },
  { path: '*', component: HomePage }
]

export default routes
