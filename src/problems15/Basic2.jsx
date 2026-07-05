import { DigitPicker } from '../components/DigitPicker'

const CARDS = [0, 1, 2, 5, 6].map((v, i) => ({ id: `c${i}`, value: v }))

function isMultipleOf5(numStr) { const last = numStr[numStr.length - 1]; return last === '0' || last === '5' }

export default function Basic2() {
  return (
    <div className="problem">
      <h2>基本問題2　カードで3けたの整数を作る</h2>
      <div className="statement">
        <p className="setup">{'{0，1，2，5，6}'}の5枚のカードがあります。このうちの3枚をならべて3けたの整数を作ります。</p>
        <ol className="question-list">
          <li>整数は何通りできますか。</li>
          <li>5の倍数は何通りできますか。</li>
        </ol>
      </div>

      <DigitPicker cards={CARDS} pickCount={3} checkFn={isMultipleOf5} checkLabel="5の倍数か" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 積の法則を用います。百の位には「0」は来られないので，4通りになります。（百）（十）（一）4×4×3＝<b>48(通り)</b></p>
        <p>(2) 5の倍数は，一の位が0または5になります。□□0…4×3＝12(通り)。□□5…3×3＝9(通り)。以上より，12＋9＝<b>21(通り)</b></p>
      </div>
    </div>
  )
}
