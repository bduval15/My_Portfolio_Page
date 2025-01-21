import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <section className="contact-section">
      <h2 className="section-title">Contact</h2>
      <p>Have a project or a question? Let’s connect!</p>
      <a href="mailto:your_email@example.com" className="btn-neon">Say Hello</a>
    </section>
  );
}

export default Contact;
