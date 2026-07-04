import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 900
const SPEED_A = 40
const SPEED_B = 60
const WALK_T = 5
const REST_T = 3
const CYCLE = WALK_T + REST_T
const T_MAX = 24

function posA(t) { return Math.min(DIST, SPEED_A * t) }
function posB(t) {
  const cycles = Math.floor(t / CYCLE)
  const rem = t - cycles * CYCLE
  const local = rem <= WALK_T ? SPEED_B * rem : SPEED_B * WALK_T
  return Math.min(DIST, cycles * SPEED_B * WALK_T + local)
}

export default function AdvancedA3() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-3　休みながら山頂を目指すＢ君</h2>
      <div className="statement">
        <p className="setup">
          Ａ君とＢ君が同じ地点から同時に出発して，900ｍはなれた山頂に向かいました。Ａ君は山頂まで分速40ｍで休まず進みました。
          Ｂ君は分速60ｍで5分進んでは3分休むことをくり返しながら山頂に向かいました。
        </p>
        <ol className="question-list">
          <li>Ｂ君が山頂に着いてから何分何秒後に，Ａ君が山頂に着きましたか。</li>
          <li>Ａ君がＢ君をはじめて追いこしたのは，2人が出発してから何分何秒後ですか。</li>
          <li>Ｂ君がＡ君を最後に追いこしたのは，出発地点から何ｍの地点ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: '出発' }, { pos: DIST, label: '山頂' }]}
        points={[{ label: 'A', color: '#3182ce', pos: posA(t) }, { label: 'B', color: '#dd6b20', pos: posB(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '7.5分後（Aが1回目に追いこす）', t: 7.5 },
          { label: '18分後（Bが最後に追いこす・720m）', t: 18 },
          { label: '21分後（Bが山頂に到着）', t: 21 },
          { label: '22.5分後（Aが山頂に到着）', t: 22.5 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="出発" yTopLabel="山頂"
          series={[{ label: 'A', color: '#3182ce', fn: posA }, { label: 'B', color: '#dd6b20', fn: posB }]}
          markLines={[{ t: 18, label: '18' }, { t: 21, label: '21' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) Ａ君は900÷40＝22.5(分)。Ｂ君は900÷60＝15(分)歩くので，15÷5＝3(周期)ちょうどより2回休み，15＋3×2＝21(分)で山頂に着きます。22.5－21＝<b>1分30秒後</b>。</p>
        <p>(2) Ｂ君が1回目に休むのは，60×5＝300ｍ進んだ地点で，5＋3＝8分後までここにいます。Ａ君が300ｍ進むには，300÷40＝7.5分かかるので，このときＡ君はＢ君を追いこします。<b>7分30秒後</b>。</p>
        <p>(3) Ｂ君が山頂に着いたとき，Ａ君は山頂まであと1.5分の地点にいるので，2人は40×1.5＝60ｍはなれています。Ｂ君がＡ君を最後に追いこしたのは，Ｂ君が山頂に着くよりも60÷(60－40)＝3分前なので，21－3＝18(分後)。よって，40×18＝<b>720(ｍ)</b>。</p>
      </div>
    </div>
  )
}
