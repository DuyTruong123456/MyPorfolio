import { site } from '../data/portfolio'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'
import { fadeUpItem, sectionReveal, staggerContainer, viewportOnce } from '../utils/motion'

const socialLinks = [
  { label: 'GitHub', url: site.social.github },
  { label: 'LinkedIn', url: site.social.linkedin },
  { label: 'Twitter', url: site.social.twitter },
].filter((link) => link.url && link.url !== '#')

export default function Contact() {
  return (
    <motion.section
      className="section contact"
      id="contact"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="container contact__inner" variants={staggerContainer}>
        <SectionTitle label="05. Contact" title="Let's work together" />
        <motion.p className="contact__text" variants={fadeUpItem}>
          I'm open to mobile and software engineering roles and interesting
          product work. Reach
          out by email or phone — I reply in English or Vietnamese.
        </motion.p>
        <motion.p className="contact__meta" variants={fadeUpItem}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.phone && (
            <>
              {' · '}
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </>
          )}
          {site.location && (
            <>
              <br />
              {site.location}
            </>
          )}
        </motion.p>
        <motion.a
          href={`mailto:${site.email}`}
          className="btn btn--primary btn--lg"
          variants={fadeUpItem}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          Say hello
        </motion.a>
        {socialLinks.length > 0 && (
          <motion.ul className="contact__social" variants={staggerContainer}>
            {socialLinks.map((link) => (
              <motion.li key={link.label} variants={fadeUpItem}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.section>
  )
}
