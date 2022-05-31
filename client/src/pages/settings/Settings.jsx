import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"

export default function Settings() {
  return (
    <div className='settings'>
      <div className="settingsWrapper">
          <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
              <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form className="settingsForm">
              <label>Profile Picture</label>
              <div className="settingsPP">
                  <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                  <label htmlFor="fileInput">
                      <i className="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input type="file" id="fileInput" style={{display:"none"}} />
              </div>
              <label>Username</label>
              <input type="text" placeholder="Akshay"/>
              <label>Email</label>
              <input type="email" placeholder="akshay@gmail.com"/>
              <label>Password</label>
              <input type="password"/>
              <button className="settingsSubmit">Update</button>
          </form>
      </div>
      <Sidebar/>
    </div>
  )
}
