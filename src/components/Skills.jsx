import { skills } from '../data/portfolio'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'
import { fadeUpItem, sectionReveal, staggerContainer, viewportOnce } from '../utils/motion'
import {
  FaCodeBranch,
  FaCode,
  FaDatabase,
  FaGlobe,
  FaMobileAlt,
  FaServer,
} from 'react-icons/fa'
import {
  SiAndroid,
  SiApple,
  SiDart,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiReact,
} from 'react-icons/si'

const iconMap = {
  flutter: SiFlutter,
  dart: SiDart,
  react: SiReact,
  android: SiAndroid,
  apple: SiApple,
  web: FaGlobe,
  javascript: SiJavascript,
  csharp: FaServer,
  api: FaCode,
  database: FaDatabase,
  firebase: SiFirebase,
  git: FaCodeBranch,
  agile: FaMobileAlt,
}

function SkillIcon({ icon }) {
  const Icon = iconMap[icon] ?? FaCode
  return <Icon />
}

export default function Skills() {
  return (
    <motion.section
      className="section skills"
      id="skills"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="container" variants={staggerContainer}>
        <SectionTitle label="02. Skills" title="Technologies I work with" />
        <motion.ul className="skills__grid" variants={staggerContainer}>
          {skills.map((skill) => (
            <motion.li
              key={skill.label}
              className="skills__item"
              variants={fadeUpItem}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <span className="skills__icon" aria-hidden="true">
                <SkillIcon icon={skill.icon} />
              </span>
              <span className="skills__label">{skill.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.section>
  )
}
