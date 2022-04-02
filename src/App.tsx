// 两个图的代码分别在Chart1.tsx、Chart2.tsx，看不明白没关系，
// 不一定要像我这样写，你可以选一个画图的库直接调用函数来画图
// 像ggplot2 或者matplotlib那样
import {Chart1}     from "./Chart1"
import {Chart2}     from "./Chart2"
// 下面这两个就是那个表格，看看Table就可以了，Pagination是用来做分页的，
// 因为很多时候一页显示不下，我本以为会有几百条，一页20条就会有十几页，
// 但是其实没有，所以这里这个其实没有什么必要
import {Pagination} from "./Pagination"
import {Table}      from "./Table"

const App = () =>
  <div className={"flex flex-col items-center mt-10"}>
    <div className={"flex space-x-20"}>
      <div className={"flex flex-col space-y-4"}>
        <span>ppt</span>
        <Download name={"database-理论.pptx"}/>
        <Download name={"2_repeat.pptx"}/>
        <Download name={"bioinfo2022-01.pptx"}/>
      </div>
      <div className={"flex flex-col space-y-4"}>
        <span>示例项目1</span>
        <Download name={"FishList.csv"}/>
        <Download name={"FishDB网页代码.rar"}/>
      </div>
      <div className={"flex flex-col space-y-4"}>
       <span>示例项目2</span>
       <Download name={"database.后端.zip"}/>
       <Download name={"database.前端.zip"}/>
     </div>
    </div>

    <div className={"flex items-center my-20"}>
      {/*这里是那两个图*/}
      <Chart1/>
      <Chart2/>
    </div>
    {/*这个是那个表格*/}
    <Table/>
    <Pagination/>
    <div>（我把分页组件写完之后发现好像不需要）</div>
  </div>

export default App

type Props = {
  name: string
}

const Download = ({name}: Props) =>
  <a href={`/${name}`} download
     className={"text-lg text-cyan-300 transition-colors hover:underline hover:text-cyan-500"}>
    {name}
  </a>