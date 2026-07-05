import { useState } from 'react'
import { DigitPicker } from '../components/DigitPicker'

const CARDS = [
  { id: 'a', value: 1 }, { id: 'b', value: 2 }, { id: 'c', value: 3 },
  { id: 'd', value: 4 }, { id: 'e', value: 4 },
]

function isOdd(numStr) { return Number(numStr) % 2 === 1 }

export default function Practice4() {
  const [mode, setMode] = useState('all')

  return (
    <div className="problem">
      <h2>練習問題4　同じ数字をふくむカード（4が2枚）</h2>
      <div className="statement">
        <p className="setup">{'{1，2，3，4，4}'}の5枚のカードがあります。このうちの3枚をならべて3けたの整数を作ります。</p>
        <ol className="question-list">
          <li>4を2枚とも使うとき，整数は何通りできますか。</li>
          <li>(1)の場合もふくめて，整数は全部で何通りできますか。</li>
          <li>奇数は何通りできますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === 'all' ? ' active' : ''}`} onClick={() => setMode('all')}>自由に3枚選ぶ</button>
        <button className={`jump-btn${mode === 'odd' ? ' active' : ''}`} onClick={() => setMode('odd')}>奇数かどうかを確認</button>
      </div>

      {mode === 'all' ? (
        <DigitPicker key="all" cards={CARDS} pickCount={3} />
      ) : (
        <DigitPicker key="odd" cards={CARDS} pickCount={3} checkFn={isOdd} checkLabel="奇数か" />
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>(1) □44，4□4，44□の3通りの場合が考えられます。すべての場合において，□に入る数は1，2，3の3通りなので，3×3＝<b>9(通り)</b></p>
        <p>(2) 4を2枚とも使う場合は(1)で考えましたので，あとは1，2，3，4の4枚のカードから整数を作ることを考えます。これが，4×3×2×1＝24(通り)ありますので，9＋24＝<b>33(通り)</b></p>
        <p>
          (3) □■1，□■3の2通りの場合が考えられます。□■1について，□■がどちらも4である…1通り。□■が異なる数である…使えるカードは2，3，4の3枚なので，3×2＝6(通り)。よって，1＋6＝7(通り)です。
          □■3の場合も同様なので，7×2＝<b>14(通り)</b>
        </p>
      </div>
    </div>
  )
}
