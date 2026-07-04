import { useState } from 'react'

const A_LINES = [{ key: 'ア', y: 30 }, { key: 'イ', y: 65 }, { key: 'ウ', y: 100 }, { key: 'エ', y: 135 }, { key: 'オ', y: 170 }]
const B_LINES = [{ key: 'カ', x: 60 }, { key: 'キ', x: 120 }, { key: 'ク', x: 180 }, { key: 'ケ', x: 240 }]
const X0 = 20
const X1 = 280
const Y0 = 15
const Y1 = 185

export default function Practice2() {
  const [selA, setSelA] = useState([])
  const [selB, setSelB] = useState([])

  const toggle = (setFn, arr, key) => {
    setFn(arr.includes(key) ? arr.filter((k) => k !== key) : arr.length >= 2 ? arr : [...arr, key])
  }

  const aSel = A_LINES.filter((l) => selA.includes(l.key))
  const bSel = B_LINES.filter((l) => selB.includes(l.key))
  const showRect = aSel.length === 2 && bSel.length === 2

  return (
    <div className="problem">
      <h2>練習問題2　平行線でできる平行四辺形</h2>
      <div className="statement">
        <p className="setup">
          5つの直線ア，イ，ウ，エ，オは互いに平行で，4つの直線カ，キ，ク，ケは互いに平行です。ア～オから2本，カ～ケから2本を選んで組み合わせることで，平行四辺形を作ることができます。それぞれ2本ずつクリックしてみましょう。
        </p>
      </div>

      <div className="jump-row">
        {A_LINES.map((l) => (
          <button key={l.key} className={`jump-btn${selA.includes(l.key) ? ' active' : ''}`} onClick={() => toggle(setSelA, selA, l.key)}>{l.key}</button>
        ))}
      </div>
      <div className="jump-row">
        {B_LINES.map((l) => (
          <button key={l.key} className={`jump-btn${selB.includes(l.key) ? ' active' : ''}`} onClick={() => toggle(setSelB, selB, l.key)}>{l.key}</button>
        ))}
      </div>

      <svg width={300} height={200} className="tank-view">
        {showRect && (
          <rect x={Math.min(bSel[0].x, bSel[1].x)} y={Math.min(aSel[0].y, aSel[1].y)}
            width={Math.abs(bSel[0].x - bSel[1].x)} height={Math.abs(aSel[0].y - aSel[1].y)}
            fill="#63b3ed" fillOpacity="0.5" stroke="#3182ce" strokeWidth="2" />
        )}
        {A_LINES.map((l) => (
          <g key={l.key}>
            <line x1={X0} y1={l.y} x2={X1} y2={l.y} stroke={selA.includes(l.key) ? '#e53e3e' : '#4a5568'} strokeWidth={selA.includes(l.key) ? 2.5 : 1.5} />
            <text x={4} y={l.y + 4} fontSize="11">{l.key}</text>
          </g>
        ))}
        {B_LINES.map((l) => (
          <g key={l.key}>
            <line x1={l.x} y1={Y0} x2={l.x} y2={Y1} stroke={selB.includes(l.key) ? '#e53e3e' : '#4a5568'} strokeWidth={selB.includes(l.key) ? 2.5 : 1.5} />
            <text x={l.x - 4} y={10} fontSize="11" textAnchor="middle">{l.key}</text>
          </g>
        ))}
      </svg>

      <div className="explain">
        <h3>解説</h3>
        <p>ア～オから2本，カ～ケから2本を選んで組み合わせることで，平行四辺形を作ることができます。<sub>5</sub>C<sub>2</sub>×<sub>4</sub>C<sub>2</sub>＝(5×4÷(2×1))×(4×3÷(2×1))＝10×6＝<b>60(個)</b></p>
      </div>
    </div>
  )
}
