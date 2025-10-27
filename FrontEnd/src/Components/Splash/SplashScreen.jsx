import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";
import bg from "../../assets/image1.jpg";

export default function SplashScreen({ onDone }) {
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    // OPTIONAL: remember so we don’t show again in this tab
    sessionStorage.setItem("seenSplash", "1");
    // sessionStorage.removeItem('seenSplash');


    onDone?.();        // unmount the overlay
    navigate("/");     // go to Home
  }, [navigate, onDone]);

  return (
    <div className="splash-root">
      <div className="splash-full" style={{ backgroundImage: `url(${bg})` }}>
        <img className="splash-image" src="/image1.jpg" />
        <div className="splash-content">
          <h1 className="splash-title pill">Wettasinghe Pharmaceutical Distributors (Pvt) Ltd</h1>   // ✅ single h1
          {/* <h2 className="splash-subtitle ">Welcome</h2> */}
        </div>
        <button className="start-btn" onClick={handleStart}>START NOW</button>
      </div>
    </div>
  );
}
