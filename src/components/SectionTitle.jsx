import { motion } from 'framer-motion'
import { fadeUpItem } from '../utils/motion'

export default function SectionTitle({ id, label, title }) {
  return (
    <motion.div className="section-title" id={id} variants={fadeUpItem}>
      <motion.span className="section-label" variants={fadeUpItem}>
        {label}
      </motion.span>
      <motion.h2 variants={fadeUpItem}>{title}</motion.h2>
    </motion.div>
  )
}
