import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'

export default function Example2() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'
  const SPEED_OTOTO = 75, START_ANI = 10, SPEED_ANI = 100, T_MAX1 = 40
  const SPEED_HIKARU = 60, START_MOM = 9, SPEED_MOM = 240, T_MAX2 = 15

  const tMax = isCase1 ? T_MAX1 : T_MAX2
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax)

  const posOtoto = SPEED_OTOTO * t
  const posAni = t < START_ANI ? 0 : SPEED_ANI * (t - START_ANI)
  const posHikaru = SPEED_HIKARU * t
  const posMom = t < START_MOM ? 0 : SPEED_MOM * (t - START_MOM)

  const posA = isCase1 ? posOtoto : posHikaru
  const posB = isCase1 ? posAni : posMom
  const routeLen = isCase1 ? 3200 : 1000

  return (
    <div className="problem">
      <h2>例題2　追いつきの基礎</h2>
      <div className="statement">
        <p className="setup">
          (1) 弟が家から分速75ｍで歩き出しました。その10分後に兄が家を出て，分速100ｍで弟を追いかけました。
        </p>
        <p className="setup">
          (2) ひかるさんが家から一定の速さで歩き出しました。ひかるさんが540ｍ進んだときにお母さんが家を出て，分速240ｍの自転車でひかるさんを追いかけました。すると，お母さんは自転車で3分走ったところでひかるさんに追いつきました。
        </p>
        <ol className="question-list">
          <li>(1) 兄が弟に追いついたのは，兄が家を出てから何分後ですか。</li>
          <li>(2) ひかるさんの速さは分速何ｍですか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => { setCaseKey('1'); setT(0) }}>(1) 弟と兄</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => { setCaseKey('2'); setT(0) }}>(2) ひかるとお母さん</button>
      </div>

      <LinearTrackView length={routeLen}
        markers={[{ pos: 0, label: '家' }]}
        points={isCase1
          ? [{ label: '弟', color: '#dd6b20', pos: posA }, { label: '兄', color: '#3182ce', pos: posB }]
          : [{ label: 'ひかる', color: '#dd6b20', pos: posA }, { label: 'お母さん', color: '#3182ce', pos: posB }]}
      />

      <div className="readout"><p>経過時間（弟／ひかるの出発から）：<b>{t.toFixed(1)}</b> 分後</p></div>
      <TimeSlider t={t} setT={setT} tMax={tMax} playing={playing} setPlaying={setPlaying}
        jumps={isCase1
          ? [{ label: '10分後（兄が出発）', t: 10 }, { label: '40分後（追いつく）', t: 40 }]
          : [{ label: '9分後（お母さんが出発）', t: 9 }, { label: '12分後（追いつく）', t: 12 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 弟が歩き出してから10分間で，弟は兄よりも，75×10＝750(ｍ)先に進みます。この道のりを追いかけるので，750÷(100－75)＝<b>30(分後)</b>。</p>
        <p>(2) 540÷(240－□)＝3(分) より，540÷3＝180，□＝240－180＝<b>60(ｍ/分)</b>。</p>
      </div>
    </div>
  )
}
