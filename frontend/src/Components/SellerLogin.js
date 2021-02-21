import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./sellerlogin.css";

function SellerLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="heading">
        <h1>Welcome to ScaffoldZoid</h1>
      </div>
      <div className="loginasbuyer">Login as Seller</div>
      <div className="login">
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
        {props.error ? <div className="error">{props.error}</div> : null}
        <div className="btn">
          <button
            type="submit"
            value="Login"
            onClick={() => props.loginHandler(email, password)}
          >
            Login
          </button>
        </div>

        <Link to="/sellersignup">
          <div className="field">Signup</div>
        </Link>
      </div>
    </>
  );
}

export default SellerLogin;
