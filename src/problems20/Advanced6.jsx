import { useState, useMemo } from 'react'

// 中心(0,0)=1から時計回りにらせん状に整数を埋めていくシミュレーション。
function buildSpiral(maxSteps) {
  const grid = new Map()
  let x = 0, y = 0, n = 1
  grid.set('0,0', 1)
  let stepLen = 1
  let dirIndex = 0 // 0:右 1:上 2:左 3:下
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  let turnsAtThisLen = 0
  while (n < maxSteps) {
    for (let s = 0; s < stepLen && n < maxSteps; s++) {
      const [dx, dy] = dirs[dirIndex]
      x += dx; y += dy; n++
      grid.set(`${x},${y}`, n)
    }
    dirIndex = (dirIndex + 1) % 4
    turnsAtThisLen++
    if (turnsAtThisLen === 2) { stepLen++; turnsAtThisLen = 0 }
  }
  return grid
}

const GRID = buildSpiral(400)

function valueAt(dx, dy) {
  return GRID.get(`${dx},${dy}`)
}

export default function Advanced6() {
  const [dx, setDx] = useState(-4)
  const [dy, setDy] = useState(4)
  const value = valueAt(dx, dy)

  const cells = useMemo(() => {
    const rows = []
    for (let yy = 5; yy >= -5; yy--) {
      const row = []
      for (let xx = -5; xx <= 5; xx++) row.push({ xx, yy, v: valueAt(xx, yy) })
      rows.push(row)
    }
    return rows
  }, [])

  return (
    <div className="problem">
      <h2>最難関6　らせん状の数表</h2>
      <div className="statement">
        <p className="setup">あるきまりにしたがって，1から順に整数をならべます。たとえば，1から上に1つ，左に1つ移動した整数は5です。</p>
        <ol className="question-list">
          <li>1から上に8つ，左に8つ移動した整数はいくつですか。</li>
          <li>1から下に8つ，右に8つ移動した整数はいくつですか。</li>
          <li>100から1つ下に移動した整数はいくつですか。</li>
          <li>200に上下左右の4つの整数の和はいくつですか。</li>
        </ol>
      </div>

      <div className="num-table-wrap">
        <table className="num-table">
          <tbody>
            {cells.map((row, i) => (
              <tr key={i}>
                {row.map((c) => (
                  <td key={c.xx} className={c.xx === dx && c.yy === dy ? 'num-table-hi' : ''}>
                    <div className="num-table-value" style={{ fontSize: '0.75rem' }}>{c.v}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="readout">
        <p>上（＋）／下（－）に：<input type="range" min={-5} max={5} value={dy} onChange={(e) => setDy(parseInt(e.target.value, 10))} /> {dy}</p>
        <p>右（＋）／左（－）に：<input type="range" min={-5} max={5} value={dx} onChange={(e) => setDx(parseInt(e.target.value, 10))} /> {dx}</p>
        <p>1からの移動先の整数：<b>{value}</b></p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 1から上にＮ個，左にＮ個移動した整数は，偶数の平方数よりも1大きい数です。8番目の偶数である2×8＝16の平方に1を加えます。16×16＋1＝<b>257</b></p>
        <p>(2) 1から下にＮ個，右にＮ個移動した整数は，奇数の平方数です（中心が1なので，(Ｎ＋1)番目の奇数の平方）。9番目の奇数である2×9－1＝17の平方を求めます。17×17＝<b>289</b></p>
        <p>(3) 100＝10×10 より，5番目の偶数の平方ですから，1から上に5つ，左に4つ移動した位置にあります。求める数は，1から上に4つ，左に4つ移動した位置にある数です。(1)より，8×8＋1＝<b>65</b></p>
        <p>(4) 200に最も近い平方数は，14×14＝196です。この前後にある偶数の平方は，12×12＝144，16×16＝256。200近辺の様子から，147＋199＋201＋261＝<b>808</b></p>
        <p>難解な規則性の問題では，「答えの近所」までを計算で求め，そこからは必要な範囲で書き出すことで，ミスなく解くことができます。</p>
      </div>
    </div>
  )
}
