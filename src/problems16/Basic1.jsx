import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

function pingpong(distTraveled, d) {
  const period = 2 * d
  const raw = ((distTraveled % period) + period) % period
  return raw <= d ? raw : period - raw
}

function MiniLinear({ dist, posA, posB, labelA, labelB, tMax, jumps, markers }) {
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax, { loop: true })
  return (
    <>
      <LinearTrackView length={dist} markers={markers || [{ pos: 0, label: 'A' }, { pos: dist, label: 'B' }]}
        points={[{ label: labelA, color: '#3182ce', pos: posA(t) }, { label: labelB, color: '#dd6b20', pos: posB(t) }]} />
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

      <h3>(1) 反対方向</h3>
      <p className="statement">兄と弟が，同じ地点から同時に反対の方向に歩き出しました。兄は分速50ｍ，弟は分速40ｍで歩くものとすると，歩き出してから2分後には，2人は何ｍはなれていますか。</p>
      <MiniLinear dist={400} posA={(t) => 200 - 50 * t} posB={(t) => 200 + 40 * t}
        markers={[]} labelA="兄" labelB="弟" tMax={3} jumps={[{ label: '2分後', t: 2 }]} />
      <div className="explain"><p>(50＋40)×2＝<b>180(ｍ)</b>。</p></div>

      <h3>(2) 同じ方向</h3>
      <p className="statement">姉と妹が，同じ地点から同時に同じ方向に歩き出しました。姉は分速65ｍ，妹は分速45ｍで歩くものとすると，歩き出してから5分後には，2人は何ｍはなれていますか。</p>
      <MiniLinear dist={400} posA={(t) => 65 * t} posB={(t) => 45 * t}
        markers={[]} labelA="姉" labelB="妹" tMax={6} jumps={[{ label: '5分後', t: 5 }]} />
      <div className="explain"><p>(65－45)×5＝<b>100(ｍ)</b>。</p></div>

      <h3>(3) すれちがい</h3>
      <p className="statement">駅と図書館は600ｍはなれています。太郎君は分速50ｍで駅から図書館に向かって，お父さんは分速70ｍで図書館から駅に向かって，同時に歩き出しました。2人がすれちがったのは，歩き出してから何分後ですか。</p>
      <MiniLinear dist={600} posA={(t) => 50 * t} posB={(t) => 600 - 70 * t}
        markers={[{ pos: 0, label: '駅' }, { pos: 600, label: '図書館' }]} labelA="太郎" labelB="父" tMax={7} jumps={[{ label: '5分後', t: 5 }]} />
      <div className="explain"><p>600÷(50＋70)＝<b>5(分後)</b>。</p></div>

      <h3>(4) 追いつき（先に進んでいた分）</h3>
      <p className="statement">弟が家から分速40ｍで歩き出しました。弟が200ｍ進んだときに兄が家を出て，分速90ｍで弟を追いかけました。兄が弟に追いついたのは，兄が家を出てから何分後ですか。</p>
      <MiniLinear dist={500} posA={(t) => 200 + 40 * t} posB={(t) => 90 * t}
        markers={[{ pos: 0, label: '家' }]} labelA="弟" labelB="兄" tMax={5} jumps={[{ label: '4分後', t: 4 }]} />
      <div className="explain"><p>200÷(90－40)＝<b>4(分後)</b>。</p></div>

      <h3>(5) 追いつき（時間差）</h3>
      <p className="statement">妹が家から分速60ｍで歩き出しました。その10分後に姉が家を出て，分速180ｍの自転車で妹を追いかけました。姉が妹に追いついたのは，姉が家を出てから何分後ですか。また，姉が妹に追いついた地点は，家から何ｍはなれていますか。</p>
      <MiniLinear dist={1000} posA={(t) => 60 * (t + 10)} posB={(t) => 180 * t}
        markers={[{ pos: 0, label: '家' }]} labelA="妹" labelB="姉" tMax={6} jumps={[{ label: '5分後（追いつく）', t: 5 }]} />
      <div className="explain"><p>姉が出発するまでに妹は600ｍ進んでいます。追いつくのは，600÷(180－60)＝<b>5(分後)</b>。地点は家から，180×5＝<b>900(ｍ)</b>。</p></div>

      <h3>(6) 往復ですれちがい</h3>
      <p className="statement">Ａ地点とＢ地点は400ｍはなれています。兄と弟はＡ地点を同時に出発して，兄は分速45ｍ，弟は分速35ｍでそれぞれＡＢ間を1往復しました。2人がすれちがったのは，出発してから何分後ですか。また，2人がすれちがった地点は，Ａ地点から何ｍはなれていますか。</p>
      <MiniLinear dist={400} posA={(t) => pingpong(45 * t, 400)} posB={(t) => pingpong(35 * t, 400)}
        labelA="兄" labelB="弟" tMax={12} jumps={[{ label: '10分後（すれちがい）', t: 10 }]} />
      <div className="explain"><p>2人が進んだ道のりの和は，400×2＝800(ｍ)。800÷(45＋35)＝<b>10(分後)</b>。地点は，弟に注目して，35×10＝<b>350(ｍ)</b>。</p></div>

      <h3>(7) 往復のすれちがいからＡＢ間を求める</h3>
      <p className="statement">一郎君と二郎君はＡ地点を同時に出発して，一郎君は分速140ｍ，二郎君は分速110ｍでそれぞれＡＢ間を1往復しました。このとき，2人は出発してから6分後にすれちがいました。Ａ地点とＢ地点は何ｍはなれていますか。</p>
      <MiniLinear dist={750} posA={(t) => pingpong(140 * t, 750)} posB={(t) => pingpong(110 * t, 750)}
        labelA="一郎" labelB="二郎" tMax={9} jumps={[{ label: '6分後（すれちがい）', t: 6 }]} />
      <div className="explain"><p>2人が進んだ道のりの和は，(140＋110)×6＝1500(ｍ)。これがＡＢ間の2倍なので，1500÷2＝<b>750(ｍ)</b>。</p></div>
    </div>
  )
}
