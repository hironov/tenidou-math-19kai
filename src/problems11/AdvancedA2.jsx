import { GridPathDiagram } from '../components/GridPathDiagram'

export default function AdvancedA2() {
  return (
    <div className="problem">
      <h2>応用問題A-2　立体の中の道順（東西・南北・上下）</h2>
      <div className="statement">
        <p className="setup">
          東西方向，南北方向，上下方向に走る線が組み合わさっています。Ａを出発して，これらの線上を進みます。
        </p>
        <ol className="question-list">
          <li>ＡからＢまで遠回りせずに行く道順は何通りありますか。</li>
          <li>ＡからＣまで遠回りせずに行く道順は何通りありますか。</li>
          <li>ＰとＱが通れないとき，ＡからＣまで遠回りせずに行く道順は何通りありますか。</li>
        </ol>
      </div>

      <h3>(1) ＡとＢのある平面だけを考える</h3>
      <GridPathDiagram cols={1} rows={4} startLabel="A" endLabel="B" cellSize={40} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) ＡとＢのある平面だけを考えると，上の図のようになります。よって，<b>5通り</b></p>
        <p>
          (2) Ａから見て「上」「東」「北」の3方向すべてを使って進むと考えます。このとき，「上から来る」，「西から来る」，「南から来る」の3つの和になっている部分に注意しましょう。
          計算していくと，Ｃに行く方法は<b>192通り</b>になります。
        </p>
        <p>
          (3) ＰとＱをふくむ辺をなくして，(2)と同じように和の法則で計算していくと，Ｃに行く方法は<b>146通り</b>になります。
        </p>
      </div>
    </div>
  )
}
