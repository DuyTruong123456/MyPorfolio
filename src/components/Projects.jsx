import { projects } from '../data/portfolio'
import SectionTitle from './SectionTitle'
import YouTubeEmbed from './YouTubeEmbed'
import WebPreview from './WebPreview'
import ImageSlider from './ImageSlider'
import { motion } from 'framer-motion'
import { fadeUpItem, sectionReveal, staggerContainer } from '../utils/motion'

function ProjectLinks({ project }) {
  const hasVideo = Boolean(project.youtubeUrl)
  const links = []

  if (project.googlePlayUrl) {
    links.push(
      <motion.a
        key="google-play"
        href={project.googlePlayUrl}
        target="_blank"
        rel="noreferrer"
        className="project-card__link project-card__link--store"
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Google Play
      </motion.a>,
    )
  }

  if (project.appStoreUrl) {
    links.push(
      <motion.a
        key="app-store"
        href={project.appStoreUrl}
        target="_blank"
        rel="noreferrer"
        className="project-card__link project-card__link--store"
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        App Store
      </motion.a>,
    )
  }

  if (project.repoUrl && project.repoUrl !== '#') {
    links.push(
      <motion.a
        key="github"
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.97 }}
      >
        GitHub
      </motion.a>,
    )
  }

  if (project.liveUrl && project.liveUrl !== '#') {
    links.push(
      <motion.a
        key="live"
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.97 }}
      >
        Visit website
      </motion.a>,
    )
  }

  if (hasVideo) {
    links.push(
      <motion.a
        key="youtube"
        href={project.youtubeUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.97 }}
      >
        Watch on YouTube
      </motion.a>,
    )
  }

  if (links.length === 0) return null

  return (
    <div
      className={`project-card__links ${project.googlePlayUrl || project.appStoreUrl ? 'project-card__links--stores' : ''}`}
    >
      {links}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const hasVideo = Boolean(project.youtubeUrl)
  const hasWebPreview = Boolean(project.webPreviewUrl)
  const hasImages = Boolean(project.images?.length)
  const isFeatured = hasVideo || hasWebPreview || hasImages || project.featured

  return (
    <motion.article
      className={`project-card ${isFeatured ? 'project-card--featured' : ''}`}
      variants={fadeUpItem}
      whileHover={{ y: -7, boxShadow: '0 16px 38px rgba(0, 0, 0, 0.35)' }}
      transition={{ type: 'spring', stiffness: 230, damping: 18 }}
    >
      {hasVideo && (
        <YouTubeEmbed
          url={project.youtubeUrl}
          title={`${project.title} demo video`}
        />
      )}
      {!hasVideo && (hasImages || hasWebPreview) && (
        <div className="project-card__media">
          {hasImages && (
            <ImageSlider
              key={project.id ?? project.title}
              images={project.images}
              title={project.title}
              autoSlide={project.autoSlide}
            />
          )}
          {hasWebPreview && (
            <WebPreview
              url={project.webPreviewUrl}
              title={`${project.title} website preview`}
            />
          )}
        </div>
      )}
      <span className="project-card__index">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="project-card__tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <ProjectLinks project={project} />
    </motion.article>
  )
}

export default function Projects() {
  return (
    <motion.section
      className="section projects"
      id="projects"
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="container" variants={staggerContainer}>
        <SectionTitle label="03. Projects" title="Things I've built" />
        <motion.div className="projects__grid" variants={staggerContainer}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.title}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
