import { useState } from "react";
import './HomePage.css';
export default function HomePage() {
      const [showPrograms, setShowPrograms] = useState(false);

  return (
    <div className="home-wrapper">
      {/* HEADER */}
       <header className="header flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="logo text-xl font-bold">★ </div>
        <nav className="nav flex gap-6">
          <a
            onClick={() => setShowPrograms(prev => !prev)}
            className="hover:underline"
          >
            Programs ▾
          </a>
          <a href="#">About</a>
          <a href="#">Gallery</a>
          <a href="#">Support ▾</a>
        </nav>
        <button className="enquire-button bg-blue-600 text-white px-4 py-2 rounded">
          Enquire Now
        </button>
      </header>

      {/* DROPDOWN SECTION */}
      {showPrograms && (
        <section className="hero-section p-6 bg-gray-100 shadow-md">
          <div className="menu-columns grid grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold">Undergraduate</h3>
              <p><strong>Engineering</strong> — Top B.Tech specializations</p>
              <p><strong>Management</strong> — Industry-focused curriculum</p>
              <p><strong>Sciences</strong> — Labs & research opportunities</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Admissions</h3>
              <p><strong>Apply Now</strong> — Start your application</p>
              <p><strong>Fee Structure</strong> — Tuition details</p>
              <p><strong>Scholarships</strong> — Merit & need-based</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Campus Life</h3>
              <p><strong>Facilities</strong> — Hostels, sports, etc.</p>
              <p><strong>Clubs</strong> — Student organizations</p>
              <p><strong>Events</strong> — Fests, workshops</p>
            </div>
            <div className="cta-box bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Your gateway to a brighter future</h2>
              <p className="mt-2">Connect with us for admissions, fees, and scholarships.</p>
              <button className="cta-button mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Enquire →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SLIDESHOW PLACEHOLDER */}
      <section className="slideshow">
        <div className="slide">[ Slide Image 1 ]</div>
        <div className="slide">[ Slide Image 2 ]</div>
        <div className="slide">[ Slide Image 3 ]</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">★  EDUCATION SERVICES</div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <p>Home</p>
              <p>About</p>
              <p>Gallery</p>
              <p>Contact</p>
              <p>Login</p>
            </div>
            <div>
              <h4>Admissions</h4>
              <p>Apply</p>
              <p>Fees</p>
              <p>Scholarships</p>
              <p>Courses</p>
              <p>Support</p>
            </div>
            <div>
              <h4>Legal</h4>
              <p>Terms</p>
              <p>Policy</p>
              <p>Help</p>
              <p>FAQ</p>
              <p>Careers</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>All rights reserved © 2025</p>
          <div className="footer-bottom-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
