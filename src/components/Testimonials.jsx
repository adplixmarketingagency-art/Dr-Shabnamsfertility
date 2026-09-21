function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Patients Say</h2>
          <p className="section-subtitle">Real stories from families who trusted us with their journey to parenthood.</p>
          <div className="accent-line"></div>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <blockquote className="testimonial-quote">
            &ldquo;Dr. Shabnam&apos;s warmth and expertise gave us the confidence to pursue IVF. Her personalised approach made every step feel manageable. We are forever grateful for the gift of parenthood.&rdquo;
          </blockquote>
          <div className="testimonial-author">A. &amp; R. Mehta</div>
          <div className="testimonial-role">IVF Parents, Pondicherry</div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
