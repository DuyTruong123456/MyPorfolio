const preloaded = new Set()

/** Preload image URLs once (shared by every project slider). */
export function preloadImages(urls) {
  if (!urls?.length) return

  for (const src of urls) {
    if (!src || preloaded.has(src)) continue
    preloaded.add(src)
    const img = new Image()
    img.decoding = 'async'
    img.src = src
  }
}

export function isImagePreloaded(src) {
  return preloaded.has(src)
}
