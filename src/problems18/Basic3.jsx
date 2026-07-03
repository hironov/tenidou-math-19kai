import { useMemo, useState } from 'react'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'
import { NumberTable } from '../components/NumberTable'

const PATTERN = [1, 2, 3]

function valueAt(n) {
  const row = Math.ceil(n / 3)
  const col = n - 3 * (row - 1)
  return 4 * (row - 1) + PATTERN[col - 1]
}
function rowColOf(n) {
  const row = Math.ceil(n / 3)
  const col = n - 3 * (row - 1)
  return { row, col }
}

export default function Basic3() {
  const [n, setN] = useState(26)
  const values = useMemo(() => Array.from({ length: 15 }, (_, i) => valueAt(i + 1)), [])
  const { row, col } = rowColOf(n)

  return (
    <div className="problem">
      <h2>基本問題3　4の倍数でない数の並び</h2>
      <div className="statement">
        <p className="setup">4の倍数でない1以上の整数を，下のように小さい方からならべます。</p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>1，2，3，5，6，7，9，10，11，13，14，……</p>
        <ol className="question-list">
          <li>26は左から何番目にありますか。</li>
          <li>左から29番目の整数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} highlightIndex={n <= 15 ? n - 1 : -1} />

      <div className="graph-block">
        <h3>表にすると（4の倍数ごとに区切る）</h3>
        <NumberTable rows={5} cols={3} rowLabel="段目" colLabel="列目"
          cell={(r, c) => ({ value: 4 * (r - 1) + PATTERN[c - 1] })}
          highlight={{ r: row, c: col }} />
      </div>

      <div className="readout"><p>Ｎ＝<b>{n}</b> 番目：<b>{valueAt(n)}</b>（{row}段目の{col}列目）</p></div>
      <NControl n={n} setN={setN} min={1} max={45} label="番目"
        jumps={[{ label: '(1) 26の位置 → 20番目', n: 20 }, { label: '(2) 29番目', n: 29 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>4の倍数ごとに区切って考えます。同じ列のたてにならぶ数字は，差が4の等差数列になっています。</p>
        <p>(1) 26＝2＋4×6より，7段目の2列目にあることがわかります。よって，3×6＋2＝<b>20(番目)</b>。</p>
        <p>(2) 29÷3＝9(段)あまり2(個)より，29番目の数は，10段目の2列目にあります。2列目だけに注目して，2＋4×(10－1)＝<b>38</b>。</p>
      </div>
    </div>
  )
}
