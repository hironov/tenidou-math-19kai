import { useState } from 'react'
import { TiltStageView } from '../components/TiltStageView'

const W = 10 // 容器の幅（左右の辺の間の距離）
const H = 12 // 容器の高さ

// モデル座標 (x:0〜W, y:0=床 12=ふち) → SVG座標に変換
const PAD = 20
const SCALE_X = 10
const SCALE_Y = 10
const sx = (x) => PAD + x * SCALE_X
const sy = (y) => PAD + (H - y) * SCALE_Y

const OUTLINE = [
  [sx(0), sy(0)],
  [sx(W), sy(0)],
  [sx(W), sy(H)],
  [sx(0), sy(H)],
]

const STAGES = [
  {
    label: '図1（傾ける前）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(9)], [sx(0), sy(9)]],
    marks: [{ x: sx(-0.3), y: sy(4.5), text: '9cm', anchor: 'end' }],
  },
  {
    label: '図2（水面がふちに）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(12)], [sx(0), sy(6)]],
    marks: [{ x: sx(-0.3), y: sy(3), text: 'x', anchor: 'end' }],
  },
  {
    label: '図3（140cm³こぼれる）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(12)], [sx(0), sy(2)]],
    marks: [{ x: sx(-0.3), y: sy(1), text: '2cm', anchor: 'end' }],
  },
  {
    label: '図4（さらに294cm³減る）',
    outline: OUTLINE,
    water: [[sx(2), sy(0)], [sx(W), sy(0)], [sx(W), sy(12)]],
    marks: [{ x: sx(1), y: sy(0) + 12, text: 'y', anchor: 'middle' }],
  },
]

export default function Example5() {
  const [stageIndex, setStageIndex] = useState(0)

  return (
    <div className="problem">
      <h2>例題5　容器を辺を軸にかたむける</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器に，はじめ，9cmの深さまで水が入っています。この容器を，辺ＡＢを床につけたまま静かにかたむけていきました。
        </p>
        <ol className="question-list">
          <li>図2のように，水がこぼれることなく水面が容器のふちにかかったとき，図のxの長さは何cmですか。</li>
          <li>(1)の後，容器を図3までかたむけたところ，140cm3の水がこぼれました。辺ＡＢの長さは何cmですか。</li>
          <li>(2)の後，容器をさらに図4までかたむけると，容器に残っている水の量は，はじめよりも294cm3少なくなりました。図のyの長さは何cmですか。</li>
        </ol>
      </div>

      <TiltStageView stages={STAGES} stageIndex={stageIndex} setStageIndex={setStageIndex} viewBox="0 0 140 160" />

      <div className="explain">
        <h3>解説</h3>
        <p>辺を軸にして容器を傾ける場合，奥行きの長さ（ＡＢ）は変わらないので，正面から見た図で考えます。</p>
        <p>(1) 水はこぼれていないので面積は同じです。上底＋下底は等しいので，9＋9＝x＋12 より，<b>x＝6cm</b>です。</p>
        <p>(2) 図2と図3を比べると，正面から見たときの面積が，(6－2)×10÷2＝20(cm2)減っています。20×ＡＢ＝140(cm3)なので，ＡＢ＝140÷20＝<b>7(cm)</b>です。</p>
        <p>(3) 294÷7＝42(cm2)…正面から見た面積のうち減った分。10×9－42＝48(cm2)…図4の面積。48×2÷12＝<b>8(cm)</b>…y</p>
      </div>
    </div>
  )
}
