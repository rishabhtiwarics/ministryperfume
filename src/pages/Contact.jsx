import React from 'react';
import { Mail, Phone, User, MessageSquare, Send, MapPin, Clock } from 'lucide-react';
import InnerBanner from '../components/common/InnerBanner.jsx';
import contactImg from '../img/categories/categorie1.jpeg';

export default function Contact() {
  return (
    <>
      <InnerBanner
        eyebrow="Talk To Us"
        title="Contact"
        paragraph="Questions about fragrance, gifting, or orders? Reach the Avenlora team."
      />

      <section className="contact-card-section">
        <div className="container">
          {/* First Card: Image + Contact Form */}
          <div className="contact-card">
            {/* Left side: Image */}
            <div className="contact-card-left">
              <img src={contactImg} alt="Avenlora Fragrances" className="contact-card-img" />
            </div>

            {/* Right side: Contact Form with input icons */}
            <div className="contact-card-right">
              <div className="contact-form-header">
                <h2>Send Us A Message</h2>
                <p>Fill out the details below and our concierge team will get back to you promptly.</p>
              </div>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="contact-input-field">
                  <label htmlFor="contact-name">Full Name</label>
                  <div className="input-icon-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="contact-input-field">
                  <label htmlFor="contact-email">Email Address</label>
                  <div className="input-icon-wrapper">
                    <Mail className="input-icon" size={18} />
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact-input-field">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <div className="input-icon-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>

                <div className="contact-input-field">
                  <label htmlFor="contact-message">Message</label>
                  <div className="input-icon-wrapper textarea-wrapper">
                    <MessageSquare className="input-icon textarea-icon" size={18} />
                    <textarea
                      id="contact-message"
                      placeholder="Write your message here..."
                      rows={4}
                      required
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Second Card: 40% Contact Details & 60% Map */}
          <div className="contact-card contact-map-card">
            {/* Left side (40%): Contact Details */}
            <div className="contact-details-side">
              <div className="contact-details-header">
                <h2>Visit Our Boutique</h2>
                <p>Experience our fragrance collection in person or reach out directly.</p>
              </div>

              <div className="contact-details-list">
                <div className="contact-details-item">
                  <div className="contact-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <strong>Location</strong>
                    <p>Connaught Place, Central District, New Delhi, India 110001</p>
                  </div>
                </div>

                <div className="contact-details-item">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <strong>Phone & WhatsApp</strong>
                    <p>+91 98765 43210</p>
                  </div>
                </div>

                <div className="contact-details-item">
                  <div className="contact-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <strong>Email Support</strong>
                    <p>hello@avenlora.com</p>
                  </div>
                </div>

                <div className="contact-details-item">
                  <div className="contact-detail-icon">
                    <Clock size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <strong>Boutique Hours</strong>
                    <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side (60%): Interactive Map */}
            <div className="contact-map-side">
              <iframe
                title="Boutique Location Map"
                src="https://maps.google.com/maps?q=Connaught%20Place,%20New%20Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



