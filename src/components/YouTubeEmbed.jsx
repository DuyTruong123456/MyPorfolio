import { getYouTubeVideoId } from '../utils/youtube'

export default function YouTubeEmbed({ url, title = 'YouTube video' }) {
  const videoId = getYouTubeVideoId(url)

  if (!videoId) return null

  return (
    <div className="youtube-embed">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
