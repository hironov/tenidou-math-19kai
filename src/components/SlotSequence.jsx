import { useState } from 'react'

// n個のスロットに、決まった個数だけある色（記号）を割りあてるウィジェット。
// colors: [{ key, label, count, swatch }]
export function SlotSequence({ slotCount, colors, width }) {
  const [assign, setAssign] = useState(Array(slotCount).fill(null))

  const usedCount = (key) => assign.filter((a) => a === key).length
  const remaining = (key) => (colors.find((c) => c.key === key)?.count ?? 0) - usedCount(key)

  const cycle = (i) => {
    setAssign((prev) => {
      const next = [...prev]
      const cur = next[i]
      const order = [null, ...colors.map((c) => c.key)]
      let idx = order.indexOf(cur)
      for (let step = 1; step <= order.length; step++) {
        const cand = order[(idx + step) % order.length]
        if (cand === null) { next[i] = null; return next }
        const used = next.filter((a, j) => j !== i && a === cand).length
        const cap = colors.find((c) => c.key === cand)?.count ?? 0
        if (used < cap) { next[i] = cand; return next }
      }
      return next
    })
  }

  const filled = assign.every((a) => a !== null)

  return (
    <div>
      <div className="combo-items" style={{ maxWidth: width }}>
        {assign.map((a, i) => {
          const c = colors.find((cc) => cc.key === a)
          return (
            <button key={i} className="slot-box" style={{ background: c?.swatch ?? '#fff', borderColor: '#4a5568', color: c?.key === 'black' ? 'white' : '#1a202c' }} onClick={() => cycle(i)}>
              {i + 1}
            </button>
          )
        })}
      </div>
      <p className="readout" style={{ marginTop: 8 }}>
        {colors.map((c) => (
          <span key={c.key} style={{ marginRight: 12 }}>
            <span className="swatch-dot" style={{ background: c.swatch }} /> {c.label}：残り{remaining(c.key)}個
          </span>
        ))}
      </p>
      {filled && <p className="combo-message">すべてのスロットが埋まりました！クリックすると色を変えられます。</p>}
    </div>
  )
}
