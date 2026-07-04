import { useState } from 'react'
import { TiltStageView } from '../components/TiltStageView'

const W = 24 // 辺ADの長さ（解説で求まる）
const H = 13 // 表示用の高さ範囲
const PAD = 20
const SCALE_X = 4
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
    label: '図1（深さ8cm）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(8)], [sx(0), sy(8)]],
    marks: [{ x: sx(-1), y: sy(4), text: '8cm', anchor: 'end' }],
  },
  {
    label: '図2（水面がMを通る）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(4)], [sx(0), sy(12)]],
    marks: [
      { x: sx(-1), y: sy(6), text: 'MD', anchor: 'end' },
      { x: sx(W + 1), y: sy(2), text: '4cm', anchor: 'start' },
    ],
  },
  {
    label: '図3（0.3Ｌこぼれる）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(0), sy(9)], [sx(W), sy(0)]],
    marks: [{ x: sx(-1), y: sy(4.5), text: '9cm', anchor: 'end' }],
  },
]

export default function Practice2() {
  const [stageIndex, setStageIndex] = useState(0)

  return (
    <div className="problem">
      <h2>練習問題2　容器をかたむける（3Ｌの水）</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器に3Ｌの水を入れたところ，水の深さは8cmになりました。この容器を，辺ＤＥを床につけたまま，静かにかたむけていきました。図2は，水面が辺ＡＤの真ん中の点Ｍに重なるまでかたむけたようすです。さらに，図3まで容器をかたむけたところ，水は0.3Ｌこぼれました。辺ＡＤ，辺ＡＣ，辺ＡＢの長さはそれぞれ何cmですか。
        </p>
      </div>

      <TiltStageView stages={STAGES} stageIndex={stageIndex} setStageIndex={setStageIndex} viewBox="0 0 120 160" />

      <div className="explain">
        <h3>解説</h3>
        <p>
          図1と図2では正面から見たときの面積が同じで，さらに高さも等しいことから，上底＋下底も等しいことがわかります。
          よって，8＋8＝ＭＤ＋4 より，ＭＤ＝16－4＝12(cm)。Ｍは辺ＡＤの中点なので，辺ＡＤ＝12×2＝<b>24(cm)</b>です。
        </p>
        <p>
          図3の水の量は，3－0.3＝2.7(Ｌ) → 2700cm3で，正面から見たときの面積は，9×24÷2＝108(cm2)ですから，
          奥行き(辺ＡＣ)の長さは，2700÷108＝<b>25(cm)</b>です。
        </p>
        <p>したがって，辺ＡＢの長さは，3000÷(8×25)＝<b>15(cm)</b>です。</p>
      </div>
    </div>
  )
}
