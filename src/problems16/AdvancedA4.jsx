import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 1890 // 解説で求まる値（家から郵便局まで）
const HEAD_START = 300
const SPEED_OTOTO = 50
const SPEED_ANI = 70
const TURN_ANI = 27
const T_MAX = 32

function posOtoto(t) { return Math.min(DIST, HEAD_START + SPEED_OTOTO * t) }
function posAni(t) {
  if (t <= TURN_ANI) return Math.min(DIST, SPEED_ANI * t)
  return Math.max(0, DIST - SPEED_ANI * (t - TURN_ANI))
}

export default function AdvancedA4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-4　郵便局へ行き来する兄弟</h2>
      <div className="statement">
        <p className="setup">
          兄と弟が家と郵便局の間の道をそれぞれ一定の速さで往復しました。弟は兄より先に家を出発し，兄が家を出発したときに，弟は家から300ｍの地点にいました。
          また，兄が郵便局に着いたとき，弟は郵便局まであと240ｍの地点にいました。グラフは，兄が家を出発してからの2人が進んだようすを表したものです。
        </p>
        <ol className="question-list">
          <li>グラフのxにあてはまる数を求めなさい。</li>
          <li>兄の速さは分速何ｍですか。</li>
          <li>弟が郵便局に着いたとき，兄は郵便局から何ｍはなれた地点にいましたか。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '郵便局' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />
      <div className="readout"><p>兄が出発してからの経過：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '15分後（兄が弟を追いこす）', t: 15 },
          { label: 'x＝27分後（兄が郵便局に到着）', t: 27 },
          { label: '29分後（兄と弟が再会）', t: 29 },
          { label: '31.8分後（弟が郵便局に到着）', t: 31.8 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="郵便局"
          series={[{ label: '兄', color: '#3182ce', fn: posAni }, { label: '弟', color: '#dd6b20', fn: posOtoto }]}
          markLines={[{ t: 15, label: '15' }, { t: 27, label: 'x' }, { t: 29, label: '29' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 300÷15＝20(ｍ/分)…兄と弟の速さの差。240÷20＝12(分)…兄が弟を追いこしてから郵便局に着くまでの時間。x＝15＋12＝<b>27(分)</b>。</p>
        <p>(2) 240÷(29－27)＝120(ｍ/分)…兄と弟の速さの和。和差算より，兄の速さ…(120＋20)÷2＝<b>70(ｍ/分)</b>（弟の速さ…50ｍ/分）。</p>
        <p>(3) 家から郵便局までの道のりは，70×27＝1890(ｍ)。弟が郵便局に着くのは，(1890－300)÷50＝31.8(分後)。兄は27分後に郵便局から家に向かうので，70×(31.8－27)＝<b>336(ｍ)</b>。</p>
      </div>
    </div>
  )
}
