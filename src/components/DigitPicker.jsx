import { useState } from 'react'

// カード（数字）から pickCount 枚を選び、できる整数とその倍数判定を確認できるウィジェット。
// cards: [{ id, value }]（同じ数字が複数枚あってもよい）
export function DigitPicker({ cards, pickCount, checkFn, checkLabel }) {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= pickCount) return prev
      return [...prev, id]
    })
  }

  const chosen = selected.map((id) => cards.find((c) => c.id === id))
  const full = chosen.length === pickCount

  function permute(arr) {
    if (arr.length <= 1) return [arr]
    const out = []
    arr.forEach((item, i) => {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
      permute(rest).forEach((p) => out.push([item, ...p]))
    })
    return out
  }

  let numbers = []
  if (full) {
    const seen = new Set()
    for (const perm of permute(chosen)) {
      if (perm[0].value === 0) continue
      const num = perm.map((c) => c.value).join('')
      if (!seen.has(num)) { seen.add(num); numbers.push(num) }
    }
  }

  return (
    <div>
      <div className="combo-items">
        {cards.map((c) => (
          <button key={c.id} className={`combo-item${selected.includes(c.id) ? ' active' : ''}`} onClick={() => toggle(c.id)}>
            {c.value}
          </button>
        ))}
      </div>
      <p className="readout" style={{ marginTop: 8 }}>
        {full ? `作れる整数：${numbers.join('，')}` : `カードを${pickCount}枚選んでください（${selected.length}/${pickCount}）`}
      </p>
      {full && checkFn && (
        <p className={`combo-message`}>{checkLabel}：{numbers.filter((n) => checkFn(n)).length > 0 ? `条件を満たす整数があります（${numbers.filter((n) => checkFn(n)).join('，')}）` : '条件を満たす整数はありません'}</p>
      )}
    </div>
  )
}
