import { DigitPicker } from '../components/DigitPicker'

const CARDS = [0, 1, 2, 3].map((v, i) => ({ id: `c${i}`, value: v }))

function isEven(numStr) { return Number(numStr) % 2 === 0 }

export default function Example5() {
  return (
    <div className="problem">
      <h2>例題5　カードをならべて整数を作る</h2>
      <div className="statement">
        <p className="setup">{'{0，1，2，3}'}の4枚のカードがあります。このうちの3枚をならべて3けたの整数を作ります。カードを3枚選んでみましょう。</p>
        <ol className="question-list">
          <li>整数は何通りできますか。</li>
          <li>偶数は何通りできますか。</li>
        </ol>
      </div>

      <DigitPicker cards={CARDS} pickCount={3} checkFn={isEven} checkLabel="偶数かどうか" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) カードを連続して置いていきますから「積の法則」を使うことができます。百の位は1，2，3のどれかなので3通り，十の位は4枚のうち百の位に使ったカード以外なので3通り，一の位は2通り。3×3×2＝<b>18(通り)</b></p>
        <p>
          (2) 偶数は，一の位が0か2にならなくてはなりません。一の位のときに残っているカードの枚数が場合によって変わるため，安易に公式は使えず「場合分け」をして考えます。
        </p>
        <p>一の位が0のとき，□■0となり，□■は1，2，3のいずれか → 3×2＝6(通り)</p>
        <p>一の位が2のとき，□■2となり，□■は0，1，3のいずれか → 2×2＝4(通り)</p>
        <p>この2つの「場合」は同時に起きることはありませんので，6＋4＝<b>10(通り)</b></p>
      </div>
    </div>
  )
}
