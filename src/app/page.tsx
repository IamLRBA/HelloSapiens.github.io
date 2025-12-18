'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <ScrollReveal>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Sapiens Solutions</h1>
            <p className={styles.heroSubtitle}>Software for humans</p>
            <a 
              href="#about" 
              className={styles.heroButton}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Learn More
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100} direction="right">
          <div className={styles.heroImage}>
            <Image
              src="/images/screen.jpg"
              alt="Sapiens Solutions"
              width={400}
              height={800}
              priority
              className={styles.image}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Services Section */}
      <section id="about" className={styles.services}>
        <div className={styles.container}>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>
              We provide software development, systems architecture, code reviews
              and mentoring, as well as training and implementation of technical
              projects
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Spotlight Sections */}
      <section className={styles.spotlights}>
        <div className={styles.container}>
          <ScrollReveal>
            <div className={styles.spotlight}>
              <div className={styles.spotlightImage}>
                <Image
                  src="/images/pic01.jpg"
                  alt="Code Connoisseurs"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.spotlightContent}>
                <h3>Code Connoisseurs Extraordinaires</h3>
                <p>
                  We are proud to bring deeply technical knowledge and a focus on
                  excellence to all the projects we engage in. Leading development
                  teams to be happier, produce cleaner and more efficient code.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.spotlight}>
              <div className={styles.spotlightImage}>
                <Image
                  src="/images/pic02.jpg"
                  alt="Health Systems"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.spotlightContent}>
                <h3>Health Systems Strengthening</h3>
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
                  for electronic medical records. We are also part of the
                  technical steering committee on{' '}
                  <a
                    href="https://odk-x.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ODK-X
                  </a>{' '}
                  a platform for mobile data collection
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={styles.spotlight}>
              <div className={styles.spotlightImage}>
                <Image
                  src="/images/pic03.jpg"
                  alt="Implementation and training"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.spotlightContent}>
                <h3>Implementation and training</h3>
                <p>
                  We are currently involved in several studies and projects
                  focused on improving health systems in Sub-Saharan Africa as
                  well as in India. We provide implementation assistance and
                  training.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

