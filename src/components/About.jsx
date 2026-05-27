import { about, site } from '../data/portfolio'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'
import { fadeUpItem, sectionReveal, staggerContainer, viewportOnce } from '../utils/motion'

export default function About() {
  return (
    <motion.section
      className="section about"
      id="about"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="container about__grid" variants={staggerContainer}>
        <motion.div className="about__aside" variants={fadeUpItem}>
          <div className="about__photo-frame">
            <img
              src={site.profileImage}
              alt={`Portrait of ${site.name}`}
              className="about__photo"
              width={240}
              height={300}
            />
          </div>
          <SectionTitle label="01. About" title="A little about me" />
        </motion.div>
        <motion.div className="about__content" variants={staggerContainer}>
          {about.paragraphs.map((text) => (
            <motion.p key={text.slice(0, 32)} variants={fadeUpItem}>
              {text}
            </motion.p>
          ))}
          <motion.ul className="about__stats" variants={staggerContainer}>
            {about.highlights.map((item) => (
              <motion.li key={item.label} variants={fadeUpItem}>
                <span className="about__stat-value">{item.value}</span>
                <span className="about__stat-label">{item.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
