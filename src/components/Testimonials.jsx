function Testimonials() {
  const reviews = [
    {
      name: "Baranilakshman",
      stars: 5,
      text: "I would like to express my sincere gratitude to the gynaecologist Dr. Shabnam and her team. She is extremely good, caring, and professional. Throughout the pregnancy and delivery, she explained everything clearly and gave us a lot of confidence. The hospital staff were also very supportive, kind, and well-coordinated. Their care made the entire delivery experience smooth and stress-free.",
    },
    {
      name: "Nandhini",
      stars: 5,
      text: "Dr. Shabnam Madam is the best gynaecologist specialist in Pondicherry. We were blessed with a girl baby after 4 years of marriage. She is such a positive and friendly person. Thanks to Dr. Jayavani and Benny Mam, pharmacy staff, reception staff, and all the team. Our whole family is happy!",
    },
    {
      name: "Sulogakumari2015",
      stars: 5,
      text: "Excellent healthcare center! The doctors here are highly experienced, deeply knowledgeable, and genuinely care for their patients. They listen to every concern patiently and explain the treatment beautifully. The entire staff is professional and the facility is top-notch. Highly recommended!",
    },
    {
      name: "Pravin Pravin",
      stars: 5,
      text: "An amazing female OB doctor. She was calm, supportive, and highly professional during my wife's delivery. Her care and reassurance made the entire experience smooth and stress-free. Thanks to the whole team!",
    },
  ];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Patients Say</h2>
          <p className="section-subtitle">Real stories from families who trusted us with their journey to parenthood.</p>
          <div className="accent-line"></div>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-card-header">
                <i className="fa-brands fa-google review-g" aria-hidden="true"></i>
                <div className="review-card-stars">
                  {[...Array(r.stars)].map((_, j) => (
                    <i key={j} className="fa-solid fa-star" aria-hidden="true"></i>
                  ))}
                </div>
              </div>
              <blockquote className="review-card-text">&ldquo;{r.text}&rdquo;</blockquote>
              <div className="review-card-name">— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
