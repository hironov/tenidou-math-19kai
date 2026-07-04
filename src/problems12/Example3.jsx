import { useState } from 'react'
import { ComboPicker } from '../components/ComboPicker'

const BOYS = ['A', 'B', 'C', 'D', 'E', 'F'].map((l) => ({ id: l, label: l }))
const GIRLS = ['P', 'Q', 'R'].map((l) => ({ id: l, label: l }))

export default function Example3() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'

  return (
    <div className="problem">
      <h2>例題3　男女に分けて選ぶ組み合わせ</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆの6人の男子とＰ，Ｑ，Ｒの3人の女子がいます。この中からそうじ当番を4人選びます。</p>
        <ol className="question-list">
          <li>男子だけから4人を選ぶ場合</li>
          <li>男子から3人，女子から1人を選ぶ場合</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('1')}>(1) 男子だけ4人</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('2')}>(2) 男子3人＋女子1人</button>
      </div>

      {isCase1 ? (
        <ComboPicker key="c1" items={BOYS} pickCount={4} totalLabel="15通り" />
      ) : (
        <div className="stage">
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: 6 }}>男子から3人</p>
            <ComboPicker key="boys" items={BOYS} pickCount={3} totalLabel="20通り" />
          </div>
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: 6 }}>女子から1人</p>
            <ComboPicker key="girls" items={GIRLS} pickCount={1} totalLabel="3通り" />
          </div>
        </div>
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 組み合わせの公式を活用します。<sub>6</sub>C<sub>4</sub>＝6×5×4×3÷(4×3×2×1)＝<b>15(通り)</b></p>
        <p>
          (2) 男子から3人を選ぶ方法は，<sub>6</sub>C<sub>3</sub>＝6×5×4÷(3×2×1)＝20(通り)。女子から1人を選ぶ方法は，<sub>3</sub>C<sub>1</sub>＝3(通り)。
          これらを組み合わせる方法は，20×3＝<b>60(通り)</b>
        </p>
        <p>
          「6人のうち4人のそうじ当番を選ぶ」方法と，「6人のうち2人のそうじ当番にならない人を選ぶ」方法は，同じ意味なので，同じ結果になるはずです（この考え方を「余事象」といいます）。
          つまり，<sub>6</sub>C<sub>4</sub>＝<sub>6</sub>C<sub>2</sub>なので，6×5÷(2×1)＝15(通り)となります。
        </p>
      </div>
    </div>
  )
}
