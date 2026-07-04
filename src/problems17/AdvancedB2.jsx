import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'
import { ValueGraph } from '../components/ValueGraph'

const LAP = 3600
const SPEED_TOMOKO = 240
const SPEED_MANABU = 60
const T_MAX = 40

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posTomoko(t) { return pingpong(SPEED_TOMOKO * t, LAP) }
function posManabu(t) { return pingpong(SPEED_MANABU * t, LAP) }
function shortGap(t) {
  const raw = Math.abs(posTomoko(t) - posManabu(t))
  return Math.min(raw, LAP - raw)
}

export default function AdvancedB2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const fracTomoko = posTomoko(t) / LAP
  const fracManabu = posManabu(t) / LAP

  return (
    <div className="problem">
      <h2>応用問題B-2　折り返しながら周回する2人（自転車と徒歩）</h2>
      <div className="statement">
        <p className="setup">
          1周3.6kmの池があります。友子さんと学君が同じスタート地点から同時に出発し，友子さんは自転車で，学君は徒歩で，それぞれ一定の速さで同じ方向に進みます。
          友子さんの進む速さは時速14.4kmです。2人はそれぞれスタート地点までもどってきたら，休むことなく速さを変えず逆向きに進みます。
          下のグラフは，2人が出発してからの時間と，2人の間のきょり（池のまわりにそってはかった短い方の長さ）の関係を表したグラフの一部です。
          学君の歩く速さは友子さんの自転車の速さよりおそいものとします。
        </p>
        <ol className="question-list">
          <li>学君の歩く速さは分速何ｍですか。</li>
          <li>グラフのア，イ，ウ，エにあてはまる数をそれぞれ求めなさい。</li>
          <li>出発してから3回目に2人の間のきょりが1.3kmとなるのは，出発してから何分何秒後ですか。</li>
        </ol>
      </div>

      <CircularTrackView label="1周3.6km" points={[
        { label: '友子(240)', color: '#3182ce', frac: fracTomoko },
        { label: '学(60)', color: '#dd6b20', frac: fracManabu },
      ]} />

      <div className="readout"><p>経過時間：<b>{t.toFixed(2)}</b> 分後　／　2人の間のきょり（短い方）：<b>{(shortGap(t) / 1000).toFixed(3)}</b> km</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '10分後（ア：きょりが最大1.8km）', t: 10 },
          { label: '15分後（イ：友子が1周）', t: 15 },
          { label: '18分後（エ：きょりが再び1.8km）', t: 18 },
          { label: '16分20秒後（3回目に1.3km）', t: 16 + 1 / 3 },
        ]} />

      <div className="graph-block">
        <h3>2人の間のきょり（短い方）のグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={2000} valueFn={shortGap} t={t}
          yLabel="きょり(m)" xLabel="時間(分)" markLines={[{ t: 10, label: '10' }, { t: 15, label: '15' }, { t: 18, label: '18' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 2人の間のきょりが最大になるのは，池のまわりの半分のときで，1.8km。時速14.4km＝分速240ｍより，1800÷(240－学)＝10(分)，学君の速さは<b>分速60ｍ</b>。</p>
        <p>(2) ア＝<b>1.8km</b>。イは友子さんがスタート地点にはじめてもどってきたときで，イ＝3600÷240＝<b>15(分)</b>。15分間で学君は60×15＝900ｍ進んでいるので，ウ＝<b>0.9km</b>。このあと友子さんが学君と反対方向に進み，きょりが1800ｍになるのは，(1800－900)÷(240＋60)＝3(分後)より，エ＝15＋3＝<b>18(分)</b>。</p>
        <p>(3) 15分後から18分後は2人が反対方向に進むので，(1300－900)÷(240＋60)＝1と1/3(分)＝1分20秒。よって，15分＋1分20秒＝<b>16分20秒後</b>です。</p>
      </div>
    </div>
  )
}
