import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { preloadImages } from '../utils/imagePreload'

const SLIDE_MS = 550

export default function ImageSlider({
  images,
  title = 'Project screenshots',
  autoSlide = false,
  interval = 4000,
}) {
  const imageCount = images?.length ?? 0
  const [trackIndex, setTrackIndex] = useState(() =>
    (images?.length ?? 0) <= 1 ? 0 : 1,
  )
  const [paused, setPaused] = useState(false)
  const [instant, setInstant] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  const slides = useMemo(() => {
    if (!imageCount) return []
    if (imageCount === 1) return images
    return [images[imageCount - 1], ...images, images[0]]
  }, [images, imageCount])

  useEffect(() => {
    preloadImages(images)
  }, [images])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) preloadImages(images)
      },
      { rootMargin: '240px 0px', threshold: 0.01 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [images])

  const goTo = useCallback(
    (nextRealIndex) => {
      if (imageCount <= 1) return
      setTrackIndex(nextRealIndex + 1)
    },
    [imageCount],
  )

  const goNext = useCallback(() => {
    if (imageCount <= 1) return
    setTrackIndex((current) => current + 1)
  }, [imageCount])

  const goPrev = useCallback(() => {
    if (imageCount <= 1) return
    setTrackIndex((current) => current - 1)
  }, [imageCount])

  useEffect(() => {
    if (imageCount <= 1) return undefined

    const rafId = requestAnimationFrame(() => {
      setTrackIndex(1)
      setInstant(false)
    })
    return () => cancelAnimationFrame(rafId)
  }, [images, imageCount])

  useEffect(() => {
    if (!autoSlide || imageCount <= 1 || paused || !inView) return undefined

    const timer = setInterval(goNext, interval)
    return () => clearInterval(timer)
  }, [autoSlide, imageCount, interval, paused, inView, goNext])

  if (!imageCount) return null

  const activeIndex =
    imageCount === 1 ? 0 : (trackIndex - 1 + imageCount) % imageCount

  const offsetPercent =
    slides.length > 0 ? (trackIndex * 100) / slides.length : 0

  const onTransitionEnd = (event) => {
    if (event.target !== trackRef.current) return
    if (event.propertyName !== 'transform') return
    if (imageCount <= 1) return

    if (trackIndex === imageCount + 1) {
      setInstant(true)
      setTrackIndex(1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstant(false))
      })
    } else if (trackIndex === 0) {
      setInstant(true)
      setTrackIndex(imageCount)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstant(false))
      })
    }
  }

  return (
    <div
      ref={rootRef}
      className={`image-slider ${autoSlide ? 'image-slider--auto' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="image-slider__viewport">
        <div
          ref={trackRef}
          className={`image-slider__track ${instant ? 'image-slider__track--instant' : ''}`}
          style={{
            width: `${slides.length * 100}%`,
            transform: `translate3d(-${offsetPercent}%, 0, 0)`,
            transitionDuration: instant ? '0ms' : `${SLIDE_MS}ms`,
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((src, i) => {
            const isActiveSlide = imageCount === 1 || i === trackIndex
            return (
              <div
                className="image-slider__slide"
                key={`${src}-${i}`}
                style={{ flex: `0 0 ${100 / slides.length}%` }}
                aria-hidden={imageCount > 1 ? !isActiveSlide : false}
              >
                <img
                  src={src}
                  alt={`${title} — screenshot ${((i - 1 + imageCount) % imageCount) + 1} of ${imageCount}`}
                  className="image-slider__img"
                  loading="eager"
                  decoding="async"
                  fetchPriority={isActiveSlide && inView ? 'high' : 'auto'}
                  draggable={false}
                />
              </div>
            )
          })}
        </div>
        {imageCount > 1 && (
          <>
            <button
              type="button"
              className="image-slider__nav image-slider__nav--prev"
              onClick={goPrev}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              type="button"
              className="image-slider__nav image-slider__nav--next"
              onClick={goNext}
              aria-label="Next screenshot"
            >
              ›
            </button>
          </>
        )}
      </div>
      {imageCount > 1 && (
        <div
          className="image-slider__dots"
          role="tablist"
          aria-label={`${title} screenshots`}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Screenshot ${i + 1}`}
              className={`image-slider__dot ${i === activeIndex ? 'image-slider__dot--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
