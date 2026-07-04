import { PointsFigure } from '../components/PointsFigure'

const LINE_A_IDS = ['a1', 'a2', 'a3', 'a4']
const POINTS = [
  { id: 'a1', x: 40, y: 40, label: '' },
  { id: 'a2', x: 100, y: 55, label: '' },
  { id: 'a3', x: 160, y: 70, label: '' },
  { id: 'a4', x: 220, y: 85, label: '' },
  { id: 'b1', x: 100, y: 150, label: '' },
  { id: 'b2', x: 200, y: 150, label: '' },
]

function isCollinear(ids) {
  return ids.every((id) => LINE_A_IDS.includes(id))
}

export default function Example4() {
  return (
    <div className="problem">
      <h2>例題4　三角形の個数（組み合わせの利用）</h2>
      <div className="statement">
        <p className="setup">
          直線アの上に4個の点，直線イの上に2個の点があります。これらの6個の点のうちの3個を頂点とする三角形は何個できますか。点をクリックして3個選んでみましょう。
        </p>
      </div>

      <PointsFigure points={POINTS} pickCount={3} isCollinear={isCollinear}
        extraLines={[{ x1: 20, y1: 33, x2: 240, y2: 92 }, { x1: 80, y1: 150, x2: 220, y2: 150 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          6個の点のうち3個を選ぶ方法は，<sub>6</sub>C<sub>3</sub>＝6×5×4÷(3×2×1)＝20(通り)。このうち，直線ア上にある4個の点から3個の頂点を選ぶと，
          三角形ではなく直線になってしまいます。これが，<sub>4</sub>C<sub>3</sub>＝4×3×2÷(3×2×1)＝4(通り)ありますので，作ることができる三角形は，20－4＝<b>16(個)</b>
        </p>
        <p>余事象より，<sub>4</sub>C<sub>3</sub>＝<sub>4</sub>C<sub>1</sub></p>
      </div>
    </div>
  )
}
