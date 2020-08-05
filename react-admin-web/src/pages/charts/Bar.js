import React, { Component } from 'react';
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
    Util,
    Point,
    Interval
  } from "bizcharts";
  import axios from 'axios'
class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
           data:[
           ],
           imageMap:{}
         };
    }  
    componentDidMount() {
      axios.get("http://rap2.taobao.org:38080/app/mock/259382/api/zuzhuangtu").then((res)=>
      {console.log(res.data);
        this.setState({
          data:res.data.data,
          imageMap:res.data.img
        })
      }
      )
    }
    
    render() {
        const {data,imageMap}=this.state;
          const scale = {
            vote: {
              min: 0
            }
          };
        return (
            <Chart
            data={data}
            padding={[60, 20, 40, 60]}
            scale={scale}
            autoFit
            height={600}
          >
            <Axis
              name="vote"
              labels={null}
              title={null}
              line={null}
              tickLine={null}
            />
            <Interval
              position="name*vote"
              color={["name", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]]}
            />
            <Tooltip />
            <Point
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
           );
        }
}

export default Bar;
