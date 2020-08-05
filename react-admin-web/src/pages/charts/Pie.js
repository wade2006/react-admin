import React, { Component } from 'react';
import axios from 'axios'
import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Coordinate
  } from 'bizcharts';
 
class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        data:[]
         };
    }
    componentDidMount(){
      axios.get("http://rap2.taobao.org:38080/app/mock/259382/api/pie").then((res)=>
        {
          console.log(res.data);
          this.setState({
            data:res.data.data,
          })
        }
        )
    }
   
    render() {
      const {data}=this.state;
        // const data = [
        //     { year: '2001', population: 41.8 },
        //     { year: '2002', population: 38 },
        //     { year: '2003', population: 33.7 },
        //     { year: '2004', population: 30.7 },
        //     { year: '2005', population: 25.8 },
        //     { year: '2006', population: 31.7 },
        //     { year: '2007', population: 33 },
        //     { year: '2008', population: 46 },
        //     { year: '2009', population: 38.3 },
        //     { year: '2010', population: 28 },
        //     { year: '2011', population: 42.5 },
        //     { year: '2012', population: 30.3 },
        //   ];
          
        return (
            <div className="pie">               
               <Chart height={600} data={data} autoFit>
      <Coordinate type="polar" innerRadius={0.2} />
      <Axis visible={false} />
      <Tooltip showTitle={false} />
      <Interval
        position="year*population"
        adjust="stack"
        color="year"
        element-highlight
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['year', {
           offset: -15,
        }]}
      />
    </Chart>
            </div>
        );
    }
}

export default Pie;
