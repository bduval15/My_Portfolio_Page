import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! (You can replace this with actual functionality)");
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <p>Feel free to reach out for collaborations, freelance projects, or just to say hi!</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:bduval3@my.bcit.ca">bduval3@my.bcit.ca</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/bduval15" target="_blank">github.com/bduval15</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/braedenduval15/" target="_blank">linkedin.com/in/braedenduval15</a></li>
        </ul>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h3>Send me a message</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
