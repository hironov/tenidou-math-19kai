import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { TiltStageView } from '../components/TiltStageView'
import { computeProfileDepth } from '../utils/tank'

function MiniTank({ segments, rate, tMax: forcedTMax, jumps, unitLabel = '分後' }) {
  const { depthAt, totalTime } = computeProfileDepth(segments, rate)
  const tMax = forcedTMax ?? totalTime
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax)
  const depth = depthAt(t)
  return (
    <div className="stage">
      <TankProfileView segments={segments.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} width={200} height={200} />
      <div style={{ flex: 1, minWidth: 240 }}>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> {unitLabel}</p>
          <p>水面の高さ：<b>{depth.toFixed(2)}</b> cm</p>
        </div>
        <TimeSlider t={t} setT={setT} tMax={tMax} playing={playing} setPlaying={setPlaying} jumps={jumps} />
      </div>
    </div>
  )
}

const W = 8
const H = 16
const PAD = 20
const SCALE = 8
const sx = (x) => PAD + x * SCALE
const sy = (y) => PAD + (H - y) * SCALE
const OUTLINE = [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(H)], [sx(0), sy(H)]]
const STAGES = [
  {
    label: '図1（かたむける前，深さ8cm）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(8)], [sx(0), sy(8)]],
    marks: [{ x: sx(-0.3), y: sy(4), text: '8cm', anchor: 'end' }],
  },
  {
    label: '図2（かたむけた後）',
    outline: OUTLINE,
    water: [[sx(0), sy(0)], [sx(W), sy(0)], [sx(W), sy(11)], [sx(0), sy(5)]],
    marks: [
      { x: sx(W + 0.3), y: sy(5.5), text: '11cm', anchor: 'start' },
      { x: sx(-0.3), y: sy(2.5), text: 'x', anchor: 'end' },
    ],
  },
]

export default function Basic8() {
  const [stageIndex, setStageIndex] = useState(0)

  return (
    <div className="problem">
      <h2>基本問題8　容器と水の体積</h2>
      <div className="statement">
        <ol className="question-list">
          <li>たて10cm，横15cmの直方体の容器に，2100cm3の水を入れると，水の深さは何cmになりますか。</li>
          <li>底面積が350cm2の容器に，毎分6dLの割合で水を入れます。水の深さが12cmになるのは何分後ですか。</li>
          <li>ある容器に水を入れるのに，はじめは毎分5dLの割合で入れていましたが，途中から毎分3dLの割合に変えたところ，22分で合計8L(80dL)の水を入れることができました。毎分3dLの割合で入れていたのは何分間ですか。</li>
          <li>直方体の容器に，深さ8cmまで水が入っています。図1の状態から容器をかたむけ，正面から見た水の断面が図2の台形になるようにしたところ，一方の辺の長さは11cmになりました。もう一方の辺(x)の長さは何cmですか。</li>
        </ol>
      </div>

      <h3>(1) たて10cm，横15cm，2100cm3</h3>
      <MiniTank segments={[{ height: 20, area: 150 }]} rate={150} tMax={14} jumps={[{ label: '14cm（2100cm3）', t: 14 }]} />
      <div className="explain"><p>10×15＝150(cm2)。2100÷150＝<b>14(cm)</b></p></div>

      <h3>(2) 底面積350cm2，毎分6dL</h3>
      <MiniTank segments={[{ height: 15, area: 350 }]} rate={600} tMax={7} jumps={[{ label: '7分後（深さ12cm）', t: 7 }]} />
      <div className="explain"><p>毎分6dL＝毎分600cm3。350×12÷600＝<b>7(分後)</b></p></div>

      <h3>(3) 途中で割合が変わる</h3>
      <div className="explain">
        <p>すべて毎分5dLの割合で22分間入れたとすると，5×22＝110(dL)。実際は80dLなので，その差は110－80＝30(dL)。1分あたりの差は5－3＝2(dL)なので，毎分3dLで入れていたのは，30÷2＝<b>15(分間)</b></p>
      </div>

      <h3>(4) 容器をかたむける</h3>
      <TiltStageView stages={STAGES} stageIndex={stageIndex} setStageIndex={setStageIndex} viewBox="0 0 100 160" />
      <div className="explain">
        <p>水はこぼれていないので，正面から見たときの面積は変わりません。高さが等しい台形は「上底＋下底」も等しいことに注目すると，8＋8＝x＋11 より，x＝16－11＝<b>5(cm)</b></p>
      </div>
    </div>
  )
}
