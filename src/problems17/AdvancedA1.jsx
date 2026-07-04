import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

const AC = 2190
const AB = 3140
const SPEED_HANAKO = 60
const SPEED_TARO = 90
const BUS_START = 5 // 9:45（9:40からの経過分）
const SPEED_BUS = 650
const T_MAX = 16

function posHanako(t) { return SPEED_HANAKO * t }
function posTaro(t) { return AC - SPEED_TARO * t }
function posBus(t) { return t < BUS_START ? AB : AB - SPEED_BUS * (t - BUS_START) }

function toClock(t) {
  const totalSec = Math.round(t * 60)
  const h = 9
  const m = 40 + Math.floor(totalSec / 60)
  const s = totalSec % 60
  const mm = m % 60
  const hh = h + Math.floor(m / 60)
  return `${hh}時${mm}分${s.toString().padStart(2, '0')}秒`
}

export default function AdvancedA1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-1　バスと2人の旅人算（時刻）</h2>
      <div className="statement">
        <p className="setup">
          2つのバス停Ａ，Ｂの間にＣ地点があります。バス停ＢからＣ地点までの道のりは950ｍです。花子さんはバス停ＡからＣ地点に向かって，
          太郎君はＣ地点からバス停Ａに向かって，それぞれ一定の速さで午前9時40分に同時に歩き始めました。太郎君の速さは花子さんの速さの1.5倍です。
          また，バスが時速39kmでバス停Ｂからバス停Ａに向かって午前9時45分に出発しました。バスは午前9時47分30秒に太郎君を追いこし，
          午前9時49分に花子さんとすれちがいました。
        </p>
        <ol className="question-list">
          <li>太郎君の速さは分速何ｍですか。</li>
          <li>太郎君と花子さんがすれちがった時刻は午前何時何分何秒ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={AB}
        markers={[{ pos: 0, label: 'A' }, { pos: AC, label: 'C' }, { pos: AB, label: 'B' }]}
        points={[
          { label: '花子', color: '#dd6b20', pos: posHanako(t), row: 0 },
          { label: '太郎', color: '#3182ce', pos: posTaro(t), row: 1 },
          { label: 'バス', color: '#38a169', pos: posBus(t), row: 2 },
        ]}
      />

      <div className="readout">
        <p>9時40分からの経過：<b>{t.toFixed(2)}</b> 分後　＝　<b>{toClock(t)}</b></p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '7.5分後（バスが太郎を追いこす）', t: 7.5 },
          { label: '9分後（バスが花子とすれちがう）', t: 9 },
          { label: '14.6分後（太郎と花子がすれちがう）', t: 14.6 },
        ]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) バスの速さは分速650ｍ。バスは太郎君に追いつくまでに，650×(7.5－5)＝1625(ｍ)進んでいます。太郎君は7.5分で，1625－950＝675(ｍ)進んだので，速さは675÷7.5＝<b>90(ｍ/分)</b>。</p>
        <p>(2) 花子さんの速さは90÷1.5＝60(ｍ/分)。バス停ＡＢ間は60×9＋650×(9－5)＝3140ｍ，ＡＣ間は3140－950＝2190ｍ。太郎君と花子さんがすれちがうのは，2190÷(90＋60)＝14.6(分後)なので，<b>9時54分36秒</b>です。</p>
      </div>
    </div>
  )
}
