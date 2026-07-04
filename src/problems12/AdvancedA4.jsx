import { useState } from 'react'
import { DigitPicker } from '../components/DigitPicker'

const CARDS = [0, 1, 2, 7, 8, 9].map((v, i) => ({ id: `c${i}`, value: v }))

function isMultipleOf3(numStr) { return numStr.split('').reduce((s, d) => s + Number(d), 0) % 3 === 0 }
function isMultipleOf18(numStr) { return Number(numStr) % 18 === 0 }

export default function AdvancedA4() {
  const [mode, setMode] = useState('3')

  return (
    <div className="problem">
      <h2>応用問題A-4　3の倍数・18の倍数</h2>
      <div className="statement">
        <p className="setup">{'{0，1，2，7，8，9}'}の6枚のカードがあります。このうちの3枚をならべて3けたの整数を作ります。</p>
        <ol className="question-list">
          <li>3の倍数は何通りできますか。</li>
          <li>18の倍数は何通りできますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === '3' ? ' active' : ''}`} onClick={() => setMode('3')}>(1) 3の倍数</button>
        <button className={`jump-btn${mode === '18' ? ' active' : ''}`} onClick={() => setMode('18')}>(2) 18の倍数</button>
      </div>

      {mode === '3' ? (
        <DigitPicker key="m3" cards={CARDS} pickCount={3} checkFn={isMultipleOf3} checkLabel="3の倍数か" />
      ) : (
        <DigitPicker key="m18" cards={CARDS} pickCount={3} checkFn={isMultipleOf18} checkLabel="18の倍数か" />
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 各位の和が3の倍数となる組み合わせを考え，ならべかえます。(0，1，2)(0，1，8)(0，2，7)(0，7，8) → それぞれ2×2×1＝4(通り)。(1，2，9)(1，8，9)(2，7，9)(7，8，9) → それぞれ3×2×1＝6(通り)。
          以上より，4×4＋6×4＝<b>40(通り)</b>
        </p>
        <p>
          (2) 18＝9×2 より，「9の倍数」のうち「偶数」を探していきます。9の倍数は「各位の和が9の倍数」ですので，(0，1，8)→偶数は108，180，810の3通り。(0，2，7)→偶数は270，702，720の3通り。
          (1，8，9)→偶数は198，918の2通り。(2，7，9)→偶数は792，972の2通り。以上より，3＋3＋2＋2＝<b>10(通り)</b>
        </p>
      </div>
    </div>
  )
}
