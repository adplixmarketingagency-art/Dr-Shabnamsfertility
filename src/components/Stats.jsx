function Stats() {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5000+', label: 'Patients Treated' },
    { number: '20+', label: 'Services Offered' },
    { number: '100%', label: 'Personalised Care' },
  ];

  return (
    <section className="stats" aria-label="Key statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.label} className="stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
