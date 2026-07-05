import { Bracket } from '../components/Bracket'

export default function Basic4() {
  return (
    <div className="problem">
      <h2>基本問題4　16チームのリーグ戦・トーナメント戦</h2>
      <div className="statement">
        <p className="setup">サッカーの大会に16チームが参加しました。引き分けは考えないものとします。</p>
        <ol className="question-list">
          <li>他の各チームと1試合ずつ行うリーグ戦をする場合，全部で何試合行われますか。</li>
          <li>トーナメント戦をする場合，優勝が決まるまでに，全部で何試合行われますか。</li>
        </ol>
      </div>

      <div className="graph-block">
        <h3>トーナメント表（16チーム）</h3>
        <Bracket teamCount={16} rowHeight={20} colWidth={56} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1試合で戦うのは2つのチームですので，16チームから2チームを選ぶ方法を考えることで，試合数を数えることができます。よって，<sub>16</sub>C<sub>2</sub>＝16×15÷(2×1)＝<b>120(試合)</b></p>
        <p>(2) トーナメント戦では，1試合行うごとに1チームが負けて，次の試合に進むことができません。16チームが参加するとき，優勝する1チームが決まるまでに，残りの15チームが負ければよいので，試合数は，15÷1＝<b>15(試合)</b>です。</p>
        <p>Ｎチームが参加するリーグ戦(総当たり戦)の試合数は，<sub>N</sub>C<sub>2</sub>試合。Ｎチームが参加するトーナメント戦(勝ちぬき戦)の試合数は，Ｎ－1試合。</p>
      </div>
    </div>
  )
}
