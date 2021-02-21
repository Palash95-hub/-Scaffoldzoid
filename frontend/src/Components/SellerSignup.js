import React, { useState } from "react";

function SellerSignup(props) {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="heading">
        <h1>Welcome to ScaffoldZoid</h1>
      </div>
      <div className="loginasbuyer">Signup as Seller</div>
      <div className="signup">
        <div className="field">UserName</div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="field">Email</div>
        <div className="input">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">Password</div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />
        <div className="input">
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {props.error ? <div className="error">{props.error}</div> : null}
        <div className="btn">
          <button
            type="submit"
            value="Signup"
            onClick={() =>
              props.signupHandler(userName, email, password, confirmPassword)
            }
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerSignup;
