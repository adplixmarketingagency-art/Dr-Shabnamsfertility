function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have questions or ready to book? We&apos;re here to help — reach out anytime.</p>
          <div className="accent-line"></div>
        </div>
        <div className="contact-inner">
          <div className="contact-info">
            <h3>Visit Our Clinic</h3>
            <p>Dr. Shabnam&apos;s Fertility and Gynec Centre — offering comprehensive women&apos;s healthcare with a personal touch.</p>
            <div className="contact-detail">
              <div className="contact-detail-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <strong>Address</strong>
                <span>No.162/1, (3rd Floor), Pointcare Street,<br />Nellithope, Puducherry - 605 005</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon"><i className="fa-solid fa-phone"></i></div>
              <div>
                <strong>Phone</strong>
                <a href="tel:+917695852669">+91 76958 52669</a><br />
                <a href="tel:+919600419027">+91 9600419027</a><br />
                <a href="tel:+919003619027">+91 90036 19027</a>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon"><i className="fa-regular fa-envelope"></i></div>
              <div>
                <strong>Email</strong>
                <a href="mailto:dr.shabnamkhan@gmail.com">dr.shabnamclinical@gmail.com</a>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon"><i className="fa-regular fa-clock"></i></div>
              <div>
                <strong>Working Hours</strong>
                <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
          <form className="contact-form" action="#" method="POST" aria-label="Contact form">
            <h3>Send a Message</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="+91XXXXXXXXXX" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary form-submit">
              <i className="fa-regular fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
