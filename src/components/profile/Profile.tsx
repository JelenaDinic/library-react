import './Profile.css'

function Profile() {
  return (
    <form className="profile">
      <div  className='profile-section'>
        <label className="profile-label" >Firstname</label>
        <input className = "login-input" type="text" name="firstname" disabled/>
      </div>
      <div  className='profile-section'>
        <label className="profile-label" >Lastname</label>
        <input className = "login-input" type="text" name="lastname" disabled/>
      </div>
      <div className='profile-section'>
        <label className="profile-label" >Email</label>
        <input className = "login-input" type="text" name="uname" disabled/>
      </div>
      <div  className='profile-section'>
        <label className="profile-label" >Password</label>
        <input className = "login-input" type="password" name="psw" disabled/>
      </div>


    </form>
  )
}

export default Profile
