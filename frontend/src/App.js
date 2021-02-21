import React, { useState, useEffect } from "react";
import Welcome from "./Components/Welcome";
import SellerLogin from "./Components/SellerLogin";
import BuyerLogin from "./Components/BuyerLogin";
import SellerSignup from "./Components/SellerSignup";
import BuyerSignup from "./Components/BuyerSignup";
import Seller from "./Components/Seller";
import Buyer from "./Components/Buyer";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [error, setError] = useState(undefined);
  const [sellerUserName, setSellerUserName] = useState(undefined);
  const [buyerUserName, setBuyerUserName] = useState(undefined);

  const sellerSignupHandler = (userName, email, password, confirmPassword) => {
    fetch("http://localhost:9999/sellersignup", {
      method: "POST",
      body: JSON.stringify({ userName, email, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          window.location = "http://localhost:3000/seller";
          return getSellerUserName();
        } else {
          setError(r.err);
        }
      });
  };

  const buyerSignupHandler = (userName, email, password, confirmPassword) => {
    fetch("http://localhost:9999/buyersignup", {
      method: "POST",
      body: JSON.stringify({ userName, email, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          window.location = "http://localhost:3000/buyer";
          return getBuyerUserName();
        } else {
          setError(r.err);
        }
      });
  };

  const getSellerUserName = () => {
    return fetch("http://localhost:9999/sellerinfo", {
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          setSellerUserName(undefined);
          return { success: false };
        }
      })
      .then((r) => {
        if (r.success !== false) {
          setSellerUserName(r.userName);
        }
      });
  };

  useEffect(() => {
    getSellerUserName();
  }, []);

  const getBuyerUserName = () => {
    return fetch("http://localhost:9999/buyerinfo", {
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          setBuyerUserName(undefined);
          return { success: false };
        }
      })
      .then((r) => {
        if (r.success !== false) {
          console.log(r.userName);
          setBuyerUserName(r.userName);
        }
      });
  };

  useEffect(() => {
    getBuyerUserName();
  }, []);

  const sellerLoginHandler = (email, password) => {
    fetch("http://localhost:9999/sellerlogin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          window.location = "http://localhost:3000/seller";
          return getSellerUserName();
        } else {
          setError(r.err);
        }
      });
  };

  const buyerLoginHandler = (email, password) => {
    fetch("http://localhost:9999/buyerlogin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          window.location = "http://localhost:3000/buyer";
          return getBuyerUserName();
        } else {
          setError(r.err);
        }
      });
  };

  const logoutHandler = () => {
    return fetch("http://localhost:9999/logout", {
      credentials: "include",
    }).then((r) => {
      if (r.ok) {
        setSellerUserName(undefined);

        setBuyerUserName(undefined);
        window.location = "http://localhost:3000";
      }
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/sellerlogin">
            <SellerLogin loginHandler={sellerLoginHandler} error={error} />
          </Route>
          <Route exact path="/buyerLogin">
            <BuyerLogin loginHandler={buyerLoginHandler} error={error} />
          </Route>
          <Route exact path="/sellersignup">
            <SellerSignup signupHandler={sellerSignupHandler} error={error} />
          </Route>
          <Route exact path="/buyersignup">
            <BuyerSignup signupHandler={buyerSignupHandler} error={error} />
          </Route>
          <Route exact path="/seller">
            <Seller userName={sellerUserName} logoutHandler={logoutHandler} />
          </Route>
          <Route exact path="/buyer">
            <Buyer userName={buyerUserName} logoutHandler={logoutHandler} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
