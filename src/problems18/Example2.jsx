import { useMemo, useState } from 'react'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'
import { NumberTable } from '../components/NumberTable'

function valueAt(n) {
  const row = Math.ceil(n / 2)
  const col = n - 2 * (row - 1)
  return 3 * (row - 1) + col
}
function rowColOf(n) {
  const row = Math.ceil(n / 2)
  const col = n - 2 * (row - 1)
  return { row, col }
}

export default function Example2() {
  const [n, setN] = useState(45)
  const values = useMemo(() => Array.from({ length: 16 }, (_, i) => valueAt(i + 1)), [])
  const value = valueAt(n)
  const { row, col } = rowColOf(n)

  return (
    <div className="problem">
      <h2>例題2　3の倍数でない数の並び（倍数がらみの数列）</h2>
      <div className="statement">
        <p className="setup">
          3の倍数でない1以上の整数を，下のように小さい方からならべます。
        </p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>1，2，4，5，7，8，10，11，13，……</p>
        <ol className="question-list">
          <li>左から45番目の整数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} highlightIndex={n <= 16 ? n - 1 : -1} />

      <div className="graph-block">
        <h3>表にすると（3の倍数ごとに区切る）</h3>
        <NumberTable rows={8} cols={2} rowLabel="段目" colLabel="列目"
          cell={(r, c) => ({ value: 3 * (r - 1) + c })}
          highlight={{ r: row, c: col }}
        />
      </div>

      <div className="readout">
        <p>Ｎ＝<b>{n}</b> 番目の整数：<b>{value}</b>（{row}段目の{col}列目）</p>
      </div>

      <NControl n={n} setN={setN} min={1} max={80} label="番目"
        jumps={[{ label: '45番目（答え）', n: 45 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          倍数に関する数列は，倍数（公倍数）ごとに区切り，表にして考えます（今回は3の倍数ごと）。
          同じ列をたてに見ると，どちらも3ずつ増える等差数列になっています。
        </p>
        <p>
          45÷2＝22(段)あまり1(個)より，45番目の数は，23段目の1列目にあります。
          つまり，「1列目の上から23個目の数」を求めればよいので，1＋3×(23－1)＝<b>67</b>です。
        </p>
      </div>
    </div>
  )
}
