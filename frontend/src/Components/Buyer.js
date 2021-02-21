import { useState, useEffect } from "react";

function Buyer(props) {
  const [sellers, setSellers] = useState([]);
  const [showSellerProfile, setShowSellerProfile] = useState(false);
  const [oranges, setOranges] = useState([]);
  const [sellerClicked, setSellerClicked] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:9999/sellers")
      .then((r) => r.json())
      .then((arr) => {
        console.log(arr);
        setSellers(arr);
      });
  }, []);

  const getSellerProfile = (e) => {
    setShowSellerProfile(true);
    const str = e.target.innerText;
    setSellerClicked(str);
    const mailId = str.substring(
      str.lastIndexOf("(") + 1,
      str.lastIndexOf(")")
    );

    fetch("http://localhost:9999/sellerinfooforangesfrombuyer", {
      method: "POST",
      body: JSON.stringify({ email: mailId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((resp) => {
        setOranges(resp);
      });
  };
  return (
    <>
      <div className="heading">
        <h1>Welcome to ScaffoldZoid</h1>
      </div>

      <button onClick={props.logoutHandler} className="logout">
        Logout
      </button>
      <div className="seller-username">{props.userName}</div>
      <div className="seller-list">
        <ol>
          <h2>List of Orange Sellers</h2>
          {sellers.map((item, idx) => {
            return (
              <li onClick={getSellerProfile} key={item._id}>
                <div className="seller-listitem">
                  {item.userName} ({item.email})
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div>
        {showSellerProfile ? (
          <div className="orange-table">
            <h2>Oranges from: {sellerClicked}</h2>
            <table>
              <tr>
                <th>S.No.</th>
                <th>Orange-Type</th>
                <th>Price per kg</th>
              </tr>
              {oranges.length !== 0 ? (
                oranges.map((item, idx) => (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                ))
              ) : (
                <h4>No data found!</h4>
              )}
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Buyer;
