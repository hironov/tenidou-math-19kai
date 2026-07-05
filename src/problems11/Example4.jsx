import { useState } from 'react'
import { SlotSequence } from '../components/SlotSequence'

const PEOPLE = [
  { key: 'father', label: '父', count: 1, swatch: '#63b3ed' },
  { key: 'mother', label: '母', count: 1, swatch: '#f6ad55' },
  { key: 'brother', label: '兄', count: 1, swatch: '#68d391' },
  { key: 'sister', label: '妹', count: 1, swatch: '#fc8181' },
]

export default function Example4() {
  const [caseKey, setCaseKey] = useState('1')
  const isCase1 = caseKey === '1'

  return (
    <div className="problem">
      <h2>例題4　積の法則（人のならび方）</h2>
      <div className="statement">
        <p className="setup">父，母，兄，妹の4人が，家族写真をとるために横1列にならびます。</p>
        <ol className="question-list">
          <li>4人のならび方は何通りありますか。</li>
          <li>両はしが父と母になるような4人のならび方は何通りありますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('1')}>(1) 自由にならべる</button>
        <button className={`jump-btn${!isCase1 ? ' active' : ''}`} onClick={() => setCaseKey('2')}>(2) 両はしが父母</button>
      </div>

      {isCase1 ? (
        <SlotSequence key="c1" slotCount={4} colors={PEOPLE} />
      ) : (
        <div>
          <p className="readout">左はし・右はしは父か母のどちらか（クリックで切りかえ）、真ん中2つは兄・妹です。</p>
          <SlotSequence key="c2" slotCount={4} colors={PEOPLE} />
          <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>※ 両はしが父・母になる組み合わせだけが条件を満たします。実際に何通りあるか下の解説で確認しましょう。</p>
        </div>
      )}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 4人を並べるということは，「まず左はしに誰かが来て」，「そのとなりに別の誰かが来て」，…というように連続して起こりますので，「積の法則」を使うことができます。
          左から1人目4×2人目3×3人目2×4人目1＝<b>24(通り)</b>
        </p>
        <p>
          (2) 左から1人目は，父か母のどちらかなので2通り，2人目は，兄か妹のどちらかなので2通り，3人目は，兄と妹のうち2人目ではない人なので1通り，4人目は，父か母のうち1人目ではない人なので1通り。
          2×2×1×1＝<b>4(通り)</b>
        </p>
      </div>
    </div>
  )
}
