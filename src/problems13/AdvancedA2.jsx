import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const OFFICE = 1440
const KOBAN = 900
const T_ARRIVE = 24
const T_LEAVE = 27
const T_MAX = 43

function pos(t) {
  if (t <= T_ARRIVE) return 60 * t
  if (t <= T_LEAVE) return OFFICE
  return Math.max(0, OFFICE - 90 * (t - T_LEAVE))
}

export default function AdvancedA2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-2　交番からのきょり</h2>
      <div className="statement">
        <p className="setup">
          Ａ君の家と郵便局は1440mはなれていて，Ａ君の家と郵便局を結ぶまっすぐな道の途中に交番があります。Ａ君は家を出発して一定の速さで郵便局まで歩きました。郵便局で用事をすませるのに3分かかり，行きの1.5倍の速さで家に帰りました。グラフは，Ａ君が家を出発してからの時間と，交番からＡ君までのきょりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>郵便局に向かったときの速さは分速何mですか。</li>
          <li>グラフのア，イ，ウにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={OFFICE} markers={[{ pos: 0, label: '家' }, { pos: KOBAN, label: '交番' }, { pos: OFFICE, label: '郵便局' }]}
        points={[{ label: 'Ａ君', color: '#3182ce', pos: pos(t) }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　交番からの距離：<b>{Math.abs(pos(t) - KOBAN).toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: 'イ＝15分後（交番を通過）', t: 15 },
          { label: '24分後（郵便局に到着）', t: 24 },
          { label: '27分後（用事を終え出発）', t: 27 },
          { label: '33分後（交番を再通過）', t: 33 },
          { label: 'ウ＝43分後（家に到着）', t: 43 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム（家からのきょり）</h3>
        <PositionDiagram tMax={T_MAX} yMax={OFFICE} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="郵便局"
          series={[{ label: 'Ａ君', color: '#3182ce', fn: pos }]} markLines={[{ t: 15, label: 'イ' }, { t: 24, label: '24' }, { t: 33, label: '33' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) グラフより，イ分後に交番を通過し，24分後に郵便局に着いたことがわかります。したがって，郵便局に向かったときの速さは，1440÷24＝<b>60(m/分)</b></p>
        <p>
          (2) 郵便局から帰るときの速さは，60×1.5＝90(m/分)です。郵便局を出発したのが，24＋3＝27(分後)。このことから，郵便局から交番までの道のりは，90×(33－27)＝540(m)。
          したがって，交番からＡ君の家までの道のり(ア)は，1440－540＝<b>900(m)</b>。続いて，行きに交番を通過した時間(イ)は，900÷60＝<b>15(分後)</b>。
          最後に，Ａ君が家に戻ってきた時間(ウ)は，900÷90＋33＝<b>43(分後)</b>
        </p>
      </div>
    </div>
  )
}
