import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const DIST = 3000 // 家〜公園
const SPEED_ANI = 250
const SPEED_OTOTO = 150
const T_MAX = 40

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}
function posAni(t) { return pingpong(SPEED_ANI * t, DIST) }
function posOtoto(t) { return pingpong(SPEED_OTOTO * t, DIST) }
function dist(t) { return Math.abs(posAni(t) - posOtoto(t)) }

export default function Practice5() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const d = dist(t)

  return (
    <div className="problem">
      <h2>練習問題5　家と公園を1往復する二者間グラフ</h2>
      <div className="statement">
        <p className="setup">
          兄と弟が家を同時に出発して，家と公園の間をそれぞれ一定の速さで1往復しました。右のグラフは，2人が出発してから弟が家にもどるまでの時間と，
          2人の間のきょりの関係を表したものです。兄は弟よりも速いものとします。
        </p>
        <ol className="question-list">
          <li>兄，弟の速さはそれぞれ分速何ｍですか。</li>
          <li>グラフのア〜オにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={DIST}
        markers={[{ pos: 0, label: '家' }, { pos: DIST, label: '公園' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{(d / 1000).toFixed(2)}</b> km</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '12分後（兄が公園に到着）', t: 12 },
          { label: '15分後（すれちがう）', t: 15 },
          { label: 'ア＝20分後（弟が公園に到着）', t: 20 },
          { label: 'イ＝24分後（兄が家に到着）', t: 24 },
          { label: 'ウ＝40分後（弟が家に到着）', t: 40 },
        ]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={3200} valueFn={dist} t={t}
          yLabel="きょり(m)" xLabel="時間(分)" markLines={[{ t: 12, label: '12' }, { t: 15, label: '15' }, { t: 20, label: 'ア' }, { t: 24, label: 'イ' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜12分後…2人が同じ方向に進み，12分間で1.2km離れる→速さの差は100(ｍ/分)。12〜15分後…2人が逆方向に進み，3分間で1.2km縮む→速さの和は400(ｍ/分)。和差算より，兄の速さは<b>分速250ｍ</b>，弟の速さは<b>分速150ｍ</b>。</p>
        <p>(2) 家から公園までは250×12＝3000ｍ。弟は片道3000÷150＝20分かかります。ア＝<b>20分後</b>（弟が公園着），イ＝<b>24分後</b>（兄が家着，12×2），ウ＝<b>40分後</b>（弟が家着，20×2）。エ＝<b>2km</b>（20分後：兄は5000ｍ進み公園から2000ｍの地点），オ＝<b>2.4km</b>（24分後：弟は3600ｍ進み家まであと2400ｍ）。</p>
      </div>
    </div>
  )
}
