import { useState } from 'react'

const AB = ['電車', 'バス', 'モノレール']
const BC = ['バス', 'タクシー', '電車']
const CD = ['バス', 'タクシー']

export default function Practice2() {
  const [ab, setAb] = useState(null)
  const [viaShip, setViaShip] = useState(false)
  const [bc, setBc] = useState(null)
  const [cd, setCd] = useState(null)

  const busCount = [ab, viaShip ? null : bc, viaShip ? null : cd].filter((x) => x === 'バス').length

  return (
    <div className="problem">
      <h2>練習問題2　交通手段の組み合わせ</h2>
      <div className="statement">
        <p className="setup">Ａ町からＢ町，Ｃ町を通ってＤ町まで行く交通手段があります。Ｂ町から船を使うと，直接Ｄ町まで行くことができます。</p>
        <ol className="question-list">
          <li>Ａ町からＤ町まで行く方法は何通りありますか。</li>
          <li>Ａ町からＤ町まで行く方法のうち，バスを1回だけ使う方法は何通りありますか。</li>
        </ol>
      </div>

      <p style={{ fontWeight: 'bold', marginBottom: 4 }}>Ａ町→Ｂ町</p>
      <div className="combo-items">{AB.map((t) => <button key={t} className={`combo-item${ab === t ? ' active' : ''}`} onClick={() => setAb(t)}>{t}</button>)}</div>

      <p style={{ fontWeight: 'bold', margin: '10px 0 4px' }}>Ｂ町から先の経路</p>
      <div className="jump-row">
        <button className={`jump-btn${!viaShip ? ' active' : ''}`} onClick={() => setViaShip(false)}>Ｃ町を経由</button>
        <button className={`jump-btn${viaShip ? ' active' : ''}`} onClick={() => setViaShip(true)}>船で直接Ｄ町へ</button>
      </div>

      {!viaShip && (
        <>
          <p style={{ fontWeight: 'bold', margin: '10px 0 4px' }}>Ｂ町→Ｃ町</p>
          <div className="combo-items">{BC.map((t) => <button key={t} className={`combo-item${bc === t ? ' active' : ''}`} onClick={() => setBc(t)}>{t}</button>)}</div>
          <p style={{ fontWeight: 'bold', margin: '10px 0 4px' }}>Ｃ町→Ｄ町</p>
          <div className="combo-items">{CD.map((t) => <button key={t} className={`combo-item${cd === t ? ' active' : ''}`} onClick={() => setCd(t)}>{t}</button>)}</div>
        </>
      )}

      <p className="readout">
        ルート：Ａ町 →({ab ?? '?'})→ Ｂ町 {viaShip ? `→(船)→ Ｄ町` : `→(${bc ?? '?'})→ Ｃ町 →(${cd ?? '?'})→ Ｄ町`}
        <br />バスを使った回数：<b>{busCount}</b>
      </p>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ｂ町からＤ町までを進むのに船を使うか使わないかで場合分けをします。船を使わない場合…3×2×3＝18(通り)。船を使う場合…3×1＝3(通り)。よって，18＋3＝<b>21(通り)</b></p>
        <p>
          (2) バスをどこで使うかで場合分けをします。Ａ町からＢ町でバスを使う→船を使う…1×1＝1(通り)，船を使わない…1×1×2＝2(通り)。Ｂ町からＣ町でバスを使う…2×1×2＝4(通り)。
          Ｃ町からＤ町でバスを使う…2×1×1＝2(通り)。以上より，1＋2＋4＋2＝<b>9(通り)</b>
        </p>
      </div>
    </div>
  )
}
