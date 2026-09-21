import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

function Stats() {
  const [ref, inView] = useInView();

  const years = useCountUp(15, 1800, inView);
  const patients = useCountUp(5000, 2200, inView);
  const services = useCountUp(20, 1800, inView);
  const care = useCountUp(100, 1800, inView);

  const stats = [
    { number: years, suffix: '+', label: 'Years Experience' },
    { number: patients, suffix: '+', label: 'Patients Treated' },
    { number: services, suffix: '', label: 'Services Offered' },
    { number: care, suffix: '%', label: 'Personalised Care' },
  ];

  return (
    <section
      className={`stats ${inView ? 'in-view' : ''}`}
      ref={ref}
      aria-label="Key statistics"
    >
      <div className="container">
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.label} className="stat">
              <div className="stat-number">
                {stat.number}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
