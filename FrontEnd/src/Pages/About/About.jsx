import React from "react";
import "./About.css";


export default function About() {
  return (
    <main className="about">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>About Us</h1>
          <p className="lead">
            We’re Wettasinghe Pharmaceutical Distributors (Pvt) Ltd.—serving
            pharmacies, hospitals and private practitioners in and around
            Colombo since 1998.
          </p>
        </div>
      </section>

      {/* INTRO (two columns) */}
      <section className="section">
        <div className="container grid two">
          <div className="prose">
            <p>
              Wettasinghe Pharmaceutical Distributors (Pvt) Ltd. began its
              operations in 1998. We are the largest distributor of generic
              pharmaceuticals in Colombo and suburbs and have grown from
              strength to strength over the years. Our expanding clientele is an
              indication of our commitment towards excellence in service.
            </p>
            <p>
              From its humble beginnings as a family oriented business, the
              company has since grown into a fully-fledged business and serves a
              large number of Pharmacies, Hospitals and private practitioners in
              and around Colombo.
            </p>
          </div>

          <div className="prose">
            <p>
              The company is the Authorized distributor for State
              Pharmaceuticals Corporation (SPC), State Pharmaceuticals and
              Manufacturing Corporation (SPMC), Alaris Lanka, Morisons PLC, and
              also stocks products of other pharmaceutical companies where
              necessary.
            </p>
            <p>
              We were selected the <strong>“Best Distributor”</strong> island-wide in
              <strong> 2005</strong> and again in <strong>2014</strong>, and have always maintained our
              place among SPC’s Best Five Distributors. We have built up an
              enviable reputation for good service and integrity and are
              rewarded with many awards and accolades over the years.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE: STAFF PHOTO (text + image) */}
      <section className="section alt">
        <div className="container grid two">
          <div className="prose">
            <h2>Our Loyal & Dedicated Staff</h2>
            <p>
              Our loyal & dedicated staff work 6 days a week to ensure that
              goods are invoiced and dispatched to customers within a day or two
              of placing order.
            </p>
            <h3>Mrs. Kusum Wettasinghe</h3>
            <p>
              The founder, served the State Pharmaceuticals Corporation for a
              period of 23 years and retired early to take up the
              distributorship for the SPC. She served as the Manager Promotions
              &amp; Research at the time of retirement. Being a qualified
              pharmacist she set about her work in a professional manner and
              strived hard to promote SPC &amp; SPMC generic drugs in Colombo
              which at that time had a market only for branded products!
            </p>
          </div>

          <div className="media-card">
            <img src="/assets/staff.jpg" alt="Our staff" />
          </div>
        </div>
      </section>

      {/* TWO CARDS: AWARDS | JOURNEY (like image #3 alternating blocks) */}
      <section className="section">
        <div className="container grid two">
          <article className="card">
            <h3>Awards &amp; Accolades</h3>
            <img src="/assets/awards.jpg" alt="Awards & Accolades" />
            <p className="muted">
              Recognized multiple times for distribution excellence and service
              quality across Sri Lanka.
            </p>
          </article>

          <article className="card">
            <h3>Our Journey</h3>
            <img src="/assets/journey.jpg" alt="Company timeline" />
            <p className="muted">
              Milestones from 1998 to today—partnerships with SPC, SPMC and
              leading manufacturers, plus national awards along the way.
            </p>
          </article>
        </div>
      </section>

      {/* BY THE NUMBERS (small stat tiles like HubSpot strip) */}
      <section className="section alt">
        <div className="container stats">
          <div className="stat">
            <div className="stat-num">1998</div>
            <div className="stat-label">Established</div>
          </div>
          <div className="stat">
            <div className="stat-num">2×</div>
            <div className="stat-label">Best Distributor (2005, 2014)</div>
          </div>
          <div className="stat">
            <div className="stat-num">SPC • SPMC</div>
            <div className="stat-label">Authorized Distributor</div>
          </div>
          <div className="stat">
            <div className="stat-num">Colombo+</div>
            <div className="stat-label">Wide Service Coverage</div>
          </div>
        </div>
      </section>
    </main>
  );
}
