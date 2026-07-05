import { GridPathDiagram } from '../components/GridPathDiagram'

export default function Advanced7() {
  return (
    <div className="problem">
      <h2>最難関問題集7　曲がる回数を数える道順</h2>
      <div className="statement">
        <p className="setup">
          下の図のような4×4の方眼の道があります。Ａ地点から，右または上にだけ進んでＣ地点まで行く道順を考えます（Ｐは，Ａから右に1，上に2進んだ地点です）。
        </p>
        <ol className="question-list">
          <li>Ｐ地点を通ってＣ地点まで行く道順は何通りありますか。</li>
          <li>曲がる回数がちょうど7回であるような道順は何通りありますか。</li>
          <li>曲がる回数がちょうど3回であるような道順は何通りありますか。</li>
        </ol>
      </div>

      <h3>(1) ＡからＰまで／ＰからＣまで</h3>
      <div className="stage">
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>Ａ→Ｐ（右1，上2）</p>
          <GridPathDiagram cols={1} rows={2} startLabel="A" endLabel="P" />
        </div>
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>Ｐ→Ｃ（右3，上2）</p>
          <GridPathDiagram cols={3} rows={2} startLabel="P" endLabel="C" />
        </div>
      </div>

      <h3>全体（Ａ→Ｃ，4×4の方眼）</h3>
      <GridPathDiagram cols={4} rows={4} startLabel="A" endLabel="C" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａ→Ｐは3通り，Ｐ→Ｃは10通りなので，Ｐを通る道順は，3×10＝<b>30(通り)</b></p>
        <p>
          (2) 曲がる回数が7回ということは，1歩ごとに向きが変わる(右・上・右・上…と交互になる)道順です。右4回・上4回がぴったり交互にならぶのは，「右から始める」「上から始める」の<b>2(通り)</b>だけです。
        </p>
        <p>
          (3) 曲がる回数がちょうど3回ということは，進む向きのまとまりが4つ(たとえば「右→上→右→上」のように4つの区間)に分かれる道順です。
          「右から始める」場合，右4歩を2つのまとまりに分ける方法は(1＋3，2＋2，3＋1)の3通り，上4歩も同様に3通りなので3×3＝9(通り)。「上から始める」場合も同様に9通り。
          あわせて，9＋9＝<b>18(通り)</b>
        </p>
      </div>
    </div>
  )
}
