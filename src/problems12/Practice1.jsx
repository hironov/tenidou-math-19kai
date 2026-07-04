import { useState } from 'react'
import { ComboPicker } from '../components/ComboPicker'

const BOYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => ({ id: l, label: l }))
const GIRLS = ['P', 'Q', 'R', 'S'].map((l) => ({ id: l, label: l }))
const ALL11 = [...BOYS.map((b) => b.label), ...GIRLS.map((g) => g.label)]

export default function Practice1() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'
  const [conductor, setConductor] = useState(null)

  return (
    <div className="problem">
      <h2>練習問題1　音楽係と役割分担</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆ，Ｇの7人の男子とＰ，Ｑ，Ｒ，Ｓの4人の女子がいます。</p>
        <ol className="question-list">
          <li>男子から3人，女子から2人の合計5人を音楽係として選ぶ方法は何通りありますか。</li>
          <li>この11人を，指揮者1人，リコーダー担当8人，ハーモニカ担当2人に分けるとき，分け方は何通りありますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('1')}>(1) 音楽係5人</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('2')}>(2) 役割分担</button>
      </div>

      {isCase1 ? (
        <div className="stage">
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: 6 }}>男子から3人</p>
            <ComboPicker key="boys" items={BOYS} pickCount={3} totalLabel="35通り" />
          </div>
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: 6 }}>女子から2人</p>
            <ComboPicker key="girls" items={GIRLS} pickCount={2} totalLabel="6通り" />
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>まず指揮者を1人クリック</p>
          <div className="combo-items">
            {ALL11.map((n) => (
              <button key={n} className={`combo-item${conductor === n ? ' active' : ''}`} onClick={() => setConductor(n)}>{n}</button>
            ))}
          </div>
          {conductor && (
            <>
              <p style={{ fontWeight: 'bold', margin: '12px 0 6px' }}>残り10人からハーモニカ担当2人を選ぶ</p>
              <ComboPicker key={conductor} items={ALL11.filter((n) => n !== conductor).map((n) => ({ id: n, label: n }))} pickCount={2} totalLabel="45通り" />
            </>
          )}
        </div>
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 男子<sub>7</sub>C<sub>3</sub>×女子<sub>4</sub>C<sub>2</sub>＝(7×6×5÷(3×2×1))×(4×3÷(2×1))＝35×6＝<b>210(通り)</b></p>
        <p>
          (2) 玉をならべるのと同じ方法で考えることができます。指揮者…<sub>11</sub>C<sub>1</sub>＝11(通り)。ハーモニカ担当…残り10人から選ぶので，<sub>10</sub>C<sub>2</sub>＝45(通り)。
          残った8人は自動的にリコーダーと決まるので，考える必要はありません。よって，11×45＝<b>495(通り)</b>
        </p>
      </div>
    </div>
  )
}
