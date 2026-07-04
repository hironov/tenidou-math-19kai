import { useState } from 'react'

// items から pickCount 個をクリックで選び、組み合わせをいくつ見つけられるか試せるウィジェット。
// 同じ組み合わせ（順番違い）は重複としてカウントしない。
export function ComboPicker({ items, pickCount, totalLabel }) {
  const [selected, setSelected] = useState([])
  const [found, setFound] = useState([])
  const [message, setMessage] = useState('')

  const toggle = (id) => {
    setMessage('')
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= pickCount) return prev
      return [...prev, id]
    })
  }

  const confirm = () => {
    const key = [...selected].sort().join(',')
    if (found.some((f) => f.key === key)) {
      setMessage('その組み合わせはすでに見つけています。')
    } else {
      const labels = selected.map((id) => items.find((it) => it.id === id)?.label ?? id)
      setFound((prev) => [...prev, { key, labels }])
      setMessage('新しい組み合わせを見つけました！')
    }
    setSelected([])
  }

  return (
    <div className="combo-picker">
      <div className="combo-items">
        {items.map((it) => (
          <button
            key={it.id}
            className={`combo-item${selected.includes(it.id) ? ' active' : ''}`}
            onClick={() => toggle(it.id)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="combo-controls">
        <span>{selected.length} / {pickCount} 個選択中</span>
        <button className="jump-btn" disabled={selected.length !== pickCount} onClick={confirm}>この組み合わせで決定</button>
        {message && <span className="combo-message">{message}</span>}
      </div>
      <div className="combo-found">
        <p>見つけた組み合わせ：{found.length}{totalLabel ? ` / ${totalLabel}` : ''}</p>
        <div className="combo-found-list">
          {found.map((f, i) => (
            <span key={f.key} className="combo-found-item">{i + 1}. {f.labels.join('・')}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
