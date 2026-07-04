import { DigitPicker } from '../components/DigitPicker'

const CARDS = [0, 1, 2, 3, 4].map((v, i) => ({ id: `c${i}`, value: v }))

function isMultipleOf3(numStr) {
  const sum = numStr.split('').reduce((s, d) => s + Number(d), 0)
  return sum % 3 === 0
}

export default function Example5() {
  return (
    <div className="problem">
      <h2>例題5　倍数判定法の利用</h2>
      <div className="statement">
        <p className="setup">
          {'{0，1，2，3，4}'}の5枚のカードがあります。このうちの3枚をならべて3けたの整数を作るとき，3の倍数は何通りできますか。ただし，「各位の数字の和が3の倍数のとき，その整数は3の倍数になる。」という性質を利用してかまいません。カードを3枚選んで確かめてみましょう。
        </p>
      </div>

      <DigitPicker cards={CARDS} pickCount={3} checkFn={isMultipleOf3} checkLabel="3の倍数かどうか" />

      <div className="explain">
        <h3>解説</h3>
        <p>まず，各位の数字の和が3の倍数となる組み合わせを探し，次に，それぞれの組み合わせにおけるならべ方を考えます。</p>
        <p>和が3 … (0，1，2) → 2×2×1＝4(通り)</p>
        <p>和が6 … (0，2，4) → 2×2×1＝4(通り)　(1，2，3) → 3×2×1＝6(通り)</p>
        <p>和が9 … (2，3，4) → 3×2×1＝6(通り)</p>
        <p>以上より，4＋4＋6＋6＝<b>20(通り)</b></p>
        <p>
          倍数の判定について：2の倍数…一の位が偶数／3の倍数…各位の和が3の倍数／4の倍数…下2けたが4の倍数／5の倍数…一の位が0か5／9の倍数…各位の和が9の倍数。
          これを基本として，6の倍数(3の倍数のうち偶数)，12の倍数(4の倍数かつ3の倍数)，18の倍数(9の倍数のうち偶数)，36の倍数(4の倍数かつ9の倍数)なども判定できます。
        </p>
      </div>
    </div>
  )
}
