export default function WebPreview({ url, title = 'Website preview' }) {
  if (!url) return null

  return (
    <div className="web-preview">
      <iframe
        src={url}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="web-preview__bar">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn--outline"
        >
          Open site in new tab
        </a>
      </div>
    </div>
  )
}
