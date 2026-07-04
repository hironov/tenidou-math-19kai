import { useState } from 'react'
import { DigitPicker } from '../components/DigitPicker'

const CARDS = [
  { id: 'a', value: 1 }, { id: 'b', value: 1 }, { id: 'c', value: 2 },
  { id: 'd', value: 3 }, { id: 'e', value: 4 }, { id: 'f', value: 5 },
]

function isMultipleOf4(numStr) { return Number(numStr) % 4 === 0 }
function isMultipleOf3(numStr) { return numStr.split('').reduce((s, d) => s + Number(d), 0) % 3 === 0 }

export default function Practice5() {
  const [mode, setMode] = useState('4')

  return (
    <div className="problem">
      <h2>練習問題5　同じ数字をふくむカードで倍数を作る</h2>
      <div className="statement">
        <p className="setup">{'{1，1，2，3，4，5}'}の6枚のカードがあります。この中から3枚を取り出してならべ，3けたの整数を作ります。</p>
        <ol className="question-list">
          <li>4の倍数は何通りできますか。</li>
          <li>3の倍数は何通りできますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === '4' ? ' active' : ''}`} onClick={() => setMode('4')}>(1) 4の倍数</button>
        <button className={`jump-btn${mode === '3' ? ' active' : ''}`} onClick={() => setMode('3')}>(2) 3の倍数</button>
      </div>

      {mode === '4' ? (
        <DigitPicker key="m4" cards={CARDS} pickCount={3} checkFn={isMultipleOf4} checkLabel="4の倍数か" />
      ) : (
        <DigitPicker key="m3" cards={CARDS} pickCount={3} checkFn={isMultipleOf3} checkLabel="3の倍数か" />
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 4の倍数は，「下2けたが4の倍数」であるものです。□12 → □には1，3，4，5が入るので4通り。□24 → □には1，3，5が入るので3通り。
          □32 → □には1，4，5が入るので3通り。□52 → □には1，3，4が入るので3通り。以上より，4＋3＋3＋3＝<b>13(通り)</b>
        </p>
        <p>
          (2) 3の倍数は，「各位の数の和が3の倍数」であるものです。和が6…(1，2，3)→6通り，(1，1，4)→3通り。和が9…(1，3，5)→6通り，(2，3，4)→6通り。和が12…(3，4，5)→6通り。
          以上より，6＋3＋6＋6＋6＝<b>27(通り)</b>
        </p>
      </div>
    </div>
  )
}
