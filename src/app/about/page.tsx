import styles from './page.module.scss';

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>About</h1>
          <p className={styles.subtitle}>Who we are and what we do</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2>Code Connoisseurs Extraordinaires</h2>
            <p>
              We are proud to bring deeply technical knowledge and a focus on
              excellence to all the projects we engage in. Leading development
              teams to be happier, produce cleaner and more efficient code.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Our Mission</h2>
            <p>
              To deliver exceptional software solutions that make a meaningful
              impact. We believe in the power of well-crafted code and the
              importance of human-centered design.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Our Approach</h2>
            <p>
              We combine technical excellence with a deep understanding of our
              clients' needs. Every project is an opportunity to create something
              meaningful and lasting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}



