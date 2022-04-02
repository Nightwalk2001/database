import {max, scaleLinear, scaleLog, scaleOrdinal} from "d3"
import {colors1}                                  from "./cosntant"
import data                                       from "./json/gtex.json"

type Props = {
  gtex?: Lnc[]
  chunkCount?: number
  spacing?: number
}

export const Chart1 = ({gtex = data, chunkCount = 18, spacing = 10}: Props) => {
  // 就是一个跟尺寸相关的值，为什么要有margin呢？因为坐标轴啊，标题啊什么的要占位置
  const margin = {left: 40, right: 20, top: 20, bottom: 50},
        w      = 800,
        h      = 510,
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const chunkSize = Math.ceil(gtex.length / chunkCount / 100) * 100

  // 这三个函数是关键，气泡图或者散点图其实是最容易的图，气泡在坐标系上的位置由圆心、半径确定，
  // 所以我们需要x和y这两个函数计算圆心坐标，color函数是给气泡一个颜色，你可以试着改下colors这个变量，
  // 在constant文件里面。这三个函数，本质上就是定义了定义域（domain）到值域（range）的映射，因为y中最大最小相差悬殊，这里取个log2
  const x     = scaleLinear()
          .domain([0, chunkSize])
          .range([0, (width / chunkCount) - spacing])
          .nice(),
        y     = scaleLog()
          .base(2)
          .domain([1, Math.log2(Math.max(max(gtex, d => d.value) ?? 1))])
          .range([height, 0])
          .nice(),
        color = scaleOrdinal<number, string>()
          .range(colors1)

  // 下面这两部分代码是把数据分成n个组
  const partitionData = (arr: Lnc[]) => {
    const chunkedData: Lnc[][] = []

    for (let i = 0; i < chunkCount; i++)
      chunkedData.push(arr.slice(chunkSize * i,
          i === chunkCount - 1
            ? arr.length - 1
            : chunkSize * (i + 1))
        // .sort((a, b) => a.value - b.value)
      )
    return chunkedData
  }

  const normals = partitionData(gtex)

  // 这里就是气泡呈现的代码，可以看到cx、cy、r，也就是圆心坐标和半径，fill是气泡的填充色
  // 这里r我给的是定值，有的时候，r也是根据数据的某个值来确定，fillOpacity是填充透明的，
  // 你可以试着自己改下
  return <div className={"ml-10"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {normals && normals.map((g, id) =>
          g.map((d, i) => <circle
            key={d.sample}
            transform={`translate(${width / chunkCount * id}, 0)`}
            cx={x(i)}
            cy={y(Math.log2(d.value)) || height}
            r={3}
            fill={color(id)}
            fillOpacity={0.9}
          />))}
      </g>
    </svg>
  </div>
}