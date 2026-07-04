import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'
import { ValueGraph } from '../components/ValueGraph'

const LAP = 3000
const SPEED_TARO = 150
const SPEED_JIRO = 50
const REST_START = 13
const REST_END = 23
const T_MAX = 50

function posTaro(t) {
  if (t <= REST_START) return SPEED_TARO * t
  if (t <= REST_END) return SPEED_TARO * REST_START
  return SPEED_TARO * REST_START + SPEED_TARO * (t - REST_END)
}
function posJiro(t) { return SPEED_JIRO * t }
function shortGap(t) {
  const raw = Math.abs(posTaro(t) - posJiro(t)) % LAP
  return Math.min(raw, LAP - raw)
}

export default function AdvancedA4() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const fracTaro = posTaro(t) / LAP
  const fracJiro = posJiro(t) / LAP

  return (
    <div className="problem">
      <h2>応用問題A-4　休けいをはさむ2人の周回運動グラフ</h2>
      <div className="statement">
        <p className="setup">
          1周3kmの池のまわりを，太郎君と次郎君が同じ方向に同時に出発しました。2人はそれぞれ一定の速さで進みましたが，
          太郎君は出発してから13分後から23分後までの10分間だけ休みました。下のグラフは，2人が出発してからの時間と，
          2人の間のきょり（池のまわりにそってはかった短い方の長さ）の関係を表したグラフの一部です。
        </p>
        <ol className="question-list">
          <li>グラフのア，イにあてはまる数をそれぞれ求めなさい。</li>
          <li>太郎君，次郎君の速さはそれぞれ分速何ｍですか。</li>
          <li>グラフのウにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <CircularTrackView label="1周3000m" points={[
        { label: '太郎', color: '#3182ce', frac: fracTaro },
        { label: '次郎', color: '#dd6b20', frac: fracJiro },
      ]} />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり（短い方）：<b>{shortGap(t).toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '13分後（太郎が休み始める・イ）', t: 13 },
          { label: '23分後（太郎が再び進む・イ)', t: 23 },
          { label: '30分後（きょりが半分・ア）', t: 30 },
          { label: '45分後（太郎が次郎に追いつく・ウ）', t: 45 },
        ]} />

      <div className="graph-block">
        <h3>2人の間のきょり（短い方）のグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={1600} valueFn={shortGap} t={t}
          yLabel="きょり(m)" xLabel="時間(分)" markLines={[{ t: 13, label: '13' }, { t: 23, label: '23' }, { t: 30, label: '30' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜13分後，2人が同じ方向に進み1300ｍはなれる→速さの差は100(ｍ/分)。13〜23分後は太郎君が休むので差がちぢまり，23〜30分後は太郎君がふたたび進むので差が広がります（100×7＝700ｍ）。30分後に2人の間のきょりが池の半分になったことから，ア＝3000÷2＝<b>1500(ｍ)</b>，イ＝1500－700＝<b>800(ｍ)</b>。</p>
        <p>(2) 13〜23分後，次郎君だけが進んで，1300－800＝500ｍ。次郎君の速さは，500÷10＝<b>50(ｍ/分)</b>。太郎君の速さは，50＋100＝<b>150(ｍ/分)</b>。</p>
        <p>(3) 30分後の2人の間のきょりが1500ｍなので，1500÷100＝15(分)で太郎君が次郎君に追いつきます。よって，ウ＝30＋15＝<b>45(分)</b>。</p>
      </div>
    </div>
  )
}
