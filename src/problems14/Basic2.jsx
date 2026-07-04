import { useState } from 'react'
import { TiltStageView } from '../components/TiltStageView'

const W = 6
const H = 12
const PAD = 20
const SCALE = 10
const sx = (x) => PAD + x * SCALE
const sy = (y) => PAD + (H - y) * SCALE

const OUTLINE = [
  [sx(0), sy(0)],
  [sx(W), sy(0)],
  [sx(W), sy(H)],
  [sx(0), sy(H)],
]

const STAGES = [
  {
    label: '図1（深さ6cm）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(6)], [sx(0), sy(6)]],
    marks: [{ x: sx(-0.3), y: sy(3), text: '6cm', anchor: 'end' }],
  },
  {
    label: '図2（かたむけ1）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(9)], [sx(0), sy(3)]],
    marks: [
      { x: sx(-0.3), y: sy(1.5), text: '3cm', anchor: 'end' },
      { x: sx(W + 0.3), y: sy(4.5), text: 'x', anchor: 'start' },
    ],
  },
  {
    label: '図3（かたむけ2）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(12)]],
    marks: [{ x: sx(W + 0.3), y: sy(6), text: 'y', anchor: 'start' }],
  },
]

export default function Basic2() {
  const [stageIndex, setStageIndex] = useState(0)

  return (
    <div className="problem">
      <h2>基本問題2　容器をかたむける（続）</h2>
      <div className="statement">
        <p className="setup">
          直方体の形の容器に，図1のように6cmの深さまで水が入っています。この容器を，1つの辺を床につけたまま，水がこぼれないように静かにかたむけていきます。図2，図3のとき，x，yの長さはそれぞれ何cmですか。
        </p>
      </div>

      <TiltStageView stages={STAGES} stageIndex={stageIndex} setStageIndex={setStageIndex} viewBox="0 0 100 160" />

      <div className="explain">
        <h3>解説</h3>
        <p>水はこぼれていないので，正面から見たときの面積は同じです。また，高さが等しい三角形・四角形は「上底＋下底」も等しいことに注目します。</p>
        <p>6＋6＝3＋x＝y より，x＝12－3＝<b>9(cm)</b>，y＝<b>12(cm)</b>です。</p>
      </div>
    </div>
  )
}
