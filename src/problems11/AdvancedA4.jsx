import { useState } from 'react'

const HANDS = ['グー', 'チョキ', 'パー']
const BEATS = { 'グー': 'チョキ', 'チョキ': 'パー', 'パー': 'グー' }

function judge(hands) {
  const used = new Set(Object.values(hands))
  if (used.size === 1 || used.size === 3) return { aiko: true, winners: Object.keys(hands) }
  const [h1, h2] = [...used]
  const winHand = BEATS[h1] === h2 ? h1 : h2
  const winners = Object.entries(hands).filter(([, h]) => h === winHand).map(([k]) => k)
  return { aiko: false, winners }
}

export default function AdvancedA4() {
  const [round1, setRound1] = useState({ A: 'グー', B: 'グー', C: 'グー' })
  const [round2, setRound2] = useState({})

  const cycle = (setFn, who) => setFn((prev) => ({ ...prev, [who]: HANDS[(HANDS.indexOf(prev[who]) + 1) % 3] }))

  const r1 = judge(round1)
  const r1TwoLeft = !r1.aiko && r1.winners.length === 2

  return (
    <div className="problem">
      <h2>応用問題A-4　3人でのジャンケン（勝ち残り）</h2>
      <div className="statement">
        <p className="setup">
          Ａ，Ｂ，Ｃの3人でジャンケンをします。あいこも1回とかぞえ，1人が勝ち残るまでジャンケンを続けます。
        </p>
        <ol className="question-list">
          <li>1回目のジャンケンで1人が負けて2人が勝ち残り，2回目のジャンケンで1人が勝ち残るような3人のグー，チョキ，パーの出し方は何通りありますか。</li>
          <li>2回以下のジャンケンで1人が勝ち残るような3人のグー，チョキ，パーの出し方は，(1)の場合もふくめて，全部で何通りありますか。</li>
        </ol>
      </div>

      <h3>1回目</h3>
      <div className="combo-items">
        {Object.entries(round1).map(([who, h]) => <button key={who} className="combo-item active" onClick={() => cycle(setRound1, who)}>{who}：{h}</button>)}
      </div>
      <p className="readout">結果：{r1.aiko ? 'あいこ（全員で2回目へ）' : `${r1.winners.length === 1 ? `${r1.winners[0]}が勝ち残り、1回で終了` : `${r1.winners.join('・')}が勝ち残り、2回目へ`}`}</p>

      {r1TwoLeft && (
        <>
          <h3>2回目（{r1.winners.join('・')}の2人）</h3>
          <div className="combo-items">
            {r1.winners.map((who) => (
              <button key={who} className="combo-item active" onClick={() => setRound2((prev) => ({ ...prev, [who]: HANDS[(HANDS.indexOf(prev[who] ?? 'グー') + 1) % 3] }))}>
                {who}：{round2[who] ?? 'グー'}
              </button>
            ))}
          </div>
          {round2[r1.winners[0]] && round2[r1.winners[1]] && (
            <p className="readout">
              {round2[r1.winners[0]] === round2[r1.winners[1]] ? 'あいこ（決着つかず）' : `勝者：${BEATS[round2[r1.winners[0]]] === round2[r1.winners[1]] ? r1.winners[0] : r1.winners[1]}`}
            </p>
          )}
        </>
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 勝ち負けが決まる場合の（○，×）の組み合わせは，（グー，チョキ）（チョキ，パー）（パー，グー）の3通りあります。また，1回目で負けた人を決める方法は3通りあるので，1回戦の手の出し方は，3×3＝9(通り)です。
          同様に，2回目の手の出し方は，3×2＝6(通り)なので，これらを連続させて，9×6＝<b>54(通り)</b>
        </p>
        <p>
          (2) まず，1回目にあいこになる手の出し方を考えます。全員がちがう手を出す…3×2×1＝6(通り)。全員が同じ手を出す…3通り。より，6＋3＝9(通り)あります。
          1回目で1人が勝ち残る方法…3×3＝9(通り)。1回目で2人が勝ち残り，2回目に1人が勝ち残る方法…(1)より54通り。1回目であいこになり，2回目に1人が勝ち残る方法…9×9＝81(通り)。
          以上より，9＋54＋81＝<b>144(通り)</b>
        </p>
      </div>
    </div>
  )
}
