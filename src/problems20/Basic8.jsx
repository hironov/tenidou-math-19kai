import { SequenceStrip } from '../components/SequenceStrip'
import { FractionText } from '../components/FractionText'

function buildSequence(groups) {
  const values = []
  const groupOfIdx = []
  for (let g = 1; g <= groups; g++) {
    for (let p = 1; p <= g; p++) {
      values.push(<FractionText num={p} den={g} />)
      groupOfIdx.push(g)
    }
  }
  return { values, groupOfIdx }
}

const { values, groupOfIdx } = buildSequence(8)

export default function Basic8() {
  return (
    <div className="problem">
      <h2>基本問題8　分数のグループ数列</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，下のように数をならべます。1，1/2，1，1/3，2/3，1，1/4，1/2，3/4，1，1/5，2/5，3/5，4/5，1，1/6，1/3，……
        </p>
        <ol className="question-list">
          <li>1が8回目にあらわれるのは，左から何番目ですか。</li>
          <li>左から70番目の数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} groupOf={(i) => groupOfIdx[i]} highlightIndex={35} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          分母がkのグループにはk個の数がならんでいる、というようにグループ分けします。たとえば，第3グループは分母が3で，3個の数がならんでいます。
        </p>
        <p>(1) 8回目にあらわれる1は，8グループの8番目の数なので，1＋2＋3＋……＋8＝(1＋8)×8÷2＝<b>36(番目)</b></p>
        <p>(2) 1＋2＋3＋……＋11＝66 より，70番目の数は，第12グループの4番目の数 → 4/12＝<b>1/3</b></p>
      </div>
    </div>
  )
}
