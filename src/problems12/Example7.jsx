import { Bracket } from '../components/Bracket'

export default function Example7() {
  return (
    <div className="problem">
      <h2>例題7　リーグ戦・トーナメント戦の試合数</h2>
      <div className="statement">
        <p className="setup">野球の大会に6チームが参加しました。引き分けは考えないものとします。</p>
        <ol className="question-list">
          <li>他の各チームと1試合ずつ行うリーグ戦をする場合，全部で何試合行われますか。</li>
          <li>トーナメント戦をする場合，優勝が決まるまでに，全部で何試合行われますか。</li>
        </ol>
      </div>

      <div className="graph-block">
        <h3>トーナメント表のイメージ（8チームの例）</h3>
        <Bracket teamCount={8} />
        <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>○の中は回戦の数字。1試合行うごとに1チームが負けて敗退します。</p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 1試合で戦うのは2つのチームですので，6チームから2チームを選ぶ方法を考えることで，試合数を数えることができます。よって，<sub>6</sub>C<sub>2</sub>＝6×5÷(2×1)＝<b>15(試合)</b>
        </p>
        <p>
          (2) トーナメント戦では，1試合行うごとに1チームが負けて，次の試合に進むことができません（これは，どのような組み合わせ方をしても変わりません）。
          6チームが参加するとき，優勝する1チームが決まるまでに，残りの5チームが負ければよいので，試合数は，5÷1＝<b>5(試合)</b>です。
        </p>
        <p>Ｎチームのリーグ戦(総当たり戦)の試合数は，<sub>N</sub>C<sub>2</sub>(試合)。Ｎチームのトーナメント戦(勝ちぬき戦)の試合数は，Ｎ－1(試合)。</p>
      </div>
    </div>
  )
}
