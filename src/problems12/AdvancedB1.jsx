import { useState } from 'react'

const STICKS = { 1: 2, 2: 5, 3: 5, 4: 4, 5: 5, 6: 6, 7: 3, 8: 7, 9: 6 }

// 7セグメント表示の各棒（線分）の座標（24×40の枠内）
const SEGMENTS = {
  top: 'M3 3 H21',
  topLeft: 'M3 3 V20',
  topRight: 'M21 3 V20',
  middle: 'M3 20 H21',
  bottomLeft: 'M3 20 V37',
  bottomRight: 'M21 20 V37',
  bottom: 'M3 37 H21',
}

// 数字1～9を作るのに使う棒（原本の図に対応）
const DIGIT_SEGMENTS = {
  1: ['topRight', 'bottomRight'],
  2: ['top', 'topRight', 'middle', 'bottomLeft', 'bottom'],
  3: ['top', 'topRight', 'middle', 'bottomRight', 'bottom'],
  4: ['topLeft', 'topRight', 'middle', 'bottomRight'],
  5: ['top', 'topLeft', 'middle', 'bottomRight', 'bottom'],
  6: ['top', 'topLeft', 'middle', 'bottomLeft', 'bottomRight', 'bottom'],
  7: ['top', 'topRight', 'bottomRight'],
  8: ['top', 'topLeft', 'topRight', 'middle', 'bottomLeft', 'bottomRight', 'bottom'],
  9: ['top', 'topLeft', 'topRight', 'middle', 'bottomRight', 'bottom'],
}

function SevenSegmentDigit({ d }) {
  const lit = DIGIT_SEGMENTS[d]
  return (
    <svg width={30} height={46} viewBox="0 0 24 40">
      {Object.entries(SEGMENTS).map(([key, path]) => (
        <path key={key} d={path} stroke={lit.includes(key) ? '#3182ce' : '#e2e8f0'} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      ))}
    </svg>
  )
}

export default function AdvancedB1() {
  const [seq, setSeq] = useState([])

  const canAdd = (d) => seq.filter((x) => x === d).length < 2
  const add = (d) => { if (canAdd(d)) setSeq((prev) => [...prev, d]) }
  const removeLast = () => setSeq((prev) => prev.slice(0, -1))
  const clear = () => setSeq([])

  const total = seq.reduce((s, d) => s + STICKS[d], 0)

  return (
    <div className="problem">
      <h2>応用問題B-1　棒の本数で作る整数</h2>
      <div className="statement">
        <p className="setup">
          棒を使って，0をのぞく1～9の数字を作り，これらを組み合わせて整数を作ります。「2」を作るには棒を5本使います。同じ数字は2度まで作ってよいものとします。
        </p>
        <div className="tank-view" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', padding: '10px 6px' }}>
          {Object.keys(STICKS).map((d) => (
            <div key={d} style={{ textAlign: 'center' }}>
              <SevenSegmentDigit d={Number(d)} />
              <div style={{ fontSize: 12, marginTop: 2 }}>{d}：{STICKS[d]}本</div>
            </div>
          ))}
        </div>
        <ol className="question-list">
          <li>10本の棒をすべて使って作ることができる2けたの整数は何個ありますか。</li>
          <li>10本の棒をすべて使って作ることができる整数は，(1)もふくめて，全部で何個ありますか。</li>
        </ol>
      </div>

      <p className="readout">
        棒の本数：{Object.entries(STICKS).map(([d, n]) => <span key={d} style={{ marginRight: 10 }}>{d}→{n}本</span>)}
      </p>

      <h3>数字をクリックして整数を組み立てる（同じ数字は2回まで）</h3>
      <div className="combo-items">
        {Object.keys(STICKS).map((d) => (
          <button key={d} className="combo-item" disabled={!canAdd(Number(d))} onClick={() => add(Number(d))}>{d}</button>
        ))}
      </div>
      <div className="readout" style={{ marginTop: 10 }}>
        <p>作っている数：<b>{seq.join('') || '（未選択）'}</b>　使った棒の合計：<b>{total}</b>本{total === 10 && seq.length > 0 && <span className="combo-message"> ちょうど10本です！</span>}</p>
        <button className="jump-btn" onClick={removeLast}>1つ戻す</button>{' '}
        <button className="jump-btn" onClick={clear}>クリア</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) まず，使う棒の本数で分類します。2本…1，3本…7，4本…4，5本…2・3・5，6本…6・9，7本…8。10本使うには，(3本，7本)→78，87の2通り。
          (4本，6本)→46，64，49，94の4通り。(5本，5本)→2・3・5をならべかえて，3×3＝9通り。以上より，2＋4＋9＝<b>15(個)</b>
        </p>
        <p>
          (2) 1けたの数で10本使うことはできません。3けたの数を作るとき，(2本，2本，6本)→116，119のならべかえ…6通り。(2本，3本，5本)→172，173，175のならべかえ…18通り。
          (2本，4本，4本)→144のならべかえ…3通り。(3本，3本，4本)→774のならべかえ…3通り。4けたの数を作るとき，(2本，2本，3本，3本)→1177のならべかえ…<sub>4</sub>C<sub>2</sub>＝6通り。
          5けた以上を作ることはできません。以上より，15＋6＋18＋3＋3＋6＝<b>51(個)</b>
        </p>
      </div>
    </div>
  )
}
