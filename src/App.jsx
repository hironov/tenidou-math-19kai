import { useState } from 'react'
import Example1 from './problems/Example1'
import Example2 from './problems/Example2'
import Example3 from './problems/Example3'
import Example4 from './problems/Example4'
import Example5 from './problems/Example5'
import Basic1 from './problems/Basic1'
import Basic2 from './problems/Basic2'
import Basic3 from './problems/Basic3'
import Basic4 from './problems/Basic4'
import Practice1 from './problems/Practice1'
import Practice2 from './problems/Practice2'
import Practice3 from './problems/Practice3'
import Practice4 from './problems/Practice4'
import Practice5 from './problems/Practice5'
import AdvancedA1 from './problems/AdvancedA1'
import AdvancedA2 from './problems/AdvancedA2'
import AdvancedA3 from './problems/AdvancedA3'
import AdvancedA4 from './problems/AdvancedA4'
import AdvancedB1 from './problems/AdvancedB1'
import AdvancedB2 from './problems/AdvancedB2'

const GROUPS = [
  {
    key: 'example',
    label: '例題',
    items: [
      { key: 'ex1', label: '1', Component: Example1 },
      { key: 'ex2', label: '2', Component: Example2 },
      { key: 'ex3', label: '3', Component: Example3 },
      { key: 'ex4', label: '4', Component: Example4 },
      { key: 'ex5', label: '5', Component: Example5 },
    ],
  },
  {
    key: 'basic',
    label: '基本問題',
    items: [
      { key: 'ba1', label: '1', Component: Basic1 },
      { key: 'ba2', label: '2', Component: Basic2 },
      { key: 'ba3', label: '3', Component: Basic3 },
      { key: 'ba4', label: '4', Component: Basic4 },
    ],
  },
  {
    key: 'practice',
    label: '練習問題',
    items: [
      { key: 'pr1', label: '1', Component: Practice1 },
      { key: 'pr2', label: '2', Component: Practice2 },
      { key: 'pr3', label: '3', Component: Practice3 },
      { key: 'pr4', label: '4', Component: Practice4 },
      { key: 'pr5', label: '5', Component: Practice5 },
    ],
  },
  {
    key: 'advanced',
    label: '応用問題（最難関）',
    items: [
      { key: 'adA1', label: 'A-1', Component: AdvancedA1 },
      { key: 'adA2', label: 'A-2', Component: AdvancedA2 },
      { key: 'adA3', label: 'A-3', Component: AdvancedA3 },
      { key: 'adA4', label: 'A-4', Component: AdvancedA4 },
      { key: 'adB1', label: 'B-1', Component: AdvancedB1 },
      { key: 'adB2', label: 'B-2', Component: AdvancedB2 },
    ],
  },
]

export default function App() {
  const [groupKey, setGroupKey] = useState(GROUPS[0].key)
  const group = GROUPS.find((g) => g.key === groupKey) ?? GROUPS[0]
  const [itemKey, setItemKey] = useState(group.items[0].key)

  const currentGroup = GROUPS.find((g) => g.key === groupKey) ?? GROUPS[0]
  const currentItem = currentGroup.items.find((i) => i.key === itemKey) ?? currentGroup.items[0]
  const Active = currentItem.Component

  const selectGroup = (g) => {
    setGroupKey(g.key)
    setItemKey(g.items[0].key)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>第19回　図形上の点の移動</h1>
        <nav className="nav">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              className={`nav-btn${g.key === groupKey ? ' active' : ''}`}
              onClick={() => selectGroup(g)}
            >
              {g.label}
            </button>
          ))}
        </nav>
        <nav className="subnav">
          {currentGroup.items.map((i) => (
            <button
              key={i.key}
              className={`subnav-btn${i.key === itemKey ? ' active' : ''}`}
              onClick={() => setItemKey(i.key)}
            >
              {i.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        <Active />
      </main>
    </div>
  )
}
