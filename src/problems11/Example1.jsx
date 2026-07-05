import { DicePicker } from '../components/DicePicker'

export default function Example1() {
  return (
    <div className="problem">
      <h2>例題1　和分解（さいころの目の樹形図）</h2>
      <div className="statement">
        <p className="setup">大小2つのさいころを同時に1回ふります。出た目の合計が4以下になるような目の出方は何通りありますか。さいころの目を選んで確かめてみましょう。</p>
      </div>

      <DicePicker checkFn={(s) => s <= 4} checkLabel="合計が4以下か" />

      <div className="explain">
        <h3>解説</h3>
        <p>樹形図で考えます。（大，小）＝（1，1）（1，2）（1，3）（2，1）（2，2）（3，1）</p>
        <p>樹形図を書くときは，「たてにそろえる」意識が重要です。</p>
        <p>以上より，<b>6通り</b></p>
      </div>
    </div>
  )
}
