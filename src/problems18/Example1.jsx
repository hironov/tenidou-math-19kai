import { useMemo, useState } from 'react'
import { triangular } from '../utils/sequence'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'

function valueAt(n) {
  return 1 + triangular(n - 1)
}

export default function Example1() {
  const [n, setN] = useState(15)
  const values = useMemo(() => Array.from({ length: 20 }, (_, i) => valueAt(i + 1)), [])
  const value = valueAt(n)

  return (
    <div className="problem">
      <h2>例題1　階差数列</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，下のように数をならべます。
        </p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>1，2，4，7，11，16，……</p>
        <ol className="question-list">
          <li>左から15番目の数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} highlightIndex={n - 1} showDiff />

      <div className="readout">
        <p>Ｎ＝<b>{n}</b> 番目の数：<b>{value}</b></p>
      </div>

      <NControl n={n} setN={setN} min={1} max={30} label="番目"
        jumps={[{ label: '15番目（答え）', n: 15 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          差が1，2，3，4，5，……と増えていく「階差数列」です。15番目までに間は15－1＝14(個)あるので，
          1＋(1＋2＋3＋……＋14)＝1＋(1＋14)×14÷2＝<b>106</b>です。
        </p>
        <p>階差数列はかなり難しいので、30個程度までなら書き出してしまって構いません。上のスライダーでNを変えて確認してみましょう。</p>
      </div>
    </div>
  )
}
