import { useState } from 'react'
import { combination } from '../utils/sequence'

const LABELS = ['C', 'D', 'E', 'F', 'G', 'H']

function outputs(aIn, bIn) {
  return LABELS.map((label, k) => {
    const fromA = (aIn * combination(5, k)) / 32
    const fromB = k >= 1 && k <= 3 ? (bIn * combination(2, k - 1)) / 4 : 0
    return { label, value: fromA + fromB, fromA, fromB }
  })
}

export default function Advanced3() {
  const [aIn, setAIn] = useState(64)
  const [bIn, setBIn] = useState(0)
  const outs = outputs(aIn, bIn)

  return (
    <div className="problem">
      <h2>最難関3　分岐して流れる水（AとB）</h2>
      <div className="statement">
        <p className="setup">
          図のように，ＡとＢから水を入れると線にそって上から下へ水が流れ，Ｃ～Ｈに分かれて水が出てきます。線が左下と右下に分岐するところでは，水の量が半分ずつに分かれます。
          Ａは頂点から5回分岐してＣ～Ｈ（6か所）に流れ，Ｂはとちゅうの段から入り，Ｄ・Ｅ・Ｆの3か所にのみ分かれて流れます。
        </p>
        <ol className="question-list">
          <li>Ａから64dLの水を入れるとき，Ｄから出てくる水の量は何dLですか。</li>
          <li>Ａからいくらかの水を，Ｂからはその半分の量の水を入れると，Ｄから36dLの水が出てきました。Ａから何dLの水を入れましたか。</li>
        </ol>
      </div>

      <div className="readout">
        <p>Ａの流量：<input type="range" min={0} max={128} value={aIn} onChange={(e) => setAIn(parseInt(e.target.value, 10))} /> {aIn}dL</p>
        <p>Ｂの流量：<input type="range" min={0} max={128} value={bIn} onChange={(e) => setBIn(parseInt(e.target.value, 10))} /> {bIn}dL</p>
      </div>

      <div className="stage">
        {outs.map((o) => (
          <div key={o.label} className="readout" style={{ textAlign: 'center', minWidth: 70 }}>
            <p style={{ fontWeight: 'bold', margin: 0 }}>{o.label}</p>
            <p style={{ margin: 0 }}>{o.value.toFixed(2)}dL</p>
          </div>
        ))}
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 図より，2＋8＝<b>10(dL)</b></p>
        <p>
          (2) Ａから入れた水のうち，Ｄに進む割合は，10/64です。また，Ｂから入れた水のうち，Ｄに進む割合は，16/64です。これより，Ａから入れた水の量を2とすると，Ｄから出てくる水の量は，
          2×10/64＋1×16/64＝9/16(dL)。9/16＝36 より，1＝64，2＝<b>128(dL)</b>
        </p>
      </div>
    </div>
  )
}
