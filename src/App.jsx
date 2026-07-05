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

import Example1_18 from './problems18/Example1'
import Example2_18 from './problems18/Example2'
import Example3_18 from './problems18/Example3'
import Example4_18 from './problems18/Example4'
import Example5_18 from './problems18/Example5'
import Example6_18 from './problems18/Example6'
import Basic1_18 from './problems18/Basic1'
import Basic2_18 from './problems18/Basic2'
import Basic3_18 from './problems18/Basic3'
import Basic4_18 from './problems18/Basic4'
import Practice1_18 from './problems18/Practice1'
import Practice2_18 from './problems18/Practice2'
import Practice3_18 from './problems18/Practice3'
import Practice4_18 from './problems18/Practice4'
import Practice5_18 from './problems18/Practice5'
import AdvancedA1_18 from './problems18/AdvancedA1'
import AdvancedA2_18 from './problems18/AdvancedA2'
import AdvancedA3_18 from './problems18/AdvancedA3'
import AdvancedA4_18 from './problems18/AdvancedA4'
import AdvancedB1_18 from './problems18/AdvancedB1'
import AdvancedB2_18 from './problems18/AdvancedB2'

import Example1_17 from './problems17/Example1'
import Example2_17 from './problems17/Example2'
import Example3_17 from './problems17/Example3'
import Example4_17 from './problems17/Example4'
import Example5_17 from './problems17/Example5'
import Example6_17 from './problems17/Example6'
import Example7_17 from './problems17/Example7'
import Basic1_17 from './problems17/Basic1'
import Basic2_17 from './problems17/Basic2'
import Basic3_17 from './problems17/Basic3'
import Basic4_17 from './problems17/Basic4'
import Practice1_17 from './problems17/Practice1'
import Practice2_17 from './problems17/Practice2'
import Practice3_17 from './problems17/Practice3'
import Practice4_17 from './problems17/Practice4'
import Practice5_17 from './problems17/Practice5'
import AdvancedA1_17 from './problems17/AdvancedA1'
import AdvancedA2_17 from './problems17/AdvancedA2'
import AdvancedA3_17 from './problems17/AdvancedA3'
import AdvancedA4_17 from './problems17/AdvancedA4'
import AdvancedB1_17 from './problems17/AdvancedB1'
import AdvancedB2_17 from './problems17/AdvancedB2'

import Example1_16 from './problems16/Example1'
import Example2_16 from './problems16/Example2'
import Example3_16 from './problems16/Example3'
import Example4_16 from './problems16/Example4'
import Example5_16 from './problems16/Example5'
import Example6_16 from './problems16/Example6'
import Example7_16 from './problems16/Example7'
import Basic1_16 from './problems16/Basic1'
import Basic2_16 from './problems16/Basic2'
import Basic3_16 from './problems16/Basic3'
import Basic4_16 from './problems16/Basic4'
import Practice1_16 from './problems16/Practice1'
import Practice2_16 from './problems16/Practice2'
import Practice3_16 from './problems16/Practice3'
import Practice4_16 from './problems16/Practice4'
import Practice5_16 from './problems16/Practice5'
import AdvancedA1_16 from './problems16/AdvancedA1'
import AdvancedA2_16 from './problems16/AdvancedA2'
import AdvancedA3_16 from './problems16/AdvancedA3'
import AdvancedA4_16 from './problems16/AdvancedA4'
import AdvancedB1_16 from './problems16/AdvancedB1'
import AdvancedB2_16 from './problems16/AdvancedB2'

import Example1_14 from './problems14/Example1'
import Example2_14 from './problems14/Example2'
import Example3_14 from './problems14/Example3'
import Example4_14 from './problems14/Example4'
import Example5_14 from './problems14/Example5'
import Basic1_14 from './problems14/Basic1'
import Basic2_14 from './problems14/Basic2'
import Basic3_14 from './problems14/Basic3'
import Basic4_14 from './problems14/Basic4'
import Practice1_14 from './problems14/Practice1'
import Practice2_14 from './problems14/Practice2'
import Practice3_14 from './problems14/Practice3'
import Practice4_14 from './problems14/Practice4'
import AdvancedA1_14 from './problems14/AdvancedA1'
import AdvancedA2_14 from './problems14/AdvancedA2'
import AdvancedA3_14 from './problems14/AdvancedA3'
import AdvancedA4_14 from './problems14/AdvancedA4'
import AdvancedB1_14 from './problems14/AdvancedB1'
import AdvancedB2_14 from './problems14/AdvancedB2'

import Example1_13 from './problems13/Example1'
import Example2_13 from './problems13/Example2'
import Example3_13 from './problems13/Example3'
import Example4_13 from './problems13/Example4'
import Example5_13 from './problems13/Example5'
import Example6_13 from './problems13/Example6'
import Basic1_13 from './problems13/Basic1'
import Basic2_13 from './problems13/Basic2'
import Basic3_13 from './problems13/Basic3'
import Basic4_13 from './problems13/Basic4'
import Practice1_13 from './problems13/Practice1'
import Practice2_13 from './problems13/Practice2'
import Practice3_13 from './problems13/Practice3'
import Practice4_13 from './problems13/Practice4'
import Practice5_13 from './problems13/Practice5'
import AdvancedA1_13 from './problems13/AdvancedA1'
import AdvancedA2_13 from './problems13/AdvancedA2'
import AdvancedA3_13 from './problems13/AdvancedA3'
import AdvancedA4_13 from './problems13/AdvancedA4'
import AdvancedB1_13 from './problems13/AdvancedB1'
import AdvancedB2_13 from './problems13/AdvancedB2'

import Example1_12 from './problems12/Example1'
import Example2_12 from './problems12/Example2'
import Example3_12 from './problems12/Example3'
import Example4_12 from './problems12/Example4'
import Example5_12 from './problems12/Example5'
import Example6_12 from './problems12/Example6'
import Example7_12 from './problems12/Example7'
import Basic1_12 from './problems12/Basic1'
import Basic2_12 from './problems12/Basic2'
import Basic3_12 from './problems12/Basic3'
import Basic4_12 from './problems12/Basic4'
import Practice1_12 from './problems12/Practice1'
import Practice2_12 from './problems12/Practice2'
import Practice3_12 from './problems12/Practice3'
import Practice4_12 from './problems12/Practice4'
import Practice5_12 from './problems12/Practice5'
import Practice6_12 from './problems12/Practice6'
import AdvancedA1_12 from './problems12/AdvancedA1'
import AdvancedA2_12 from './problems12/AdvancedA2'
import AdvancedA3_12 from './problems12/AdvancedA3'
import AdvancedA4_12 from './problems12/AdvancedA4'
import AdvancedB1_12 from './problems12/AdvancedB1'
import AdvancedB2_12 from './problems12/AdvancedB2'

import Example1_11 from './problems11/Example1'
import Example2_11 from './problems11/Example2'
import Example3_11 from './problems11/Example3'
import Example4_11 from './problems11/Example4'
import Example5_11 from './problems11/Example5'
import Example6_11 from './problems11/Example6'
import Basic1_11 from './problems11/Basic1'
import Basic2_11 from './problems11/Basic2'
import Basic3_11 from './problems11/Basic3'
import Basic4_11 from './problems11/Basic4'
import Practice1_11 from './problems11/Practice1'
import Practice2_11 from './problems11/Practice2'
import Practice3_11 from './problems11/Practice3'
import Practice4_11 from './problems11/Practice4'
import Practice5_11 from './problems11/Practice5'
import Practice6_11 from './problems11/Practice6'
import AdvancedA1_11 from './problems11/AdvancedA1'
import AdvancedA2_11 from './problems11/AdvancedA2'
import AdvancedA3_11 from './problems11/AdvancedA3'
import AdvancedA4_11 from './problems11/AdvancedA4'
import AdvancedB1_11 from './problems11/AdvancedB1'
import AdvancedB2_11 from './problems11/AdvancedB2'

import Basic1_20 from './problems20/Basic1'
import Basic2_20 from './problems20/Basic2'
import Basic3_20 from './problems20/Basic3'
import Basic4_20 from './problems20/Basic4'
import Basic5_20 from './problems20/Basic5'
import Basic6_20 from './problems20/Basic6'
import Basic7_20 from './problems20/Basic7'
import Basic8_20 from './problems20/Basic8'
import Basic9_20 from './problems20/Basic9'
import Basic10_20 from './problems20/Basic10'
import Basic11_20 from './problems20/Basic11'
import Basic12_20 from './problems20/Basic12'
import Practice1_20 from './problems20/Practice1'
import Practice2_20 from './problems20/Practice2'
import Practice3_20 from './problems20/Practice3'
import Practice4_20 from './problems20/Practice4'
import Practice5_20 from './problems20/Practice5'
import Advanced1_20 from './problems20/Advanced1'
import Advanced2_20 from './problems20/Advanced2'
import Advanced3_20 from './problems20/Advanced3'
import Advanced4_20 from './problems20/Advanced4'
import Advanced5_20 from './problems20/Advanced5'
import Advanced6_20 from './problems20/Advanced6'
import Advanced7_20 from './problems20/Advanced7'
import Advanced8_20 from './problems20/Advanced8'

const ROUNDS = [
  {
    key: 'round19',
    label: '第19回　図形上の点の移動',
    navLabel: '第19回',
    groups: [
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
    ],
  },
  {
    key: 'round18',
    label: '第18回　数列と数表',
    navLabel: '第18回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_18 },
          { key: 'ex2', label: '2', Component: Example2_18 },
          { key: 'ex3', label: '3', Component: Example3_18 },
          { key: 'ex4', label: '4', Component: Example4_18 },
          { key: 'ex5', label: '5', Component: Example5_18 },
          { key: 'ex6', label: '6', Component: Example6_18 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_18 },
          { key: 'ba2', label: '2', Component: Basic2_18 },
          { key: 'ba3', label: '3', Component: Basic3_18 },
          { key: 'ba4', label: '4', Component: Basic4_18 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_18 },
          { key: 'pr2', label: '2', Component: Practice2_18 },
          { key: 'pr3', label: '3', Component: Practice3_18 },
          { key: 'pr4', label: '4', Component: Practice4_18 },
          { key: 'pr5', label: '5', Component: Practice5_18 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_18 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_18 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_18 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_18 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_18 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_18 },
        ],
      },
    ],
  },
  {
    key: 'round17',
    label: '第17回　いろいろな旅人算',
    navLabel: '第17回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_17 },
          { key: 'ex2', label: '2', Component: Example2_17 },
          { key: 'ex3', label: '3', Component: Example3_17 },
          { key: 'ex4', label: '4', Component: Example4_17 },
          { key: 'ex5', label: '5', Component: Example5_17 },
          { key: 'ex6', label: '6', Component: Example6_17 },
          { key: 'ex7', label: '7', Component: Example7_17 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_17 },
          { key: 'ba2', label: '2', Component: Basic2_17 },
          { key: 'ba3', label: '3', Component: Basic3_17 },
          { key: 'ba4', label: '4', Component: Basic4_17 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_17 },
          { key: 'pr2', label: '2', Component: Practice2_17 },
          { key: 'pr3', label: '3', Component: Practice3_17 },
          { key: 'pr4', label: '4', Component: Practice4_17 },
          { key: 'pr5', label: '5', Component: Practice5_17 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_17 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_17 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_17 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_17 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_17 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_17 },
        ],
      },
    ],
  },
  {
    key: 'round16',
    label: '第16回　旅人算とグラフ',
    navLabel: '第16回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_16 },
          { key: 'ex2', label: '2', Component: Example2_16 },
          { key: 'ex3', label: '3', Component: Example3_16 },
          { key: 'ex4', label: '4', Component: Example4_16 },
          { key: 'ex5', label: '5', Component: Example5_16 },
          { key: 'ex6', label: '6', Component: Example6_16 },
          { key: 'ex7', label: '7', Component: Example7_16 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_16 },
          { key: 'ba2', label: '2', Component: Basic2_16 },
          { key: 'ba3', label: '3', Component: Basic3_16 },
          { key: 'ba4', label: '4', Component: Basic4_16 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_16 },
          { key: 'pr2', label: '2', Component: Practice2_16 },
          { key: 'pr3', label: '3', Component: Practice3_16 },
          { key: 'pr4', label: '4', Component: Practice4_16 },
          { key: 'pr5', label: '5', Component: Practice5_16 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_16 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_16 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_16 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_16 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_16 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_16 },
        ],
      },
    ],
  },
  {
    key: 'round14',
    label: '第14回　水量の変化',
    navLabel: '第14回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_14 },
          { key: 'ex2', label: '2', Component: Example2_14 },
          { key: 'ex3', label: '3', Component: Example3_14 },
          { key: 'ex4', label: '4', Component: Example4_14 },
          { key: 'ex5', label: '5', Component: Example5_14 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_14 },
          { key: 'ba2', label: '2', Component: Basic2_14 },
          { key: 'ba3', label: '3', Component: Basic3_14 },
          { key: 'ba4', label: '4', Component: Basic4_14 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_14 },
          { key: 'pr2', label: '2', Component: Practice2_14 },
          { key: 'pr3', label: '3', Component: Practice3_14 },
          { key: 'pr4', label: '4', Component: Practice4_14 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_14 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_14 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_14 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_14 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_14 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_14 },
        ],
      },
    ],
  },
  {
    key: 'round13',
    label: '第13回　速さとグラフ',
    navLabel: '第13回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_13 },
          { key: 'ex2', label: '2', Component: Example2_13 },
          { key: 'ex3', label: '3', Component: Example3_13 },
          { key: 'ex4', label: '4', Component: Example4_13 },
          { key: 'ex5', label: '5', Component: Example5_13 },
          { key: 'ex6', label: '6', Component: Example6_13 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_13 },
          { key: 'ba2', label: '2', Component: Basic2_13 },
          { key: 'ba3', label: '3', Component: Basic3_13 },
          { key: 'ba4', label: '4', Component: Basic4_13 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_13 },
          { key: 'pr2', label: '2', Component: Practice2_13 },
          { key: 'pr3', label: '3', Component: Practice3_13 },
          { key: 'pr4', label: '4', Component: Practice4_13 },
          { key: 'pr5', label: '5', Component: Practice5_13 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_13 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_13 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_13 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_13 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_13 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_13 },
        ],
      },
    ],
  },
  {
    key: 'round12',
    label: '第12回　場合の数-組み合わせ方-',
    navLabel: '第12回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_12 },
          { key: 'ex2', label: '2', Component: Example2_12 },
          { key: 'ex3', label: '3', Component: Example3_12 },
          { key: 'ex4', label: '4', Component: Example4_12 },
          { key: 'ex5', label: '5', Component: Example5_12 },
          { key: 'ex6', label: '6', Component: Example6_12 },
          { key: 'ex7', label: '7', Component: Example7_12 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_12 },
          { key: 'ba2', label: '2', Component: Basic2_12 },
          { key: 'ba3', label: '3', Component: Basic3_12 },
          { key: 'ba4', label: '4', Component: Basic4_12 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_12 },
          { key: 'pr2', label: '2', Component: Practice2_12 },
          { key: 'pr3', label: '3', Component: Practice3_12 },
          { key: 'pr4', label: '4', Component: Practice4_12 },
          { key: 'pr5', label: '5', Component: Practice5_12 },
          { key: 'pr6', label: '6', Component: Practice6_12 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_12 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_12 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_12 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_12 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_12 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_12 },
        ],
      },
    ],
  },
  {
    key: 'round11',
    label: '第11回　場合の数-ならべ方-',
    navLabel: '第11回',
    groups: [
      {
        key: 'example',
        label: '例題',
        items: [
          { key: 'ex1', label: '1', Component: Example1_11 },
          { key: 'ex2', label: '2', Component: Example2_11 },
          { key: 'ex3', label: '3', Component: Example3_11 },
          { key: 'ex4', label: '4', Component: Example4_11 },
          { key: 'ex5', label: '5', Component: Example5_11 },
          { key: 'ex6', label: '6', Component: Example6_11 },
        ],
      },
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_11 },
          { key: 'ba2', label: '2', Component: Basic2_11 },
          { key: 'ba3', label: '3', Component: Basic3_11 },
          { key: 'ba4', label: '4', Component: Basic4_11 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_11 },
          { key: 'pr2', label: '2', Component: Practice2_11 },
          { key: 'pr3', label: '3', Component: Practice3_11 },
          { key: 'pr4', label: '4', Component: Practice4_11 },
          { key: 'pr5', label: '5', Component: Practice5_11 },
          { key: 'pr6', label: '6', Component: Practice6_11 },
        ],
      },
      {
        key: 'advanced',
        label: '応用問題（最難関）',
        items: [
          { key: 'adA1', label: 'A-1', Component: AdvancedA1_11 },
          { key: 'adA2', label: 'A-2', Component: AdvancedA2_11 },
          { key: 'adA3', label: 'A-3', Component: AdvancedA3_11 },
          { key: 'adA4', label: 'A-4', Component: AdvancedA4_11 },
          { key: 'adB1', label: 'B-1', Component: AdvancedB1_11 },
          { key: 'adB2', label: 'B-2', Component: AdvancedB2_11 },
        ],
      },
    ],
  },
  {
    key: 'round20',
    label: '第20回　総合',
    navLabel: '第20回',
    groups: [
      {
        key: 'basic',
        label: '基本問題',
        items: [
          { key: 'ba1', label: '1', Component: Basic1_20 },
          { key: 'ba2', label: '2', Component: Basic2_20 },
          { key: 'ba3', label: '3', Component: Basic3_20 },
          { key: 'ba4', label: '4', Component: Basic4_20 },
          { key: 'ba5', label: '5', Component: Basic5_20 },
          { key: 'ba6', label: '6', Component: Basic6_20 },
          { key: 'ba7', label: '7', Component: Basic7_20 },
          { key: 'ba8', label: '8', Component: Basic8_20 },
          { key: 'ba9', label: '9', Component: Basic9_20 },
          { key: 'ba10', label: '10', Component: Basic10_20 },
          { key: 'ba11', label: '11', Component: Basic11_20 },
          { key: 'ba12', label: '12', Component: Basic12_20 },
        ],
      },
      {
        key: 'practice',
        label: '練習問題',
        items: [
          { key: 'pr1', label: '1', Component: Practice1_20 },
          { key: 'pr2', label: '2', Component: Practice2_20 },
          { key: 'pr3', label: '3', Component: Practice3_20 },
          { key: 'pr4', label: '4', Component: Practice4_20 },
          { key: 'pr5', label: '5', Component: Practice5_20 },
        ],
      },
      {
        key: 'advanced',
        label: '最難関問題集',
        items: [
          { key: 'adv1', label: '1', Component: Advanced1_20 },
          { key: 'adv2', label: '2', Component: Advanced2_20 },
          { key: 'adv3', label: '3', Component: Advanced3_20 },
          { key: 'adv4', label: '4', Component: Advanced4_20 },
          { key: 'adv5', label: '5', Component: Advanced5_20 },
          { key: 'adv6', label: '6', Component: Advanced6_20 },
          { key: 'adv7', label: '7', Component: Advanced7_20 },
          { key: 'adv8', label: '8', Component: Advanced8_20 },
        ],
      },
    ],
  },
]

export default function App() {
  const [roundKey, setRoundKey] = useState(ROUNDS[0].key)
  const round = ROUNDS.find((rd) => rd.key === roundKey) ?? ROUNDS[0]
  const [groupKey, setGroupKey] = useState(round.groups[0].key)
  const group = round.groups.find((g) => g.key === groupKey) ?? round.groups[0]
  const [itemKey, setItemKey] = useState(group.items[0].key)

  const currentGroup = round.groups.find((g) => g.key === groupKey) ?? round.groups[0]
  const currentItem = currentGroup.items.find((i) => i.key === itemKey) ?? currentGroup.items[0]
  const Active = currentItem.Component

  const selectRound = (rd) => {
    setRoundKey(rd.key)
    setGroupKey(rd.groups[0].key)
    setItemKey(rd.groups[0].items[0].key)
  }

  const selectGroup = (g) => {
    setGroupKey(g.key)
    setItemKey(g.items[0].key)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>{round.label}</h1>
        <nav className="nav">
          {ROUNDS.map((rd) => (
            <button
              key={rd.key}
              className={`nav-btn round-btn${rd.key === roundKey ? ' active' : ''}`}
              onClick={() => selectRound(rd)}
            >
              {rd.navLabel}
            </button>
          ))}
        </nav>
        <nav className="nav">
          {round.groups.map((g) => (
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
