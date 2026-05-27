export const viewportOnce = { once: true, amount: 0.25 }

export const smoothSpring = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.7,
}

export const sectionReveal = {
  hidden: { opacity: 0, y: 44, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...smoothSpring, duration: 0.8 },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...smoothSpring, duration: 0.65 },
  },
}

export const floatLoop = {
  y: [0, -8, 0, 7, 0],
  rotate: [0, 0.4, 0, -0.4, 0],
  transition: {
    duration: 9,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}
