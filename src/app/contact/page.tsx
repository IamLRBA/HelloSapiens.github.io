'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    // TODO: Implement form submission
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>Get in touch with us</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Let's work together</h2>
              <p>
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>

              <div className={styles.infoItem}>
                <h3>Email</h3>
                <a href="mailto:hello@sapiens-solutions.com">
                  hello@sapiens-solutions.com
                </a>
              </div>

              <div className={styles.infoItem}>
                <h3>Location</h3>
                <p>Barcelona, Spain</p>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


