import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

function posCase1(t) {
  if (t <= 6) return 125 * t
  return Math.min(1200, 750 + 45 * (t - 6))
}
const T_MAX_1 = 16

function posCase2(t) {
  if (t <= 4) return 200 * t
  return Math.max(0, 800 - 50 * (t - 4))
}
const T_MAX_2 = 20

export default function Example2() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'
  const tMax = isCase1 ? T_MAX_1 : T_MAX_2
  const posFn = isCase1 ? posCase1 : posCase2
  const dist = isCase1 ? 1200 : 800
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax)
  const pos = posFn(t)

  return (
    <div className="problem">
      <h2>例題2　平均の速さ</h2>
      <div className="statement">
        <ol className="question-list">
          <li>たかし君の家から学校までは1200mあります。はじめの750mは分速125mで走り，残りは分速45mで歩きました。平均の速さは分速何mですか。</li>
          <li>Ａ地点とＢ地点は800mはなれています。1往復するのに，行きは分速200mで走り，帰りは分速50mで歩きました。往復の平均の速さは分速何mですか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => { setCaseKey('1'); setT(0) }}>(1) 家→学校</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => { setCaseKey('2'); setT(0) }}>(2) Ａ⇔Ｂ往復</button>
      </div>

      <LinearTrackView length={dist}
        markers={isCase1 ? [{ pos: 0, label: '家' }, { pos: 750, label: '750m' }, { pos: 1200, label: '学校' }] : [{ pos: 0, label: 'A' }, { pos: 800, label: 'B' }]}
        points={[{ label: '●', color: '#3182ce', pos }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　位置：<b>{pos.toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={tMax} playing={playing} setPlaying={setPlaying}
        jumps={isCase1 ? [{ label: '6分後（750mに到達）', t: 6 }, { label: '16分後（学校に到着）', t: 16 }] : [{ label: '4分後（Bに到達）', t: 4 }, { label: '20分後（Aに帰着）', t: 20 }]} />

      <div className="graph-block">
        <h3>道のりのグラフ</h3>
        <PositionDiagram tMax={tMax} yMax={dist} t={t} yLabel="位置(m)" xLabel="時間(分)"
          yBottomLabel={isCase1 ? '家' : 'A'} yTopLabel={isCase1 ? '学校' : 'B'}
          series={[{ label: '●', color: '#3182ce', fn: posFn }]} markLines={[]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) はじめの750mにかかった時間は，750÷125＝6(分)。残りの450mにかかった時間は，(1200－750)÷45＝10(分)。平均の速さは，1200÷(6＋10)＝<b>75(m/分)</b></p>
        <p>(2) 行きにかかった時間は，800÷200＝4(分)。帰りにかかった時間は，800÷50＝16(分)。往復の平均の速さは，800×2÷(4＋16)＝<b>80(m/分)</b></p>
      </div>
    </div>
  )
}
