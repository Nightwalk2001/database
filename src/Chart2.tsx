import {arc, Chord, chord, ChordGroup, descending, ribbonArrow, select} from "d3"
import {motion}                                                         from "framer-motion"
import {useEffect, useRef, useState}                                    from "react"
import {colors1}                                                        from "./cosntant"
import matrix                                                           from "./json/chord.json"

const names = [
  "1", "2", "3", "4", "5", "6", "7", "8",
  "9", "10", "11", "12", "13", "14", "15", "16",
  "17", "18", "19", "20", "21", "22", "X", "Y"
]

type Props = {
  width?: number
  height?: number
  data?: number[][]
  innerRadius?: number
  outerRadius?: number
  colors?: string[]
}

// 这个是弦图的代码
// 这个文件不明白的话不建议硬看
// 这个文件不明白的话不建议硬看
// 这个文件不明白的话不建议硬看
// 这个文件不明白的话不建议硬看
// 这个文件不明白的话不建议硬看
// 这个文件不明白的话不建议硬看
// 这个文件不明白的话不建议硬看

// 其实这个图是个半成品，我还没写完，就是鼠标交互那里，会有卡顿的问题

export const Chart2 = ({
                         width = 600,
                         height = 600,
                         data = matrix,
                         innerRadius = 242,
                         outerRadius = 260,
                         colors = colors1
                       }: Props) => {
  const ref       = useRef<SVGGElement>(null),
        container = useRef<HTMLDivElement>(null)

  const [group, setGroup] = useState<number>()

  const chords = chord()
    .padAngle(0.035)
    .sortSubgroups(descending)
    (data)

  const arcFn = arc<ChordGroup>()
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  const ribbonFn = ribbonArrow()
    .radius(innerRadius - 2)
    .source(d => d.source)
    .target(d => d.target)
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)

  const tooltip = select(container.current)

  const handleMouse = function (event: React.MouseEvent, d: Chord) {

    tooltip
      .style("left", `${event.clientX}px`)
      .style("top", `${event.clientY}px`)
      .style("background-color", colors[d.source.index])
      .style("visibility", "visible")
      .append("div")
      .html(`${d.target.value}`)
  }

  const handleLeave = function () {
    tooltip.style("visibility", "hidden")
    tooltip.selectAll("div").remove()
  }

  useEffect(() => {
    // select(ref.current)
    //   .selectAll(".ribbon")
    //   .data(chords)
    //   .join("path")
    //   .attr("d", ribbonFn as any)
    //   .attr("fill", d => colors[d.source.index])
    //   .attr("opacity", d =>
    //     typeof group === "number" ?
    //       group === d.source.index ? 0.85 : 0.05
    //       : 0.15)
    //   .on("mousemove", handleMouse)
    //   .on("mouseleave", handleLeave)

    // select<SVGGElement, unknown>(ref.current!)
    //   .selectAll("path")
    //   .on("mouseenter",(event,d) => handleMouse)

    // const trans = transition().duration(4000)
    //
    // trans.tween("height", () => (t: number) => setValue(t))
  }, [])

  return <div className={"relative"} id={"t"}>
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {chords.groups.map((d, i) => {
          const angle = (d.startAngle + d.endAngle) / 2
          const radius = (innerRadius + outerRadius) / 2

          let transform = `rotate(${angle * 180 / Math.PI - 90}) translate(${radius - 8}, 0)`
          if (angle > Math.PI) transform += "rotate(180) translate(-16, 0)"

          return <g
            key={i}
            onMouseEnter={() => setGroup(i)}
            onMouseLeave={() => setGroup(undefined)}
            className={"cursor-pointer"}>
            <path
              d={arcFn(d)!}
              fill={colors[i]}
              fillOpacity={typeof group === "number" ?
                group === i ? 1 : 0.35
                : 0.85}
            />

            <text
              x={8}
              transform={transform}
              fill={"white"}
              textAnchor={"middle"}
              alignmentBaseline={"middle"}
              fontSize={12}>
              {names[i]}
            </text>
          </g>
        })}

        <g ref={ref}>
          {chords.map((d, i) =>
            <motion.path
              key={i}
              d={ribbonFn(d as any)!}
              fill={colors[d.source.index]}
              opacity={typeof group === "number" ?
                group === d.source.index ? 0.85 : 0.05
                : 0.15}
              whileHover={{opacity: 0.95}}
              className={"transform-gpu transition-opacity duration-75"}
              onMouseOver={event => handleMouse(event, d)}
              onMouseLeave={handleLeave}
            />)}
        </g>
      </g>
    </svg>

    <div className={"fixed px-3 py-2.5 invisible rounded-sm text-white"} ref={container}/>
  </div>
}
