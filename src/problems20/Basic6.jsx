import { SequenceStrip } from '../components/SequenceStrip'

const VALUES = Array.from({ length: 22 }, (_, i) => 3 + 4 * i)

export default function Basic6() {
  return (
    <div className="problem">
      <h2>基本問題6　等差数列</h2>
      <div className="statement">
        <p className="setup">あるきまりにしたがって，下のように数をならべます。3，7，11，15，19，23，……</p>
        <ol className="question-list">
          <li>左から20番目の数はいくつですか。</li>
          <li>左から順に20番目の数まで加えると，その和はいくつになりますか。</li>
        </ol>
      </div>

      <SequenceStrip values={VALUES} highlightIndex={19} showDiff />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 4ずつ増える等差数列です。3＋4×(20－1)＝<b>79</b></p>
        <p>(2) (3＋79)×20÷2＝<b>820</b></p>
        <p>等差数列の基本公式：Ｎ番目の数＝はじめ＋公差×(Ｎ－1)。Ｎ番目までの和＝(はじめ＋おわり)×Ｎ÷2</p>
      </div>
    </div>
  )
}
