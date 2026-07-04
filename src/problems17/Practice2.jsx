import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const HOUSE_GAP = 160 // AさんとBさんの家の間の距離
const SCHOOL = 1840 // Aさんの家から学校までの距離
const SPEED_B = 60
const START_A = 3
const SPEED_A = 80

function posB(t) { return Math.min(SCHOOL, HOUSE_GAP + SPEED_B * t) }
function posA(t) { return t < START_A ? 0 : Math.min(SCHOOL, SPEED_A * (t - START_A)) }
function dist(t) { return Math.abs(posB(t) - posA(t)) }

const T_MAX = 26

export default function Practice2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const d = dist(t)

  return (
    <div className="problem">
      <h2>練習問題2　家の位置がずれている二者間グラフ</h2>
      <div className="statement">
        <p className="setup">
          まっすぐな道にそって，Ａさんの家，Ｂさんの家，学校がこの順にあります。Ａさん，Ｂさんは，それぞれの家から一定の速さで学校に向かいました。
          Ｂさんは先に家を出ましたが，途中でＡさんに追いこされました。右のグラフは，Ｂさんが家を出てから学校に着くまでの時間と，2人の間のきょりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>Ａさん，Ｂさんの速さはそれぞれ分速何ｍですか。</li>
          <li>Ａさんの家から学校までのきょりは何ｍですか。</li>
        </ol>
      </div>

      <LinearTrackView length={SCHOOL}
        markers={[{ pos: 0, label: 'Aの家' }, { pos: HOUSE_GAP, label: 'Bの家' }, { pos: SCHOOL, label: '学校' }]}
        points={[{ label: 'A', color: '#3182ce', pos: posA(t) }, { label: 'B', color: '#dd6b20', pos: posB(t) }]}
      />

      <div className="readout"><p>経過時間（Ｂさんが出発してから）：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{d.toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '3分後（Aが出発）', t: 3 }, { label: '20分後（AがBに追いつく）', t: 20 }, { label: '26分後（Aが学校に到着）', t: 26 }]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={400} valueFn={dist} t={t}
          yLabel="きょり(m)" xLabel="時間(分)" markLines={[{ t: 3, label: '3' }, { t: 20, label: '20' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜3分後…Ｂさんだけが進んで，3分間で340－160＝180(ｍ)。Ｂさんの速さは，180÷3＝<b>60(ｍ/分)</b>。3〜20分後…ＡさんがＢさんを追いかけて，17分で340ｍ。速さの差は340÷17＝20。Ａさんの速さは60＋20＝<b>80(ｍ/分)</b>。</p>
        <p>(2) 20〜□分後…2人の間のきょりが120ｍになったとき，Ａさんが学校に着きます。120÷(80－60)＝6(分間)なので，□＝26(分)。Ａさんは3分後に出発して26分後に到着なので，かかった時間は23分。80×23＝<b>1840(ｍ)</b>。</p>
      </div>
    </div>
  )
}
