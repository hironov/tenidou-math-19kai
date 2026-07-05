import { NumberTable } from '../components/NumberTable'

export default function Basic9() {
  return (
    <div className="problem">
      <h2>基本問題9　5の倍数を除いた数列</h2>
      <div className="statement">
        <p className="setup">5の倍数でない1以上の整数を，下のように小さい方からならべます。1，2，3，4，6，7，8，9，11，12，……</p>
        <ol className="question-list">
          <li>99は左から何番目にありますか。</li>
          <li>左から99番目の整数はいくつですか。</li>
        </ol>
      </div>

      <NumberTable rows={6} cols={4} rowLabel="段" colLabel="番目" highlight={{ r: 4, c: 4 }} cell={(r, c) => ({ value: 5 * (r - 1) + c })} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 5ずつに区切って，表にします。99÷5＝19(段)あまり4 より，99は20段目の4番目にあります。4×19＋4＝<b>80(番目)</b></p>
        <p>(2) 99÷4＝24(段)あまり3(個)より，99番目の数は25段目の3番目にあります。左から3番目の数だけを見ていくと，3，8，13，……と等差数列になっていますので，25段目の数は，3＋5×(25－1)＝<b>123</b></p>
        <p>倍数に関する数列は，公倍数ごとに区切って表にします。</p>
      </div>
    </div>
  )
}
