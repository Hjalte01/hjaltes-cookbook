import { useState } from 'react'

interface Props {
  path: string
  alt: string
  fallbackLabel: string
  className?: string
}

export function RecipeImage({ path, alt, fallbackLabel, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${path}`

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={`${alt}. ${fallbackLabel}.`}>
        <span aria-hidden="true">🍽️</span>
        <small>{fallbackLabel}</small>
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />
}
