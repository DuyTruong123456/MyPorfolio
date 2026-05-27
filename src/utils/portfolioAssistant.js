import { site, about, skills, experience, projects } from '../data/portfolio'

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const includesAny = (text, words) => words.some((word) => text.includes(word))

export function getPortfolioReply(rawInput) {
  const q = normalize(rawInput)
  if (!q) return null

  if (includesAny(q, ['hi', 'hello', 'hey', 'xin chao', 'chao ban'])) {
    return `Hi! I'm ${site.name.split(' ').pop()}'s portfolio guide. Ask me about skills, projects, work history, or how to get in touch.`
  }

  if (includesAny(q, ['who are you', 'your name', 'ten ban', 'ten la gi', 'name'])) {
    return `${site.name} is a ${site.title} based in ${site.location}. ${site.tagline}`
  }

  if (includesAny(q, ['skill', 'tech', 'stack', 'ky nang', 'flutter', 'dart'])) {
    const list = skills.map((s) => s.label).join(', ')
    return `Key skills: ${list}. Focus areas include cross-platform mobile, web (React), REST APIs, and App Store / Google Play releases.`
  }

  if (includesAny(q, ['project', 'app', 'portfolio', 'built', 'du an', 'san pham'])) {
    const lines = projects.map((p) => `• ${p.title}: ${p.description}`).join('\n')
    return `Featured work:\n${lines}`
  }

  if (includesAny(q, ['experience', 'work', 'job', 'company', 'kinh nghiem', 'lam viec'])) {
    const lines = experience
      .map((e) => `• ${e.role} at ${e.company} (${e.period})`)
      .join('\n')
    return `Work history:\n${lines}`
  }

  if (includesAny(q, ['about', 'background', 'education', 'hoc', 'truong', 'gpa', 'ielts'])) {
    return about.paragraphs.join(' ')
  }

  if (includesAny(q, ['contact', 'email', 'phone', 'reach', 'hire', 'lien he'])) {
    return `Email: ${site.email}${site.phone ? ` · Phone: ${site.phone}` : ''} · Location: ${site.location}. Scroll to the Contact section or use the resume button in the nav.`
  }

  if (includesAny(q, ['medpro', 'health'])) {
    const p = projects.find((item) => item.id === 'medpro')
    return p ? `${p.title}: ${p.description}` : null
  }

  if (includesAny(q, ['olivia', 'ai', '3d', 'llm'])) {
    const p = projects.find((item) => item.id === 'olivia')
    return p ? `${p.title}: ${p.description}` : null
  }

  if (includesAny(q, ['beam', 'webrtc', 'call', 'video'])) {
    const p = projects.find((item) => item.id === 'beam')
    return p ? `${p.title}: ${p.description}` : null
  }

  if (includesAny(q, ['hl mart', 'hlmart', 'ecommerce', 'woo'])) {
    const p = projects.find((item) => item.id === 'hlmart')
    return p ? `${p.title}: ${p.description}` : null
  }

  if (includesAny(q, ['resume', 'cv', 'download'])) {
    return `You can open the resume from the navigation bar (${site.resumeUrl}).`
  }

  if (includesAny(q, ['help', 'what can you', 'ask'])) {
    return 'Try: "What are his skills?", "Tell me about MedPro", "Work experience", or "How do I contact him?"'
  }

  return `I'm not sure about that, but I know ${site.name}'s portfolio well. Ask about skills, projects (MedPro, Olivia, Beam…), experience, or contact details.`
}

export const suggestedQuestions = [
  'What are your skills?',
  'Tell me about your projects',
  'Work experience',
  'How can I contact you?',
]
