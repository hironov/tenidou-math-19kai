import { useState } from 'react'
import { PointsFigure } from '../components/PointsFigure'

const R = 80
const CX = 150
const CY = 110
const LABELS = ['A', 'B', 'C', 'D', 'E', 'F']
const POINTS = LABELS.map((label, i) => {
  const angle = (-90 + i * 60) * (Math.PI / 180)
  return { id: label, x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle), label }
})

const CASES = [
  { key: '2', label: '(1) 2個選んで直線', pick: 2, total: '15本' },
  { key: '3', label: '(2) 3個選んで三角形', pick: 3, total: '20個' },
  { key: '4', label: '(3) 4個選んで四角形', pick: 4, total: '15個' },
]

export default function Basic3() {
  const [caseKey, setCaseKey] = useState('2')
  const c = CASES.find((x) => x.key === caseKey)

  return (
    <div className="problem">
      <h2>基本問題3　円周上の点でつくる図形</h2>
      <div className="statement">
        <p className="setup">円周上に6個の点Ａ～Ｆをとります。</p>
        <ol className="question-list">
          <li>6個の点から2個の点を選んで直線を引きます。直線は何本引けますか。</li>
          <li>6個の点から3個の点を選んで三角形を作ります。三角形は何個作れますか。</li>
          <li>6個の点から4個の点を選んで四角形を作ります。四角形は何個作れますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        {CASES.map((cc) => (
          <button key={cc.key} className={`jump-btn${cc.key === caseKey ? ' active' : ''}`} onClick={() => setCaseKey(cc.key)}>{cc.label}</button>
        ))}
      </div>
      <PointsFigure key={c.key} points={POINTS} pickCount={c.pick} isCollinear={() => false} width={300} height={220} />
      <p className="readout">全部で <b>{c.total}</b></p>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) <sub>6</sub>C<sub>2</sub>＝6×5÷(2×1)＝<b>15(本)</b></p>
        <p>(2) <sub>6</sub>C<sub>3</sub>＝6×5×4÷(3×2×1)＝<b>20(個)</b></p>
        <p>(3) <sub>6</sub>C<sub>4</sub>＝6×5×4×3÷(4×3×2×1)＝<b>15(個)</b>（余事象より，<sub>6</sub>C<sub>4</sub>＝<sub>6</sub>C<sub>2</sub>）</p>
      </div>
    </div>
  )
}
