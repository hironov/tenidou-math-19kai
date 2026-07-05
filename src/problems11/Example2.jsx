import { GridPathDiagram } from '../components/GridPathDiagram'

export default function Example2() {
  return (
    <div className="problem">
      <h2>例題2　ごばん目の道順（和の法則）</h2>
      <div className="statement">
        <p className="setup">直角に交わる道があります。Ｐ地点からＱ地点まで遠回りせずに行く道順は何通りありますか。</p>
      </div>

      <GridPathDiagram cols={3} rows={2} startLabel="P" endLabel="Q" />

      <div className="explain">
        <h3>解説</h3>
        <p>
          「和の法則」で考えます。「その点に行く方法が何通りあるか」を図に書きこんでいき，「その点の直前にどこにいたのか」に注目するというものです。
        </p>
        <p>まず，遠回りしないためには，進む方向は右（→）か上（↑）しかありません。Ｐから一直線上に行ける点は，すべて1通りしか行く方法がないので，図に「1」を書きこみます。</p>
        <p>
          ある点に進むには，その点に進む直前には「下の点」か「左の点」にいることになりますので，この2つの点に書かれている数字をたして，その点に行く方法の数がわかります。
          こうして順に計算していくと，Ｑに行く方法は，4＋6＝<b>10(通り)</b>となります。
        </p>
        <p>「和の法則」は【同時に起こらない事象】のときに用います。ある点に行くのに「下から進む」と「左から進む」は同時に起きることはありません。</p>
      </div>
    </div>
  )
}
