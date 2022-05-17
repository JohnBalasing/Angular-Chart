import { Component, OnInit, ViewChild, HostListener, TemplateRef } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from './dialog/dialogbox/dialogbox.component';



declare var $: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public lineChartData: ChartDataSets[] = [{ data: [0, 25, 30, 42, 49, 35, 58, 80, 85, 71, 59, 30 ], label: 'Net Worth' }];
  public lineChartLabels: Label[] = ['28', '32', '36', '40', '44', '48', '52', '56', '60', '70', '80', '90']

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: ''
          },
          ticks: {
            maxTicksLimit: 6,
            fontStyle: 'normal',
            fontSize: 13,
            beginAtZero: true,
            callback: (value) => {
              return `${value.toLocaleString('en-IN')}`;
            },
          },
          gridLines: {
            drawOnChartArea: true,
          }
        }],
      xAxes: [{
        ticks: {
          fontStyle: 'normal',
          fontSize: 13,
          autoSkip: false,
          maxRotation: window.innerWidth < 1100 ? 90 : 0,
          minRotation: window.innerWidth < 1100 ? 90 : 0,

        },
        gridLines: {
          drawOnChartArea: false,
          lineWidth: 1.5
        }
      }]
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },

  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#ADD8E6',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  /*Listen for Window Resizing*/

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.settChartAspectRatio()
  }

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.settChartAspectRatio()

  }

  /*sets the charts aspect ratio based on the width of the window*/

  private settChartAspectRatio() {
    let aspectRatio: number;
    if (window.innerWidth < 1600 && window.innerWidth > 767) {
      aspectRatio = 2;
    }
    if (window.innerWidth < 768) {
      aspectRatio = 1.5;

    }
    if (window.innerWidth > 1600) {
      aspectRatio = 3.5;

    }
    this.lineChartOptions.aspectRatio = aspectRatio;
    this.chart.chart.aspectRatio = aspectRatio;
    this.chart.chart.options.scales.xAxes[0].ticks.maxRotation = window.innerWidth < 1100 ? 90 : 0;
    this.chart.chart.options.scales.xAxes[0].ticks.minRotation = window.innerWidth < 1100 ? 90 : 0;
  }



  // drag and drop Menus

  todo = [
    { icon: '../assets/images/house.png', name: 'House', activity: 'Buy a New House' },
    { icon: '../assets/images/education.png', name: 'Education', activity: 'Higher Education' },
    { icon: '../assets/images/career.png', name: 'Career', activity: 'Career' },
    { icon: '../assets/images/trip.png', name: 'Trip & Trekking', activity: 'Plan for a Trip' },
    { icon: '../assets/images/vehicle.png', name: 'Vehicle', activity: 'Buy a New Vehicle' },
    { icon: '../assets/images/occassion.png', name: 'Special Occassion', activity: 'Special Occassion' },
    { icon: '../assets/images/debt-free.png', name: 'Be the debt free', activity: 'Pay the debt' },
    { icon: '../assets/images/life-experience.png', name: 'Life Experience', activity: 'Life Experience' },
    { icon: '../assets/images/custom.png', name: 'Custom', activity: 'Customized Plan' },
  ];

  modalIcon = '';
  modalHeading = '';
  modalActivity= '';

  show(event: any) {

    this.modalIcon = event.icon;
    this.modalHeading = event.name;
    this.modalActivity = event.activity
    $('#staticBackdrop').modal('show');
    console.log(event);
    console.log(event.container.data);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, { disableClose: true });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


