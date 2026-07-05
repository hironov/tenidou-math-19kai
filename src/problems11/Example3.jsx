import { useState } from 'react'

const AB_ROUTES = ['道1', '道2', '道3']
const BC_ROUTES = ['道1', '道2', '道3', '道4']

export default function Example3() {
  const [goAB, setGoAB] = useState(null)
  const [goBC, setGoBC] = useState(null)
  const [backBC, setBackBC] = useState(null)
  const [backAB, setBackAB] = useState(null)

  return (
    <div className="problem">
      <h2>例題3　積の法則（道順の掛け合わせ）</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃの3つの地点を結ぶ道があります（ＡＢ間に3本，ＢＣ間に4本）。</p>
        <ol className="question-list">
          <li>Ａ地点からＢ地点を通ってＣ地点まで行く道順は何通りありますか。</li>
          <li>行きに通った道を帰りに通らないで，Ａ地点とＣ地点の間を1往復する道順は何通りありますか。</li>
        </ol>
      </div>

      <h3>行き：Ａ→Ｂ→Ｃ</h3>
      <p style={{ fontWeight: 'bold', marginBottom: 4 }}>ＡＢ間の道を選ぶ</p>
      <div className="combo-items">
        {AB_ROUTES.map((r) => <button key={r} className={`combo-item${goAB === r ? ' active' : ''}`} onClick={() => setGoAB(r)}>{r}</button>)}
      </div>
      <p style={{ fontWeight: 'bold', margin: '10px 0 4px' }}>ＢＣ間の道を選ぶ</p>
      <div className="combo-items">
        {BC_ROUTES.map((r) => <button key={r} className={`combo-item${goBC === r ? ' active' : ''}`} onClick={() => setGoBC(r)}>{r}</button>)}
      </div>

      {goAB && goBC && (
        <>
          <h3>帰り：Ｃ→Ｂ→Ａ（行きに通った道は使えません）</h3>
          <p style={{ fontWeight: 'bold', marginBottom: 4 }}>ＢＣ間の道を選ぶ（{goBC}は使えません）</p>
          <div className="combo-items">
            {BC_ROUTES.filter((r) => r !== goBC).map((r) => <button key={r} className={`combo-item${backBC === r ? ' active' : ''}`} onClick={() => setBackBC(r)}>{r}</button>)}
          </div>
          <p style={{ fontWeight: 'bold', margin: '10px 0 4px' }}>ＡＢ間の道を選ぶ（{goAB}は使えません）</p>
          <div className="combo-items">
            {AB_ROUTES.filter((r) => r !== goAB).map((r) => <button key={r} className={`combo-item${backAB === r ? ' active' : ''}`} onClick={() => setBackAB(r)}>{r}</button>)}
          </div>
        </>
      )}

      {goAB && goBC && backBC && backAB && (
        <p className="combo-message">往復ルート決定：Ａ→({goAB})→Ｂ→({goBC})→Ｃ→({backBC})→Ｂ→({backAB})→Ａ</p>
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 「積の法則」で考えます。Ａ地点からＢ地点に行く方法は3通り，Ｂ地点からＣ地点に行く方法は4通りあるので，3×4＝<b>12(通り)</b></p>
        <p>
          (2) 行きに通った道を帰りには通れませんので，Ｃ地点からＢ地点に行く方法は，行きに通った道以外の3通り，Ｂ地点からＡ地点に行く方法は，行きに通った道以外の2通りあるので，
          3×4×3×2＝<b>72(通り)</b>
        </p>
        <p>「積の法則」は【同時・連続して起こる事象】のときに用います。Ｃ地点に行くには，必ずＢ地点を通るため，「Ｂ地点に行く」と「Ｃ地点に行く」は連続して起こります。</p>
      </div>
    </div>
  )
}
