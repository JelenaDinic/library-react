import './Login.css'

function Login() {
  return (
    <form action="" method="">
      <div className="container">
        <label>Username</label>
        <input type="text" placeholder="Enter Username" name="uname" required/>
        <br/>
        <label>Password</label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
        <br/>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default Login
