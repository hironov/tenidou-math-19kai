import { NumberTable } from '../components/NumberTable'

const PATTERN = [2, 4, 5, 6, 8, 10]

export default function Practice1() {
  return (
    <div className="problem">
      <h2>練習問題1　2の倍数または5の倍数の数列</h2>
      <div className="statement">
        <p className="setup">2の倍数または5の倍数である整数を，下のように小さい方からならべます。2，4，5，6，8，10，12，14，15，……</p>
        <ol className="question-list">
          <li>98は左から何番目にありますか。</li>
          <li>左から40番目の整数はいくつですか。</li>
        </ol>
      </div>

      <NumberTable rows={4} cols={6} rowLabel="段" colLabel="番目" highlight={{ r: 4, c: 5 }} cell={(r, c) => ({ value: 10 * (r - 1) + PATTERN[c - 1] })} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 2と5の公倍数である10ごとに区切って，表にします。98÷10＝9(段)あまり8 より，98は10段目の5番目にあります。6×9＋5＝<b>59(番目)</b></p>
        <p>(2) 40÷6＝6(段)あまり4(個)より，40番目の数は7段目の4番目にあります。左から4番目の数だけを見ていくと，6，16，26，……と等差数列になっていますので，6＋10×(7－1)＝<b>66</b></p>
      </div>
    </div>
  )
}
