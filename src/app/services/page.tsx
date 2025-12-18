import styles from './page.module.scss';

export default function Services() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Services</h1>
          <p className={styles.subtitle}>
            Comprehensive software development and consulting services
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>
              <h2>Software Development</h2>
              <p>
                Custom software solutions tailored to your needs. We build
                robust, scalable applications using modern technologies and best
                practices.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <h2>Systems Architecture</h2>
              <p>
                Design and implement system architectures that are scalable,
                maintainable, and aligned with your business objectives.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <h2>Code Reviews & Mentoring</h2>
              <p>
                Expert code reviews to improve code quality, and mentoring to
                help development teams grow and excel.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <h2>Training & Implementation</h2>
              <p>
                Comprehensive training programs and hands-on implementation
                support for technical projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



