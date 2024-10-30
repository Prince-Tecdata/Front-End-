import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'node_modules/chart.js'
Chart.register(...registerables)

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  FromDate: any
  ToDate: any
  Chart:any

  constructor(private DatePipe: DatePipe) { }

  ngOnInit(): void {
    const currentDate = new Date()
    this.FromDate = this.DatePipe.transform(currentDate, 'yyyy-MM-dd')
    this.ToDate = this.DatePipe.transform(currentDate, 'yyyy-MM-dd')
    this.createChart()
    this.ChartLoader()
  }

  createChart(): void {
    const chartItem: ChartItem = document.getElementById('Piechart') as ChartItem;

    const chartConfig: ChartConfiguration = {
      type: 'bar', // You can use other types like 'line', 'pie', etc.
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 97],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    new Chart(chartItem, chartConfig);
  }


  ChartLoader(){
     this.Chart = new Chart('Barchart',{
      type:'bar',
      data:{
        labels:['jan','feb','Mar','Apr','May'],
        datasets:[
         {
          label:'orange',
          data:['344','374','494','672','124'],
          // backgroundColor:"orange"
         },
         {
          label:'Apple',
          data:['345','678','096','345','543'],
          // backgroundColor:"red"
         },
        //  {
        //   label:'Cake',
        //   data:['123','567','356','654','890'],
        //   // backgroundColor:"black"
        //  },
        //  {
        //   label:'lemon',
        //   data:['122','456','456','672','122'],
        //   // backgroundColor:"yellow"
        //  },
        //  {
        //   label:'end',
        //   data:['345','768','897','980','908'],
        //   // backgroundColor:"lightgreen"
        //  },
         
        ]
      },
      options:{
        plugins:{
          legend:{
            labels:{
              font:{
                size:14,
                family:'arial',
                style:'italic',
                weight:'bold',
              
              }
            }
          }
        },
        layout:{
          padding:1
        },
        aspectRatio:3.5
      }
     })
  }


}
