import { Bracket } from '../components/Bracket'

export default function Practice6() {
  return (
    <div className="problem">
      <h2>練習問題6　予選リーグ＋本戦トーナメント</h2>
      <div className="statement">
        <p className="setup">
          野球の大会に40チームが出場します。大会は，はじめに5チームずつのグループに分かれて，各グループごとにリーグ戦で予選が行われます。そして，各グループの上位2チームずつが本戦に勝ち残り，
          本戦はトーナメント戦で優勝が決まります。この大会では，全部で何試合行われますか。ただし，予選のリーグ戦は，グループ内の他のチームと1試合ずつ行います。また，どの試合も引き分けはなく，3位決定戦などは行わないものとします。
        </p>
      </div>

      <div className="graph-block">
        <h3>本戦トーナメント（16チーム）</h3>
        <Bracket teamCount={16} rowHeight={16} colWidth={56} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>5チームでリーグ戦をするときの試合数は，<sub>5</sub>C<sub>2</sub>＝5×4÷(2×1)＝10(試合)であり，これが，40÷5＝8(グループ)あるので，予選は全部で，10×8＝80(試合)とわかります。</p>
        <p>さらに，本選に進めるチーム数は，2×8＝16(チーム)なので，本選の試合数は，16－1＝15(試合)です。</p>
        <p>以上より，全部で，80＋15＝<b>95(試合)</b></p>
      </div>
    </div>
  )
}
