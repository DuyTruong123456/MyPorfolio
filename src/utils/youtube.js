/** Extract YouTube video ID from watch, embed, or youtu.be URLs. */
export function getYouTubeVideoId(url) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('/')[0] || null
    }
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/')[2] || null
    }
    return parsed.searchParams.get('v')
  } catch {
    return null
  }
}
