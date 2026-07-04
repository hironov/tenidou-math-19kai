import { useState } from 'react'
import { ComboPicker } from '../components/ComboPicker'

const PEOPLE5 = ['A', 'B', 'C', 'D', 'E'].map((l) => ({ id: l, label: l }))
const PEOPLE7 = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => ({ id: l, label: l }))

export default function Example2() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'

  return (
    <div className="problem">
      <h2>例題2　組み合わせの公式（コンビネーション）</h2>
      <div className="statement">
        <ol className="question-list">
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅの5人の中から日直を2人選びます。日直の組み合わせは何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆ，Ｇの7人の中からそうじ当番を3人選びます。そうじ当番の組み合わせは何通りありますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('1')}>(1) 5人から2人</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('2')}>(2) 7人から3人</button>
      </div>

      {isCase1 ? (
        <ComboPicker key="c1" items={PEOPLE5} pickCount={2} totalLabel="10通り" />
      ) : (
        <ComboPicker key="c2" items={PEOPLE7} pickCount={3} totalLabel="35通り" />
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 5人のうち2人をならべる方法は，「積の法則」を使うと，1人目5×2人目4＝20(通り)あります。これですと，1人目にＡ，2人目にＢをならべる場合と，
          1人目にＢ，2人目にＡをならべる場合で，同じ組み合わせが重複していることがわかります。2人をならべるとき，同じ組み合わせの重複は，2×1＝2(通り)ずつありますので，
          組み合わせ方は，20÷2＝<b>10(通り)</b>
        </p>
        <p>
          (2) (1)同様に，7人のうち3人をならべる方法は，7×6×5＝210(通り)。3人をならべるとき，同じ組み合わせの重複は，3×2×1＝6(通り)ずつありますので，
          組み合わせ方は，210÷6＝<b>35(通り)</b>
        </p>
        <p>
          このことから，組み合わせの公式を考えることができます。Ｎ個のうち2個を選ぶ … Ｎ×(Ｎ－1)÷(2×1)。Ｎ個のうち3個を選ぶ … Ｎ×(Ｎ－1)×(Ｎ－2)÷(3×2×1)。
          「Ｎ個のうちＡ個を選ぶ」ことを，<sub>N</sub>C<sub>A</sub>と表します（Ｃは「コンビネーション」＝組み合わせ）。
        </p>
      </div>
    </div>
  )
}
