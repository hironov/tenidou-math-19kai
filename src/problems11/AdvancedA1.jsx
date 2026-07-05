import { useState } from 'react'

const PEOPLE = ['A', 'B', 'C', 'D', 'E']

export default function AdvancedA1() {
  const [order, setOrder] = useState([])

  const toggle = (p) => setOrder((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : prev.length >= 5 ? prev : [...prev, p]))
  const reset = () => setOrder([])

  const full = order.length === 5
  let valid = null
  if (full) {
    const idxA = order.indexOf('A')
    const idxB = order.indexOf('B')
    const idxC = order.indexOf('C')
    valid = Math.abs(idxA - idxB) !== 1 && Math.abs(idxB - idxC) !== 1
  }

  return (
    <div className="problem">
      <h2>応用問題A-1　となり合わない並び方</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃ，Ｄ，Ｅの5人が横1列にならびます。このとき，ＡとＢはとなり合わず，ＢとＣもとなり合わないようにします。左から並べる順にクリックしてみましょう。</p>
        <ol className="question-list">
          <li>Ｂが左はしになるような5人のならび方は何通りありますか。</li>
          <li>(1)の場合もふくめて，5人のならび方は全部で何通りありますか。</li>
        </ol>
      </div>

      <div className="combo-items">
        {PEOPLE.map((p) => <button key={p} className={`combo-item${order.includes(p) ? ' active' : ''}`} onClick={() => toggle(p)}>{p}</button>)}
      </div>
      <p className="readout">
        並び：<b>{order.join(' ') || '（未選択）'}</b>
        {full && <span className={valid ? 'combo-message' : ''} style={!valid ? { color: '#e53e3e' } : {}}>　{valid ? '条件を満たします！' : 'ＡＢまたはＢＣがとなり合っています'}</span>}
      </p>
      <button className="jump-btn" onClick={reset}>やり直す</button>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ｂ□■■■ という並び方になりますが，□にはＡとＣが来ることができません。よって，□■■■の並び方は，2×3×2×1＝<b>12(通り)</b></p>
        <p>
          (2) □Ｂ□■■ という並び方になるとき，□にはＡとＣが来ることができません。よって，□□■■の並び方は，2×1×2×1＝4(通り)。■□Ｂ□■，■■□Ｂ□のときも，上記同様でそれぞれ4通り。
          ■■■□Ｂ のとき，(1)と同様で12通り。以上より，12×2＋4×3＝<b>36(通り)</b>
        </p>
      </div>
    </div>
  )
}
