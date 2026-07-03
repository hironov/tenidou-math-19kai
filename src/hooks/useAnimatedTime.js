import { useEffect, useRef, useState } from 'react'

// スライダーで操作できる「経過時間」を、再生ボタンで自動的に進めるためのフック。
export function useAnimatedTime(tMax, { loop = false, initialRate = 1 } = {}) {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [rate, setRate] = useState(initialRate)
  const rafRef = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => {
    if (!playing) {
      lastRef.current = null
      return
    }
    const step = (now) => {
      if (lastRef.current == null) lastRef.current = now
      const dt = (now - lastRef.current) / 1000
      lastRef.current = now
      setT((prev) => {
        let next = prev + dt * rate
        if (next >= tMax) {
          if (loop) {
            next = next % tMax
          } else {
            next = tMax
            setPlaying(false)
          }
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, rate, tMax, loop])

  return { t, setT, playing, setPlaying, rate, setRate }
}
