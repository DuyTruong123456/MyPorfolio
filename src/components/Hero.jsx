import { site } from '../data/portfolio'
import { motion } from 'framer-motion'
import { fadeUpItem, floatLoop, staggerContainer, viewportOnce } from '../utils/motion'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <motion.div
        className="container hero__layout"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="hero__inner" variants={staggerContainer}>
          <motion.p className="hero__greeting" variants={fadeUpItem}>
            Hi, my name is
          </motion.p>
          <motion.h1 className="hero__name" variants={fadeUpItem}>
            {site.name}.
          </motion.h1>
          <motion.h2 className="hero__title" variants={fadeUpItem}>
            {site.title}
          </motion.h2>
          <motion.p className="hero__tagline" variants={fadeUpItem}>
            {site.tagline}
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUpItem}>
            <motion.a
              href="#projects"
              className="btn btn--primary"
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              View my work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn--outline"
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="hero__photo-wrap" variants={fadeUpItem}>
          <motion.div className="hero__photo-frame" animate={floatLoop}>
            <img
              src={site.profileImage}
              alt={`Portrait of ${site.name}`}
              className="hero__photo"
              width={320}
              height={400}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="hero__accent" aria-hidden="true" />
    </section>
  )
}
