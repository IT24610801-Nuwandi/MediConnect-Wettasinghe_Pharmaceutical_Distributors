import React from 'react';
import '../../Pages/Home/Home.css';
import logo from '../../assets/Logo.jpg';
import distributorsImage from '../../assets/Authorised_Distributors.jpg'; // ✅ Combined image

export default function Home() {
  return (
    <section className="home">
      <div className="home-header">
        <img src={logo} alt="Wettasinghe Logo" className="home-logo" />
        <h1>WETTASINGHE PHARMACEUTICAL DISTRIBUTORS (PVT) LTD</h1>
      </div>

      <h2 className="tagline">--- LET US TAKE CARE OF YOU ---</h2>

      <p className="intro">
        Wettasinghe Pharmaceutical Distributors (Pvt) Ltd. began its operations in 1998 and completes 25 years of service this year. 
        We are the largest distributor of Generic pharmaceuticals in Colombo and suburbs and have grown from strength to strength over the years. 
        Our expanding clientele is an indication of our commitment towards excellence in service.
      </p>

      <h3>Authorised Distributor for:</h3>
      <div className="distributor-image-block">
        <img src={distributorsImage} alt="Authorized Distributor Logos" className="distributor-image" />
      </div>
    </section>
  );
}