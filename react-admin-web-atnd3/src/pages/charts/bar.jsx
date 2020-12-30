import React, {Component} from 'react'
import {Card, Button} from 'antd'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {

 

  render() {
    const data = [
      {
        name: "John",
        vote: 35654
      },
      {
        name: "Damon",
        vote: 65456
      },
      {
        name: "Patrick",
        vote: 45724
      },
      {
        name: "Mark",
        vote: 13654
      }
    ];
    const imageMap = {
      John: "https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png",
      Damon: "https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png",
      Patrick: "https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png",
      Mark: "https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png"
    };
    const scale = {
      vote: {
        min: 0
      }
    };
    return (
      <div>
      <Chart
      style={{marginTop:100}}
        data={data}
        padding={[60, 20, 40, 60]}
        scale={scale}
        forceFit
      >
        <Axis
          name="vote"
          labels={null}
          title={null}
          line={null}
          tickLine={null}
        />
        <Geom
          type="interval"
          position="name*vote"
          color={["name", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]]}
        />
        <Tooltip />
        <Geom
          type="point"
          position="name*vote"
          size={60}
          shape={[
            "name",
            function(name) {
              return ["image", imageMap[name]];
            }
          ]}
        />
      </Chart>
    </div>
    )
  }
}