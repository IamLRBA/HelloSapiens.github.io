import styles from './page.module.scss';

export default function OpenSource() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Open Source</h1>
          <p className={styles.subtitle}>
            Contributing to open source health systems
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2>Health Systems Strengthening</h2>
            <p>
              Sapiens Solutions are experts in various open source projects,
              such as{' '}
              <a
                href="https://bahmni.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bahmni
              </a>
              ,{' '}
              <a
                href="https://openmrs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenMRS
              </a>{' '}
              for electronic medical records. We are also part of the technical
              steering committee on{' '}
              <a
                href="https://odk-x.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                ODK-X
              </a>{' '}
              a platform for mobile data collection.
            </p>
          </div>

          <div className={styles.projects}>
            <div className={styles.projectCard}>
              <h3>
                <a
                  href="https://bahmni.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bahmni
                </a>
              </h3>
              <p>
                An open-source hospital information system designed for
                low-resource settings.
              </p>
            </div>

            <div className={styles.projectCard}>
              <h3>
                <a
                  href="https://openmrs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenMRS
                </a>
              </h3>
              <p>
                A software platform and reference application for electronic
                medical records.
              </p>
            </div>

            <div className={styles.projectCard}>
              <h3>
                <a
                  href="https://odk-x.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ODK-X
                </a>
              </h3>
              <p>
                A platform for mobile data collection with advanced features for
                complex workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



