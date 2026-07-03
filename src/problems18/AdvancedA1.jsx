import { useMemo, useState } from 'react'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'
import { NumberTable } from '../components/NumberTable'

const PATTERN = [3, 4, 6, 8, 9, 12]

function valueAt(n) {
  const row = Math.ceil(n / 6)
  const col = n - 6 * (row - 1)
  return 12 * (row - 1) + PATTERN[col - 1]
}
function rowColOf(n) {
  const row = Math.ceil(n / 6)
  const col = n - 6 * (row - 1)
  return { row, col }
}
function sumUpTo(n) {
  let total = 0
  for (let i = 1; i <= n; i++) total += valueAt(i)
  return total
}

export default function AdvancedA1() {
  const [n, setN] = useState(113)
  const values = useMemo(() => Array.from({ length: 18 }, (_, i) => valueAt(i + 1)), [])
  const { row, col } = rowColOf(Math.min(n, 60))

  return (
    <div className="problem">
      <h2>応用問題A-1　3の倍数または4の倍数の並び</h2>
      <div className="statement">
        <p className="setup">3の倍数または4の倍数である整数を，下のように小さい方からならべます。</p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>3，4，6，8，9，12，15，16，……</p>
        <ol className="question-list">
          <li>左から113番目の整数はいくつですか。</li>
          <li>左から順に200番目の整数まで加えると，その和はいくつになりますか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} highlightIndex={n <= 18 ? n - 1 : -1} />

      <div className="graph-block">
        <h3>表にすると（12の倍数ごとに区切る）</h3>
        <NumberTable rows={5} cols={6} rowLabel="段目" colLabel="列目"
          cell={(r, c) => ({ value: 12 * (r - 1) + PATTERN[c - 1] })}
          highlight={n <= 60 ? { r: row, c: col } : null} />
      </div>

      <div className="readout"><p>Ｎ＝<b>{n}</b> 番目：<b>{valueAt(n)}</b>（{n <= 60 ? `${row}段目の${col}列目` : ''}）</p></div>
      <NControl n={n} setN={setN} min={1} max={210} label="番目"
        jumps={[{ label: '(1) 113番目', n: 113 }, { label: '(2) 200番目までの和', n: 200 }]} />
      {n >= 190 && <p className="readout">1番目から{n}番目までの和：<b>{sumUpTo(n)}</b></p>}

      <div className="explain">
        <h3>解説</h3>
        <p>3と4の最小公倍数である12の倍数ごとに区切って考えます。</p>
        <p>(1) 113÷6＝18(段)あまり5(個)より，19段目の5列目を求めます。9＋12×(19－1)＝<b>225</b>。</p>
        <p>
          (2) 1段の和は42で，1段下がるごとに42＋12×6＝72ずつ増える等差数列です。200÷6＝33(段)あまり2(個)より，
          33段目までの和は39402，34段目の2個(399,400)を足して，<b>40201</b>。
        </p>
      </div>
    </div>
  )
}
