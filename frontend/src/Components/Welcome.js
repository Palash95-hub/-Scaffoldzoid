import { Link } from "react-router-dom";

function Welcome(props) {
  return (
    <>
      <div className="heading">
        <h1>Welcome to ScaffoldZoid</h1>
      </div>

      <div className="description">
        <div className="image">
          <img
            src="https://cdn.pixabay.com/photo/2014/08/01/08/31/oranges-407429_1280.jpg"
            alt=""
          />
        </div>
        <div className="text">
          <div className="about">About</div>
          <p>
            Orange is grown across the world in 41.96 lakh hectares with 684.75
            lakh tonnes production which translates into 16.32 tonnes a hectare
            productivity according to FAO, 2009. It is the most commonly grown
            tree fruit in the world.
            <br />
            India is the third largest producer of orange in the world. In
            India, specific cultivars of oranges are cultivated in different
            regions. For example, Coorg orange is typical to Coorg and Wayanad
            regions of Karnataka, whereas Nagpur orange is ideally suited for
            Vidarbha region. There is a need to ensure remunerative price to the
            orange producer and reduction in marketing cost. Marketing of
            oranges on cooperative basis can help the farmers in getting higher
            prices for their produce by eliminating intermediaries. Proper steps
            should be taken to link production, processing and marketing of
            oranges to avoid seasonal gluts.
            <br />
            We provide a way to buisness out your oranges in market in a very
            convenient manner. Through our platform farmers, wholesalers,
            dealers can directly sell and purchase their product.
          </p>
          <h3>Grow Your Business With Our Unified Platform..</h3>
        </div>
      </div>
      <div className="button">
        <b>You wanna :</b>
        <Link to="/sellerlogin">
          <button className="btn">Sell Oranges</button>
        </Link>
        <Link to="/buyerlogin">
          <button className="btn">Buy Oranges</button>
        </Link>
      </div>
    </>
  );
}

export default Welcome;
