import { ComboPicker } from '../components/ComboPicker'

const POSITIONS = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ id: `p${n}`, label: String(n) }))

export default function AdvancedA1() {
  return (
    <div className="problem">
      <h2>応用問題A-1　数字とアルファベットのパスワード</h2>
      <div className="statement">
        <p className="setup">
          {'{0，1，2，6}'}の4つの数字と，{'{A，B，C}'}の3つのアルファベットを，すべて1つずつ使って，「0Ｂ61ＡＣ2」のような7文字のパスワードを作ります。
        </p>
        <ol className="question-list">
          <li>数字とアルファベットが交互にならぶようなパスワードは何通りできますか。</li>
          <li>「0Ａ12ＢＣ6」や「Ａ012Ｂ6Ｃ」などのように，数字だけを見ると0126の順にならび，アルファベットだけを見るとＡＢＣの順にならぶようなパスワードは何通りできますか。</li>
        </ol>
      </div>

      <h3>(1) 交互パターン</h3>
      <div className="stage">
        {['数', 'ア', '数', 'ア', '数', 'ア', '数'].map((s, i) => (
          <div key={i} className="slot-box" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: s === '数' ? '#bee3f8' : '#fbd38d' }}>{s}</div>
        ))}
      </div>

      <h3>(2) 7か所のうち3か所にアルファベットを置く</h3>
      <ComboPicker items={POSITIONS} pickCount={3} totalLabel="35通り" />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 数字とアルファベットが交互にならぶのは，「数ア数ア数ア数」のときです。これより，数4×ア3×数3×ア2×数2×ア1×数1＝<b>144(通り)</b>
        </p>
        <p>
          (2) 数字，アルファベット自体の順番を考える必要がないので，「玉のならべ方」と同様に，7か所のうちどこに3つのアルファベットがくるか，を考えます。これより，<sub>7</sub>C<sub>3</sub>＝7×6×5÷(3×2×1)＝<b>35(通り)</b>
        </p>
      </div>
    </div>
  )
}
