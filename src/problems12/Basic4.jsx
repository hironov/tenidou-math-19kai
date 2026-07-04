import { DigitPicker } from '../components/DigitPicker'

const CARDS = [1, 2, 3, 4, 5].map((v, i) => ({ id: `c${i}`, value: v }))

function sumIs10(numStr) {
  const sum = numStr.split('').reduce((s, d) => s + Number(d), 0)
  return sum === 10
}

export default function Basic4() {
  return (
    <div className="problem">
      <h2>基本問題4　和が10になるカードの組み合わせ</h2>
      <div className="statement">
        <p className="setup">箱の中に{'{1，2，3，4，5}'}の5枚のカードが入っています。</p>
        <ol className="question-list">
          <li>箱の中から3枚のカードを同時に取り出します。取り出したカードにかかれた数字の和が10になるようなカードの組み合わせは何通りありますか。</li>
          <li>箱の中からカードを1枚ずつ取り出して左から順にならべていきます。カードを3枚ならべて3けたの整数を作るとき，各位の数字の和が10になるような整数は何通り作れますか。</li>
        </ol>
      </div>

      <DigitPicker cards={CARDS} pickCount={3} checkFn={sumIs10} checkLabel="和が10になるか" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 和が10となる組み合わせは，(1，4，5)(2，3，5)の<b>2通り</b>です。</p>
        <p>(2) (1)で求めた組み合わせをならべかえればよいので，(1，4，5)→3×2×1＝6(通り)，(2，3，5)→3×2×1＝6(通り)。以上より，6＋6＝<b>12(通り)</b></p>
      </div>
    </div>
  )
}
