import { experience } from '../data/portfolio'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'
import { fadeUpItem, sectionReveal, staggerContainer, viewportOnce } from '../utils/motion'

export default function Experience() {
  return (
    <motion.section
      className="section experience"
      id="experience"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="container" variants={staggerContainer}>
        <SectionTitle label="04. Experience" title="Where I've worked" />
        <motion.ol className="experience__list" variants={staggerContainer}>
          {experience.map((job) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              className="experience__item"
              variants={fadeUpItem}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              <div className="experience__header">
                <div>
                  <h3 className="experience__role">{job.role}</h3>
                  {job.url ? (
                    <a
                      href={job.url}
                      className="experience__company"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <p className="experience__company">{job.company}</p>
                  )}
                </div>
                <span className="experience__period">{job.period}</span>
              </div>
              <ul className="experience__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)}>{bullet}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </motion.section>
  )
}
