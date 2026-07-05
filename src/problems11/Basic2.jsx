import { GridPathDiagram } from '../components/GridPathDiagram'

const LOS = [0, 0, 1, 2, 2]
const exists47 = (x, y) => x >= LOS[y] && x <= 4
const existsPostbox = (x, y) => (x <= 1 && y <= 1) || (x >= 1 && x <= 4 && y >= 1 && y <= 3)

export default function Basic2() {
  return (
    <div className="problem">
      <h2>基本問題2　直角に交わる道（いろいろな条件）</h2>
      <div className="statement">
        <p className="setup">直角に交わる道があります。</p>
        <ol className="question-list">
          <li>(図1)で，家から駅まで遠回りせずに行く道順は何通りありますか。</li>
          <li>(図2)で，家からポストの前を通って駅まで行くとき，遠回りせずに行く道順は何通りありますか。</li>
          <li>(図3)で，×をつけた地点が工事中で通れないとき，家から駅まで遠回りせずに行く道順は何通りありますか。</li>
        </ol>
      </div>

      <h3>(図1) 家→駅</h3>
      <GridPathDiagram cols={4} rows={4} exists={exists47} startLabel="家" endLabel="駅" />

      <h3>(図2) 家→ポスト→駅（遠回りしない道だけが残っています）</h3>
      <GridPathDiagram cols={4} rows={3} exists={existsPostbox} startLabel="家" endLabel="駅" />

      <h3>(図3) ×地点（工事中）をさける</h3>
      <GridPathDiagram cols={4} rows={4} exists={exists47} blockedEdges={[{ x1: 2, y1: 1, x2: 2, y2: 2 }]} startLabel="家" endLabel="駅" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 和の法則を用いて，右の図のようになります。よって，<b>47通り</b></p>
        <p>(2) 遠回りしないためには，決まった道しか進むことができません（点線部分に進むと，遠回りになってしまいます）。よって，<b>20通り</b></p>
        <p>(3) 「×」の道は通れませんので，道ごと消して考えます。よって，<b>29通り</b></p>
        <p>角の考え方：下からしか来られない点は，そのまま同じ数字を書きうつします。左からしか来られない点も同様です。必ず通る点同士を長方形で結ぶと考えやすくなります。</p>
      </div>
    </div>
  )
}
