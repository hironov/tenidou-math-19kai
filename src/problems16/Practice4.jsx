import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 960
const SPEED_SHARED = 48
const C_TIME = 8 // C地点に着く時刻
const C_POS = SPEED_SHARED * C_TIME // 384
const SPEED_IMOTO_AFTER = 32
const SPEED_ANE_RUN = 96
const RETURN_TIME = 16 // 姉がA地点に戻る時刻
const T_MAX = 26

function posAne(t) {
  if (t <= C_TIME) return SPEED_SHARED * t
  if (t <= RETURN_TIME) return C_POS - SPEED_SHARED * (t - C_TIME)
  return Math.min(DIST, SPEED_ANE_RUN * (t - RETURN_TIME))
}
function posImoto(t) {
  if (t <= C_TIME) return SPEED_SHARED * t
  return Math.min(DIST, C_POS + SPEED_IMOTO_AFTER * (t - C_TIME))
}

export default function Practice4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>練習問題4　C地点で速さが変わる姉妹</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点とＢ地点は960ｍはなれています。姉と妹がＡ地点を同時に出発して，Ｂ地点に向かって歩き出しました。途中のＣ地点までは，2人は同じ速さでいっしょに歩いていましたが，
          Ｃ地点からは，妹はそれまでの2/3倍の速さで歩いてＢ地点まで行きました。姉は，Ｃ地点に着くとそれまでと同じ速さで歩いてＡ地点まで引き返し，Ａ地点に着くとそれまでの2倍の速さで走ってＢ地点に向かいました。
          姉は10分走ったところで，妹と同時にＢ地点に着きました。
        </p>
        <ol className="question-list">
          <li>妹はＣ地点からＢ地点まで分速何ｍで歩きましたか。</li>
          <li>グラフのxにあてはまる数を求めなさい。</li>
          <li>グラフのy，zにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: 'A' }, { pos: DIST, label: 'B' }, { pos: C_POS, label: 'C' }]}
        points={[{ label: '姉', color: '#3182ce', pos: posAne(t) }, { label: '妹', color: '#dd6b20', pos: posImoto(t) }]}
      />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '8分後（C地点に到着）', t: 8 },
          { label: '16分後（姉がAに戻る）', t: 16 },
          { label: '26分後（同時にBに到着）', t: 26 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="A" yTopLabel="B"
          series={[{ label: '姉', color: '#3182ce', fn: posAne }, { label: '妹', color: '#dd6b20', fn: posImoto }]}
          markLines={[{ t: 8, label: '8' }, { t: 16, label: '16' }, { t: 26, label: '26' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 姉が走ると10分で960ｍ進むので，その速さは96(ｍ/分)。これは「それまで」の2倍の速さなので，「それまで」の速さは48(ｍ/分)。妹はＣ地点以降，48×2/3＝<b>32(ｍ/分)</b>で歩きました。</p>
        <p>(2) 姉が引き返してA地点に着いたあとの様子から，x÷(96－32)＝10(分) より，x＝<b>640(ｍ)</b>。</p>
        <p>(3) 2人がＣ地点に着いてから姉がＡ地点にもどるまでの様子から，640÷(32＋48)＝8(分間)。y＝48×8＝<b>384(ｍ)</b>。2人がＣ地点に着いたのは，384÷48＝8分後。よって，z＝8＋8＋10＝<b>26(分)</b>。</p>
      </div>
    </div>
  )
}
