import { ChildhoodTheme, TriviaQuestion } from './types';

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: "小时候玩的弹珠，常见的材质通常是？",
    options: ["木头", "石头", "玻璃"],
    answer: 2
  },
  {
    question: "小霸王游戏机的经典手柄按键通常是哪个组合？",
    options: ["AB键", "XY键", "LR键"],
    answer: 0
  },
  {
    question: "童年冰棍车的木箱里，通常铺什么来保温？",
    options: ["报纸", "棉被", "塑料布"],
    answer: 1
  },
  {
    question: "跳房子游戏通常需要用到什么在地上画图？",
    options: ["粉笔", "油漆", "马克笔"],
    answer: 0
  }
];

export const THEMES = [
  {
    id: 'outdoor' as ChildhoodTheme,
    name: '户外玩耍主题',
    description: '短袖背心、帆布球鞋、弹珠丢沙包，还原阳光下的质感。',
    tag: '户外',
    bgColor: 'bg-[#4361EE]',
    icon: '⚽'
  },
  {
    id: 'indoor' as ChildhoodTheme,
    name: '室内娱乐主题',
    description: '碎花衬衫、棉布裤、小霸王电视机，适配居家玩乐场景。',
    tag: '室内',
    bgColor: 'bg-[#7209B7]',
    icon: '🎮'
  },
  {
    id: 'school' as ChildhoodTheme,
    name: '校园时光主题',
    description: '蓝白校服、红领巾、帆布书包，教室操场里的纯真。',
    tag: '校园',
    bgColor: 'bg-[#3A0CA3]',
    icon: '📝'
  },
  {
    id: 'taste' as ChildhoodTheme,
    name: '童年味道主题',
    description: '宽松T恤、冰棍车、辣条、农家小院，寻找舌尖上的记忆。',
    tag: '味道',
    bgColor: 'bg-[#F72585]',
    icon: '🍦'
  }
];
