import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./feedback.css"; // CSS file ka import

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ihlgsmd", // 🛠️ Replace with your service ID
        "template_bs2hwdg", // 🛠️ Replace with your template ID
        form.current,
        "CO5LuHuhKPhYtq896" // 🛠️ Replace with your public key
      )
      .then(
        () => {
          alert("Email Sent Successfully ✅");
          form.current.reset();
        },
        (error) => {
          alert("Failed to Send ❌");
          console.error(error);
        }
      );
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail} className="form-box">
        <h2 className="form-title">feedback please thanks</h2>

        <div>
          <label className="form-label">Your Name</label>
          <input type="text" name="name" className="form-input" required />
        </div>

        <div>
          <label className="form-label">Your Email</label>
          <input type="email" name="email" className="form-input" required />
        </div>

        <div>
          <label className="form-label">Your Message</label>
          <textarea
            name="message"
            className="form-textarea"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
