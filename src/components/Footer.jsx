import { site } from '../data/portfolio'
import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          Built with React & Vite · © {year} {site.name}
        </p>
        <motion.a
          href="#home"
          className="footer__top"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  )
}
