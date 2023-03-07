import './Login.css'

function Login() {
  return (
    <form className="form" action="" method="">
      <label>Username</label>
      <input className = "login-input" type="text" placeholder="Enter Username" name="uname" required/>
      <br/>
      <label>Password</label>
      <input className = "login-input" type="password" placeholder="Enter Password" name="psw" required/>
      <br/>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
