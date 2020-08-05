import React, { Component } from 'react'
import { Chart, Line, Point } from 'bizcharts';
        // 数据源
        const data = [
            {
                month: "Jan",
                city: "商品a",
                temperature: 7
            },
            {
                month: "Jan",
                city: "商品b",
                temperature: 3.9
            },
            {
                month: "Feb",
                city: "商品a",
                temperature: 6.9
            },
            {
                month: "Feb",
                city: "商品b",
                temperature: 4.2
            },
            {
                month: "Mar",
                city: "商品a",
                temperature: 9.5
            },
            {
                month: "Mar",
                city: "商品b",
                temperature: 5.7
            },
            {
                month: "Apr",
                city: "商品a",
                temperature: 14.5
            },
            {
                month: "Apr",
                city: "商品b",
                temperature: 8.5
            },
            {
                month: "May",
                city: "商品a",
                temperature: 18.4
            },
            {
                month: "May",
                city: "商品b",
                temperature: 11.9
            },
            {
                month: "Jun",
                city: "商品a",
                temperature: 21.5
            },
            {
                month: "Jun",
                city: "商品b",
                temperature: 15.2
            },
            {
                month: "Jul",
                city: "商品a",
                temperature: 25.2
            },
            {
                month: "Jul",
                city: "商品b",
                temperature: 17
            },
            {
                month: "Aug",
                city: "商品a",
                temperature: 26.5
            },
            {
                month: "Aug",
                city: "商品b",
                temperature: 16.6
            },
            {
                month: "Sep",
                city: "商品a",
                temperature: 23.3
            },
            {
                month: "Sep",
                city: "商品b",
                temperature: 14.2
            },
            {
                month: "Oct",
                city: "商品a",
                temperature: 18.3
            },
            {
                month: "Oct",
                city: "商品b",
                temperature: 10.3
            },
            {
                month: "Nov",
                city: "商品a",
                temperature: 13.9
            },
            {
                month: "Nov",
                city: "商品b",
                temperature: 6.6
            },
            {
                month: "Dec",
                city: "商品a",
                temperature: 9.6
            },
            {
                month: "Dec",
                city: "商品b",
                temperature: 4.8
            }
          ];



export default class LineChart extends Component {

    render() {

        return <div >
            <Chart scale={{temperature: {min: 0}}} padding={[30,20,50,40]} autoFit height={400} data={data}  >
        <Line shape="smooth" position="month*temperature" color="city" label="temperature"/>
        <Point position="month*temperature" color="city" />
      </Chart>
        </div>
    }
}
