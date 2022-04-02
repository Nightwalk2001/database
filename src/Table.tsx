import {motion}              from "framer-motion"
import {useEffect, useState} from "react"

// 这里是列名
const headers = ["chrom", "feature", "start", "end", "strand", "geneName"]

export const Table = () => {
  // 下面这两部分是准备表格使用的数据
  // Hg是定义的一个类似，在types文件夹下面
  const [hgs, setHgs] = useState<Hg[]>()

  useEffect(() => {
    // 这个是方法1，也就是通过数据请求得到数据，需要注意的是，
    // 你要把fetch函数的第一个参数改成你自己写的接口地址
    // const fetchHgs = async () => {
    //   const res = await
    //     fetch("http://localhost:8080/exons/RP4-669L17.4")
    //       .then(r => r.json())
    //   setHgs(res)
    // }
    //
    // fetchHgs().then()

    // 这个是方法2，服务器在重装，mysql使用会有问题，
    // 所以我把数据存在一个json文件里面，在这里使用
    import("./json/exons.json").then(j => setHgs(j.default))

    // 你选择其中一种方法即可
  }, [])

  return <motion.div layout className={"table-container"}>
    {/*这里就是表格啦，没什么好说的，需要注意的是，你自己的数据是什么样子，*/}
    {/*下面那几个td和上面的headers要对应起来*/}
    {/*举个例子，你的数据每一个是这样的： {name: string,age: number}*/}
    {/*那么你的header是就应该像这样：["姓名","年龄"]*/}
    {/*下面的的tr里面应该是两个td：
    <td>{d.name}</td>
    <td>{d.age}</td>
    */}
    <table className={"table"}>
      <thead className={"bg-gray-50"}>
        <tr>{headers.map(d => <th key={d} scope={"col"} className={"th"}>{d}</th>)}</tr>
      </thead>
      <tbody className={"tbody"}>
        {hgs && hgs.slice(1, 30)
          .map((d, i) => <tr key={i}
                             className={`text-center py-2 tr`}>
            <td>{d.chrom}</td>
            <td>{d.feature}</td>
            <td>{d.start}</td>
            <td>{d.end}</td>
            <td>{d.strand}</td>
            <td>{d.geneName}</td>
          </tr>)}
      </tbody>
    </table>
  </motion.div>
}
