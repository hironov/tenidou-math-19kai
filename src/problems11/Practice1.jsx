import { useState } from 'react'

const PEOPLE = [
  { key: 'A', gender: 'm', swatch: '#63b3ed' }, { key: 'B', gender: 'm', swatch: '#4299e1' }, { key: 'C', gender: 'm', swatch: '#3182ce' },
  { key: 'D', gender: 'f', swatch: '#f6ad55' }, { key: 'E', gender: 'f', swatch: '#ed8936' },
]

export default function Practice1() {
  const [order, setOrder] = useState([])

  const toggle = (key) => {
    setOrder((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : prev.length >= 5 ? prev : [...prev, key]))
  }
  const reset = () => setOrder([])

  const full = order.length === 5
  const genders = order.map((k) => PEOPLE.find((p) => p.key === k).gender)
  const alternating = full && genders.every((g, i) => i === 0 || g !== genders[i - 1])
  let together = false
  if (full) {
    const fIdx = genders.map((g, i) => (g === 'f' ? i : -1)).filter((i) => i >= 0)
    together = fIdx.length === 2 && fIdx[1] - fIdx[0] === 1
  }

  return (
    <div className="problem">
      <h2>練習問題1　リレーの順番</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃの3人の男子と，Ｄ，Ｅの2人の女子がいます。この5人でリレーの順番を決めます。順番をクリックして決めてみましょう。</p>
        <ol className="question-list">
          <li>男女が交互になるようなリレーの順番は何通りありますか。</li>
          <li>2人の女子が続けて走るようなリレーの順番は何通りありますか。</li>
        </ol>
      </div>

      <p style={{ fontWeight: 'bold', marginBottom: 4 }}>走る順にクリック（男子＝青系，女子＝オレンジ系）</p>
      <div className="combo-items">
        {PEOPLE.map((p) => (
          <button key={p.key} className={`combo-item${order.includes(p.key) ? ' active' : ''}`} style={order.includes(p.key) ? { background: p.swatch, borderColor: p.swatch } : {}} onClick={() => toggle(p.key)}>{p.key}</button>
        ))}
      </div>
      <p className="readout">
        順番：<b>{order.join(' → ') || '（未選択）'}</b>
        {full && <><br />交互：{alternating ? '○' : '×'}　女子が続けて走る：{together ? '○' : '×'}</>}
      </p>
      <button className="jump-btn" onClick={reset}>やり直す</button>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) (男1)(女1)(男2)(女2)(男3) 3×2×2×1×1＝<b>12(通り)</b></p>
        <p>(2) 2人の女子をまとめて1人（＝☆とします）として考えます。Ａ，Ｂ，Ｃ，☆の4人を並べますので，4×3×2×1＝24(通り)。また，女子の並び方が2通りあるので，24×2＝<b>48(通り)</b></p>
      </div>
    </div>
  )
}
