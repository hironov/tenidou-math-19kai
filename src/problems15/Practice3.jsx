import { DigitPicker } from '../components/DigitPicker'

const CARDS = [0, 1, 2, 4, 7].map((v, i) => ({ id: `c${i}`, value: v }))

function isMultipleOf4(numStr) { return parseInt(numStr.slice(-2), 10) % 4 === 0 }
function isMultipleOf3(numStr) { return numStr.split('').reduce((a, c) => a + Number(c), 0) % 3 === 0 }

export default function Practice3() {
  return (
    <div className="problem">
      <h2>練習問題3　カードで3けたの整数を作る（応用）</h2>
      <div className="statement">
        <p className="setup">{'{0，1，2，4，7}'}の5枚のカードがあります。このうちの3枚をならべて3けたの整数を作ります。</p>
        <ol className="question-list">
          <li>4の倍数は何通りできますか。</li>
          <li>3の倍数は何通りできますか。</li>
        </ol>
      </div>

      <h3>(1) 4の倍数をさがす（下2けたが4の倍数）</h3>
      <DigitPicker cards={CARDS} pickCount={3} checkFn={isMultipleOf4} checkLabel="4の倍数か" />

      <h3>(2) 3の倍数をさがす（各位の和が3の倍数）</h3>
      <DigitPicker cards={CARDS} pickCount={3} checkFn={isMultipleOf3} checkLabel="3の倍数か" />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 4の倍数は，下2けたが4の倍数になる数です。下2けたの選び方は，04(3通り)，12(2通り)，20(3通り)，24(2通り)，40(3通り)，72(2通り)。
          3＋2＋3＋2＋3＋2＝<b>15(通り)</b>
        </p>
        <p>
          (2) 3の倍数は，各位の数字の和が3の倍数になる数です。和が3になる組…{'{0,1,2}'}(4通り)。和が6になる組…{'{0,2,4}'}(4通り)。
          和が9になる組…{'{0,2,7}'}(4通り)。和が12になる組…{'{1,4,7}'}(6通り)。4＋4＋4＋6＝<b>18(通り)</b>
        </p>
      </div>
    </div>
  )
}
