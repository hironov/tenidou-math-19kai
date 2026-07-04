import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { PositionDiagram } from '../components/PositionDiagram'

const DIST = 14000
const T_MAX = 82

function posAkira(t) {
  const cycles = Math.floor(t / 12)
  const rem = t - cycles * 12
  const local = Math.min(rem, 10) * 200
  return Math.min(DIST, cycles * 2000 + local)
}

function posSister(t) {
  if (t <= 50) return 0
  return Math.min(DIST, 560 * (t - 50))
}

function posFather(t) {
  if (t <= 18) return 0
  if (t <= 22) return 1000 * (t - 18)
  if (t <= 24) return 4000
  if (t <= 34) return 4000 + 1000 * (t - 24)
  if (t <= 54) return DIST
  if (t <= 58) return DIST - 1000 * (t - 54)
  if (t <= 60) return 10000
  if (t <= 70) return Math.max(0, 10000 - 1000 * (t - 60))
  return 0
}

function toClock(t) {
  const totalMin = Math.round(9 * 60 + t)
  const hh = Math.floor(totalMin / 60)
  const mm = totalMin % 60
  return `午前${hh}時${mm}分`
}

export default function AdvancedB1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 5 })

  return (
    <div className="problem">
      <h2>応用問題B-1　あきら君・お姉さん・お父さん</h2>
      <div className="statement">
        <p className="setup">
          あきら君は午前9時に家を出て，14kmはなれた公園まで分速200mで走って行きました。このとき，10分間走るたびに2分間休けいをとりました。
        </p>
        <ol className="question-list">
          <li>あきら君が公園に着いた時刻は午前何時何分ですか。</li>
          <li>あきら君のお姉さんは午前9時50分に家を出て，自転車で途中休けいをとらないで公園まで行きました。すると，お姉さんはあきら君よりも7分早く公園に着きました。お姉さんの速さは分速何mですか。</li>
          <li>
            あきら君のお父さんは，家から公園までを時速60kmの自動車で途中3回の休けいを入れて1往復しました。1回目の休けいはあきら君の2回目の休けいといっしょに同じ場所で2分間とり，
            2回目の休けいは公園で何分間かとり，3回目の休けいはあきら君の5回目の休けいといっしょに同じ場所で2分間とりました。お父さんの2回目の休けいは何分間でしたか。
          </li>
        </ol>
      </div>

      <div className="readout">
        <p>午前9時からの経過：<b>{t.toFixed(1)}</b> 分後　＝　<b>{toClock(t)}</b></p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate} rateOptions={[1, 5, 20]}
        jumps={[
          { label: '22分後（あきら2回目の休けい）', t: 22 },
          { label: '50分後（お姉さん出発）', t: 50 },
          { label: '58分後（あきら5回目の休けい）', t: 58 },
          { label: '70分後（お父さん帰宅・あきらは走行中）', t: 70 },
          { label: '75分後（お姉さん到着・10:15）', t: 75 },
          { label: '82分後（あきら到着・10:22）', t: 82 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={DIST} t={t} yLabel="道のり(m)" xLabel="時間(分)" yBottomLabel="家" yTopLabel="公園"
          series={[
            { label: 'あきら', color: '#3182ce', fn: posAkira },
            { label: 'お姉さん', color: '#dd6b20', fn: posSister },
            { label: 'お父さん', color: '#38a169', fn: posFather },
          ]}
          markLines={[{ t: 22, label: '22' }, { t: 58, label: '58' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 14km＝14000mより，あきら君が公園まで走るのにかかった時間は，14000÷200＝70(分)。この70分間を，10分走って2分休けいとしてくり返すと，
          70÷10＝7(周期)より，休けいを，7－1＝6(回)とることになります。したがって，公園に着いた時刻は，午前9時＋70分＋2分×6＝<b>午前10時22分</b>
        </p>
        <p>
          (2) お姉さんが公園に着いた時刻は，10時22分－7分＝10時15分。お姉さんが公園に着くまでにかかった時間は，10時15分－9時50分＝25(分)。
          したがって，お姉さんの速さは，14000÷25＝<b>560(m/分)</b>
        </p>
        <p>
          (3) あきら君が2回目に休けいをとってから5回目に休けいをとるまでの時間は，10×3＋2×2＝34(分間)。また，あきら君は10分走るごとに，200×10＝2000(m) ⇒ 2km進むので，
          2回目に休けいをとった場所から公園まで，5回目に休けいをとった場所から公園までの道のりはそれぞれ，2回目の休けい場所から公園までは，2×(7－2)＝10(km)。
          5回目の休けい場所から公園までは，2×(7－5)＝4(km)。お父さんは，この，10＋4＝14(km)進むのに，14÷60＝7/30(時間) ⇒ 14分間。
          したがって，お父さんが公園で休けいしていた時間は，34－14＝<b>20(分間)</b>
        </p>
      </div>
    </div>
  )
}
