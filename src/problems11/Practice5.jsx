import { useState } from 'react'

const HANDS = ['グー', 'チョキ', 'パー']
const BEATS = { 'グー': 'チョキ', 'チョキ': 'パー', 'パー': 'グー' }

export default function Practice5() {
  const [hands, setHands] = useState({ A: 'グー', B: 'グー', C: 'グー', D: 'グー' })

  const cycle = (who) => setHands((prev) => ({ ...prev, [who]: HANDS[(HANDS.indexOf(prev[who]) + 1) % 3] }))

  const used = new Set(Object.values(hands))
  const isAiko = used.size === 1 || used.size === 3
  let winners = []
  if (!isAiko) {
    const [h1, h2] = [...used]
    const winHand = BEATS[h1] === h2 ? h1 : h2
    winners = Object.entries(hands).filter(([, h]) => h === winHand).map(([k]) => k)
  }

  return (
    <div className="problem">
      <h2>練習問題5　4人でジャンケン</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃ，Ｄの4人でジャンケンを1回します。ただし，あいこでも1回と考えます。手をクリックして切りかえてみましょう。</p>
        <ol className="question-list">
          <li>4人のグー，チョキ，パーの出し方は何通りありますか。</li>
          <li>Ａの出した手とＢの出した手は同じで，ジャンケンの結果はあいこでした。このような4人のグー，チョキ，パーの出し方は何通りありますか。</li>
        </ol>
      </div>

      <div className="combo-items">
        {Object.entries(hands).map(([who, h]) => (
          <button key={who} className="combo-item active" onClick={() => cycle(who)}>{who}：{h}</button>
        ))}
      </div>
      <p className="readout">
        結果：{isAiko ? <b>あいこ</b> : <>勝者：<b>{winners.join('，')}</b>（{hands[winners[0]]}）</>}
        {hands.A === hands.B && isAiko && <span className="combo-message">　（ＡとＢが同じ手であいこ）</span>}
      </p>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 手の出し方は4人とも3通りずつあります。3×3×3×3＝<b>81(通り)</b></p>
        <p>
          (2) あいことなるのは，全員が同じ手を出すか，グー，チョキ，パーの3つの手がすべてそろうときです。全員が同じ手を出す…3通り。3つの手がすべてそろう…3×2×1＝6通り。以上より，3＋6＝<b>9(通り)</b>
        </p>
      </div>
    </div>
  )
}
