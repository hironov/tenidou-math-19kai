import { SequenceStrip } from '../components/SequenceStrip'
import { triangular } from '../utils/sequence'

const N = 24
const VALUES = [3]
for (let i = 1; i < N; i++) VALUES.push(VALUES[i - 1] + i)

export default function Basic7() {
  return (
    <div className="problem">
      <h2>基本問題7　階差数列</h2>
      <div className="statement">
        <p className="setup">あるきまりにしたがって，下のように数をならべます。3，4，6，9，13，18，……</p>
        <ol className="question-list">
          <li>左から24番目の数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={VALUES.slice(0, 8)} showDiff />

      <div className="explain">
        <h3>解説</h3>
        <p>差が1,2,3,4,5,……と増えていく階差数列です。24番目までに，間は23個ありますので，3＋(1＋2＋3＋……＋23)＝3＋(1＋23)×23÷2＝<b>{3 + triangular(23)}</b></p>
        <p>三角数(1＋2＋3＋4＋…)については，15番目程度までは覚えておくと便利です。1，3，6，10，15，21，28，36，45，55，66，78，91，105，120，…</p>
      </div>
    </div>
  )
}
