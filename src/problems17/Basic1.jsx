import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

function MiniCircular({ lap, speedA, speedB, dirB, labelA, labelB, tMax, jumps }) {
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax, { loop: true })
  const fracA = (speedA * t) / lap
  const fracB = (dirB * speedB * t) / lap
  return (
    <>
      <CircularTrackView label={`1周${lap}m`} points={[
        { label: labelA, color: '#3182ce', frac: fracA },
        { label: labelB, color: '#dd6b20', frac: fracB },
      ]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={tMax} playing={playing} setPlaying={setPlaying} jumps={jumps} />
    </>
  )
}

export default function Basic1() {
  return (
    <div className="problem">
      <h2>基本問題1</h2>
      <p className="statement">次の問いに答えなさい。</p>

      <h3>(1) すれちがい</h3>
      <p className="statement">1周960ｍの池のまわりを，兄は分速65ｍ，弟は分速55ｍで，同じ地点から同時に反対の方向に歩き出しました。2人がはじめてすれちがうのは，出発してから何分後ですか。</p>
      <MiniCircular lap={960} speedA={65} speedB={55} dirB={-1} labelA="兄" labelB="弟" tMax={12} jumps={[{ label: '8分後', t: 8 }]} />
      <div className="explain"><p>960÷(65＋55)＝<b>8(分後)</b>。</p></div>

      <h3>(2) 池の周の長さ（すれちがい時間から）</h3>
      <p className="statement">池のまわりを，兄は分速90ｍ，弟は分速60ｍで，同じ地点から同時に反対の方向に歩き出したところ，出発してから12分後に2人ははじめてすれちがいました。池のまわりの長さは何ｍですか。</p>
      <MiniCircular lap={1800} speedA={90} speedB={60} dirB={-1} labelA="兄" labelB="弟" tMax={15} jumps={[{ label: '12分後（すれちがい）', t: 12 }]} />
      <div className="explain"><p>□÷(90＋60)＝12(分後) より，□＝150×12＝<b>1800(ｍ)</b>。</p></div>

      <h3>(3) 追いこし</h3>
      <p className="statement">1周300ｍの運動場のトラックを，Ａ君は分速140ｍ，Ｂ君は分速115ｍで，同じ地点から同時に同じ方向に走り出しました。Ａ君がＢ君をはじめて追いこすのは，出発してから何分後ですか。</p>
      <MiniCircular lap={300} speedA={140} speedB={115} dirB={1} labelA="A" labelB="B" tMax={15} jumps={[{ label: '12分後', t: 12 }]} />
      <div className="explain"><p>300÷(140－115)＝<b>12(分後)</b>。</p></div>

      <h3>(4) 公園の周の長さ（追いこし時間から）</h3>
      <p className="statement">公園のまわりの道を，姉は分速80ｍ，妹は分速50ｍで，同じ地点から同時に同じ方向に歩き出したところ，出発してから13分後に姉は妹をはじめて追いこしました。公園のまわりの長さは何ｍですか。</p>
      <MiniCircular lap={390} speedA={80} speedB={50} dirB={1} labelA="姉" labelB="妹" tMax={16} jumps={[{ label: '13分後（追いこし）', t: 13 }]} />
      <div className="explain"><p>□÷(80－50)＝13(分後) より，□＝30×13＝<b>390(ｍ)</b>。</p></div>

      <h3>(5) 池の周の長さ（3回目のすれちがい）</h3>
      <p className="statement">池のまわりを，Ａ君は分速130ｍ，Ｂ君は分速110ｍで，同じ地点から同時に反対の方向に走り出したところ，2人が3回目にすれちがったのは出発してから10分後でした。池のまわりの長さは何ｍですか。</p>
      <MiniCircular lap={800} speedA={130} speedB={110} dirB={-1} labelA="A" labelB="B" tMax={12} jumps={[{ label: '10分後（3回目）', t: 10 }]} />
      <div className="explain"><p>□×3÷(130＋110)＝10(分後) より，□＝240×10÷3＝<b>800(ｍ)</b>。</p></div>

      <h3>(6) すれちがい・追いこしの両方から速さを求める</h3>
      <p className="statement">1周500ｍの池のまわりを，兄と弟が，それぞれ一定の速さで同じ地点から同時に走り出します。2人が反対の方向に走ると，出発してから2分後に2人ははじめてすれちがい，2人が同じ方向に歩くと，出発してから10分後に兄ははじめて弟を追いこします。兄，弟の速さはそれぞれ分速何ｍですか。</p>
      <MiniCircular lap={500} speedA={150} speedB={100} dirB={-1} labelA="兄(150)" labelB="弟(100)" tMax={12} jumps={[{ label: '2分後（すれちがい確認）', t: 2 }]} />
      <div className="explain">
        <p>500÷(兄＋弟)＝2(分後) より，兄＋弟＝250(ｍ/分)。500÷(兄－弟)＝10(分後) より，兄－弟＝50(ｍ/分)。</p>
        <p>和差算より，兄＝(250＋50)÷2＝<b>150(ｍ/分)</b>，弟＝(250－50)÷2＝<b>100(ｍ/分)</b>。</p>
      </div>

      <h3>(7) 池の周の長さ（追いこされた周回数から）</h3>
      <p className="statement">池のまわりを，姉と妹が同じ地点を同時に出発して，それぞれ一定の速さで同じ方向に何周も歩きました。出発してから20分後に妹は姉にはじめて追いこされ，このとき，妹は池のまわりをちょうど2周して出発地点にいました。姉の速さは分速78ｍだとすると，池のまわりの長さは何ｍですか。</p>
      <MiniCircular lap={520} speedA={78} speedB={520 * 2 / 20} dirB={1} labelA="姉" labelB="妹" tMax={22} jumps={[{ label: '20分後（追いこし）', t: 20 }]} />
      <div className="explain"><p>妹が2周したときに姉が追いこす(＝1周おくれ)ので，姉は20分で池を3周。池のまわりの長さは，78×20÷3＝<b>520(ｍ)</b>。</p></div>
    </div>
  )
}
