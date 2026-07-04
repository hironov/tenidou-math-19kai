import { useState } from 'react'
import { SlotSequence } from '../components/SlotSequence'

const COLORS_1 = [
  { key: 'black', label: '黒玉', count: 2, swatch: '#2d3748' },
  { key: 'white', label: '白玉', count: 3, swatch: '#f7fafc' },
]
const COLORS_2 = [
  { key: 'white', label: '白玉', count: 3, swatch: '#f7fafc' },
  { key: 'black', label: '黒玉', count: 2, swatch: '#2d3748' },
  { key: 'blue', label: '青玉', count: 1, swatch: '#3182ce' },
]

export default function Example6() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'

  return (
    <div className="problem">
      <h2>例題6　同じものを含む順列</h2>
      <div className="statement">
        <ol className="question-list">
          <li>黒玉が2個，白玉が3個あります。これらの5個の玉を横1列にならべるとき，ならべ方は何通りありますか。</li>
          <li>白玉が3個，黒玉が2個，青玉が1個あります。これらの6個の玉を横1列にならべるとき，ならべ方は何通りありますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('1')}>(1) 黒2・白3</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('2')}>(2) 白3・黒2・青1</button>
      </div>

      {isCase1 ? <SlotSequence key="s1" slotCount={5} colors={COLORS_1} /> : <SlotSequence key="s2" slotCount={6} colors={COLORS_2} />}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 5個の玉を入れる箱を想像します。「何番目の箱に黒を入れるか」によって，玉のならべ方を考えることができます。5個の箱のうち，黒が入るのは2個なので，
          <sub>5</sub>C<sub>2</sub>＝5×4÷(2×1)＝<b>10(通り)</b>
        </p>
        <p>
          (2) 玉は6個ありますので，箱も6個用意します。このうち，青が入る箱が1個あるので，青を入れる方法は6通りです。また，残った5個の箱のうち，黒が入る箱が2個あるので，
          黒を入れる方法は，<sub>5</sub>C<sub>2</sub>＝10(通り)です。なお，残った箱には自動的に白が入りますので，白を入れる場所について考える必要はありません。
          これより，6×10＝<b>60(通り)</b>
        </p>
      </div>
    </div>
  )
}
