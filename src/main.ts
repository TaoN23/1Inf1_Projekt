import { Board } from "./Board"

const rb = [
  '####b####',
  'www###ww#',
  '##[#w]######',
  '####[#www]##[w##w]#',
]


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  hello world
`
'#####P######'


const b = new  Board(rb);
b.log();