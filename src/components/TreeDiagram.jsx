// 樹形図を描画する。node = { label, children: [node, ...] }
// 葉ノードに横方向のスロットを割りあて、内部ノードはその子の中央に配置する。
function assignX(node, slot) {
  if (!node.children || node.children.length === 0) {
    node._x = slot.i
    slot.i += 1
    return node._x
  }
  const xs = node.children.map((c) => assignX(c, slot))
  node._x = (Math.min(...xs) + Math.max(...xs)) / 2
  return node._x
}

function collectNodes(node, depth, out) {
  out.push({ node, depth })
  ;(node.children ?? []).forEach((c) => collectNodes(c, depth + 1, out))
}

export function TreeDiagram({ root, width = 560, colWidth = 56, rowHeight = 44, fontSize = 13 }) {
  const slot = { i: 0 }
  assignX(root, slot)
  const leafCount = Math.max(1, slot.i)
  const list = []
  collectNodes(root, 0, list)
  const maxDepth = Math.max(...list.map((n) => n.depth))
  const w = Math.max(width, leafCount * colWidth + 40)
  const h = (maxDepth + 1) * rowHeight + 20

  const px = (x) => 20 + x * colWidth + colWidth / 2
  const py = (d) => 14 + d * rowHeight

  const edges = []
  function walk(node) {
    for (const c of node.children ?? []) {
      edges.push({ x1: px(node._x), y1: py(node._depth ?? node._d), x2: px(c._x), y2: py((node._d ?? 0) + 1) })
      walk(c)
    }
  }
  // depth を各ノードに保存してからエッジを作る
  list.forEach(({ node, depth }) => { node._d = depth })
  walk(root)

  return (
    <svg width={w} height={h} className="tank-view" style={{ maxWidth: '100%' }}>
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#a0aec0" strokeWidth="1.5" />
      ))}
      {list.map(({ node, depth }, i) => (
        <g key={i}>
          <circle cx={px(node._x)} cy={py(depth)} r={14} fill="white" stroke={node.color ?? '#3182ce'} strokeWidth="2" />
          <text x={px(node._x)} y={py(depth) + 4} fontSize={fontSize} textAnchor="middle" fill={node.color ?? '#2d3748'}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
