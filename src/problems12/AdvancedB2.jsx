import { useState } from 'react'
import { Bracket } from '../components/Bracket'

function computeN(teamCount) {
  const rounds = Math.round(Math.log2(teamCount))
  let n = 0
  let matches = teamCount / 2
  for (let r = 1; r <= rounds; r++) {
    n += r * matches
    matches /= 2
  }
  return n
}

const OPTIONS = [8, 16, 32, 64]

export default function AdvancedB2() {
  const [teamCount, setTeamCount] = useState(8)
  const n = computeN(teamCount)

  return (
    <div className="problem">
      <h2>応用問題B-2　トーナメント表の回戦数の合計Ｎ</h2>
      <div className="statement">
        <p className="setup">
          2，4，8，16，……，のように2をいくつかけ合わせた数のチームが参加するトーナメント戦(勝ち抜き戦)を考えます。1つのトーナメント戦で行われる各試合が何回戦であるかを示す数字をすべて加えた数をＮで表します。
          たとえば，チーム数が8のときには，1回戦が4試合，2回戦が2試合，3回戦が1試合行われるので，Ｎ＝1＋1＋1＋1＋2＋2＋3＝11となります。
        </p>
        <ol className="question-list">
          <li>チーム数が16であるトーナメント戦では，Ｎはいくつになりますか。</li>
          <li>6回戦が決勝戦となるトーナメント戦では，Ｎはいくつになりますか。</li>
          <li>あるチーム数のトーナメント戦では，Ｎが4083となりました。この2倍のチーム数のトーナメント戦では，Ｎが8178になるといいます。Ｎが4083となるときのチーム数を求めなさい。</li>
        </ol>
      </div>

      <div className="jump-row">
        {OPTIONS.map((v) => (
          <button key={v} className={`jump-btn${teamCount === v ? ' active' : ''}`} onClick={() => setTeamCount(v)}>{v}チーム</button>
        ))}
      </div>
      <Bracket teamCount={teamCount} rowHeight={teamCount > 16 ? 12 : 20} colWidth={teamCount > 16 ? 44 : 60} />
      <p className="readout">チーム数：<b>{teamCount}</b>　決勝は<b>{Math.round(Math.log2(teamCount))}</b>回戦　Ｎ＝<b>{n}</b></p>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 1回戦…16÷2＝8(試合) → 8チームが2回戦進出。2回戦…8÷2＝4(試合)。3回戦…4÷2＝2(試合)。4回戦…2÷2＝1(試合) → 決勝戦で終了。
          よって，Ｎ＝1×8＋2×4＋3×2＋4×1＝<b>26</b>
        </p>
        <p>
          (2) 16×2＝32(チーム)なら5回戦が決勝戦。32×2＝64(チーム)なら6回戦が決勝戦となるので，チーム数は64チームです。よって，Ｎ＝1×32＋2×16＋3×8＋4×4＋5×2＋6×1＝<b>120</b>
        </p>
        <p>
          (3) チーム数が2倍になるということは，もとのトーナメント表を2つにして，それぞれの優勝者同士で決勝戦を行う，という状態になります。この決勝戦をＸ回戦とすると，Ｎの値は，4083×2＋Ｘ＝8166＋Ｘとなり，
          これが8178に等しいので，Ｘ＝12とわかります。これより，Ｎ＝4083のときは，11回戦が決勝戦ですので，(2)の64チームから5回戦増やせばよいので，64×2×2×2×2×2＝<b>2048(チーム)</b>です。
        </p>
      </div>
    </div>
  )
}
