import React from 'react'

function Login({toggle,showLogin}) {
    
  return (
    <div id="myModal" onClick={toggle} className={showLogin ? "modal-open":"modal-closed"}>
    <div className="modal-content">
      <span onClick={toggle} className="close">&times;</span>
      <p>Login</p>
    </div>
    
    </div>
  )
}

export default Login