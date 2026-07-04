import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const ROUTE = 32400
const SPEED_Q = 720
const AC = 14400 // ①の設定にもとづく（②の図示にも便宜上利用）
const REST = 10

function makePosP(speedP, ac) {
  const restStart = ac / speedP
  const restEnd = restStart + REST
  return function posP(t) {
    if (t <= restStart) return speedP * t
    if (t <= restEnd) return ac
    return Math.min(ROUTE, ac + speedP * (t - restEnd))
  }
}
function posQ(t) { return Math.min(ROUTE, SPEED_Q * t) }

export default function AdvancedB1() {
  const [mode, setMode] = useState('1')
  const speedP = mode === '1' ? 720 : 1120
  const posP = makePosP(speedP, AC)
  const T_MAX = 50
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX)
  const gap = posP(t) - posQ(t)

  return (
    <div className="problem">
      <h2>応用問題B-1　休けいする車Pと止まらない車Q</h2>
      <div className="statement">
        <p className="setup">
          2台の車Ｐ，Ｑは，Ａ地点を同時に出発し，32.4km先にあるＢ地点に向かい，Ｂ地点に着くと止まりました。Ｐは途中のＣ地点で10分間止まりましたが，
          それ以外は同じ速さで走りました。また，Ｑは途中で止まることなく分速720ｍで走りました。
        </p>
        <ol className="question-list">
          <li>アにあてはまる数を求めなさい（Ｑがゴールするまでの時間）。</li>
          <li>ＱがＰの後ろ1kmの位置にいることが4回ありました。① 2回目の25分後に4回目が起こったとすると，Ａ地点からＣ地点までの道のりは何kmですか。② 1回目の28分後に3回目が起こったとすると，Ｐの速さは時速何kmですか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === '1' ? ' active' : ''}`} onClick={() => { setMode('1'); setT(0) }}>① AC=14.4km・Pも分速720m</button>
        <button className={`jump-btn${mode === '2' ? ' active' : ''}`} onClick={() => { setMode('2'); setT(0) }}>② Pの速さ＝分速1120m</button>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: 'A' }, { pos: AC, label: 'C' }, { pos: ROUTE, label: 'B' }]}
        points={[{ label: 'P', color: '#3182ce', pos: posP(t) }, { label: 'Q', color: '#dd6b20', pos: posQ(t) }]}
      />
      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　ＰとＱの差（Ｐ－Ｑ）：<b>{gap.toFixed(0)}</b> m</p>
        {Math.abs(Math.abs(gap) - 1000) < 15 && <p className="highlight">ちょうど1kmの差です！</p>}
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[{ label: 'ア＝45分後（Qがゴール）', t: 45 }]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={ROUTE} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: 'P', color: '#3182ce', fn: posP }, { label: 'Q', color: '#dd6b20', fn: posQ }]}
          markLines={[{ t: 45, label: 'ア' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ｑに注目して，ア＝32400÷720＝<b>45(分)</b>。</p>
        <p>
          (2)① 25分間でＱは，720×25＝18000ｍ＝18km進みます。ＣとＢの間の道のりは，18＋1－1＝18(km)なので，
          ＡとＣの間の道のりは，32.4－18＝<b>14.4(km)</b>。
        </p>
        <p>
          ② 28分間でＱは，720×28＝20160ｍ進みます。この間にＰは，28－10＝18(分間)進んでいて，進んだ道のりは，
          20160－1000＋1000＝20160(ｍ)です。よってＰの速さは，20160÷18＝1120(ｍ/分)＝<b>67.2km/時</b>。
        </p>
      </div>
    </div>
  )
}
