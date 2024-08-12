if (cookie("type") == 'member') {
  window.location.href = 'create-sandwich.html';
}
if (!cookie("userid")) {
  window.location.href = 'order-now.html';
}

let sales = callApi2("POST", 'http://127.0.0.1:5000/getSales', 
    {'data': JSON.stringify()});
let moneyFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'SGD'})
console.log(sales)
currentYear = new Date()
currentYear = currentYear.getFullYear()
const yearlySales = document.getElementById('yearlySales');
yearlySales.innerHTML = moneyFormat.format(sales.yearly)

const monthlySales = document.getElementById('monthlySales');
monthlySales.innerHTML = moneyFormat.format(sales.monthly)

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

var cyr = document.getElementById("currentYearRevenue");
monthLabel = ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
var currentYearRevenue = new Chart(cyr, {
    type: 'bar',
    data: {
      labels:monthLabel.slice(0, sales.thisYearMonthly.length),
      datasets: [{
        label: "Yearly Revenue",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: sales.thisYearMonthly,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 12
          },
          maxBarThickness: 30,
          scaleLabel: {
            display: true,
            labelString: 'Month'
        }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 200000,
            maxTicksLimit: 10,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '$' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          },
          scaleLabel: {
            display: true,
            labelString: 'Total Revenue by Month($)'
          } 
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
          }
        }
      },
    }
  });
  
var hs = document.getElementById("hourlySales");
hours = []
hourSales = []
for (x in sales.hourlySales){
    hours.push(parseInt(x))
    hourSales.push(sales.hourlySales[x])
}
var hourlySales = new Chart(hs, {
  type: 'bar',
  data: {
    labels: hours,
    datasets: [{
      label: "Hourly Sales",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: hourSales,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'dollars'
        },

      
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 10
        },

        
        maxBarThickness: 25,
        scaleLabel: {
          display: true,
          labelString: 'Operating Hour Sale'
      }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 16000,
          maxTicksLimit: 10,
          padding: 5,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        scaleLabel: {
          display: true,
          labelString: 'Total Revenue by Hour($)'
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    },
  }
});

// Month on Month Revenue
var mr = document.getElementById("MOMR");
var MOMR = new Chart(mr, {
  type: 'line',
  data: {
    labels: ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: currentYear-1,
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: sales.lastYearMonthly,
      },
      {
        label: currentYear, // New dataset for Expenses
        lineTension: 0.3,
        backgroundColor: "rgba(255, 99, 132, 0.05)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: sales.thisYearMonthly.slice(0, -1), // Data for the new dataset
      }
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 12
        },
        scaleLabel: {
          display: true,
          labelString: 'Month'
      }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        scaleLabel: {
          display: true,
          labelString: 'Total Revenue by Month($)'
        } 
      }],
    },
    legend: {
      display: true,
      labels: {
        usePointStyle: true, // Use point style instead of a box
        
      }
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#0x555555",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});


// Quarter on Quarter Revenue
var qr = document.getElementById("QOQR");
lastYearQtr = []
thisYearQtr = []
placeholder1 = 0.0
placeholder2 = 0.0
function checkValid(qtr) {
    return !isNaN(qtr);
  }
for (let i = 1; i <= 13; i++) {
    if (i % 3 == 0){
        
        lastYearQtr.push(placeholder1.toFixed(2))
        placeholder1 = 0.0
        thisYearQtr.push(placeholder2.toFixed(2))
        placeholder2 = 0.0
    }else{
        placeholder1 += parseFloat(sales.lastYearMonthly[i])
        placeholder2 += parseFloat(sales.thisYearMonthly[i])
    }
  }
  thisYearQtr = thisYearQtr.filter(checkValid)
var QOQR = new Chart(qr, {
  type: 'line',
  data: {
    labels: ["1st Qtr","2nd Qtr", "3rd Qtr","4th Qtr"],
    datasets: [
      {
        label: currentYear-1,
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: lastYearQtr,
      },
      {
        label: currentYear, // New dataset for Expenses
        lineTension: 0.3,
        backgroundColor: "rgba(255, 99, 132, 0.05)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: thisYearQtr, // Data for the new dataset
      }
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'quarterly'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 4
        },
        scaleLabel: {
          display: true,
          labelString: 'Quarterly'
      }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        scaleLabel: {
          display: true,
          labelString: 'Total Revenue by Quarter($)'
        }
      }],
    },
    legend: {
      display: true,
      labels: {
        usePointStyle: true, // Use point style instead of a box
        
      }
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#0x555555",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

var tti = document.getElementById("topTenIngred").getContext("2d");
var topTenIngred = new Chart(tti, {
  type: 'horizontalBar',
  data: {
    labels: sales.top_sandwich[1],
    datasets: [{
      label: "Items",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: sales.top_sandwich[0],
      maxBarThickness: 25 // Set maxBarThickness here
    }],
  },
  options: {
    indexAxis: 'y',  // This makes the bars horizontal
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 25,
        top:0,
        bottom: 0
      }
    },
    scales: {
      x: [{
        ticks: {
          min: 0,
          max: 250,
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value) {
            return number_format(value);
          }
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        scaleLabel: {
          display: true,
          labelString: 'Item Count'
        } 
      }],

      y: [{
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 5
        },
        scaleLabel: {
          display: true,
          labelString: 'Sandwich Ingrendient'
        } 
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.xLabel);
        }
      }
    },
  }
});

var tts = document.getElementById("topThreeSmoothie").getContext("2d");
var topThreeSmoothie = new Chart(tts, {
  type: 'horizontalBar',
  data: {
    labels: sales.top_smoothie[1],
    datasets: [{
      label: "Items",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: sales.top_smoothie[0],
      maxBarThickness: 25 // Set maxBarThickness here
    }],
  },
  options: {
    indexAxis: 'y',  // This makes the bars horizontal
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 25,
        top:0,
        bottom: 0
      }
    },
    scales: {
      x: {
        ticks: {
          min: 0,
          max: 250,
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 5
        }
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.xLabel);
        }
      }
    },
  }
});

var sba = document.getElementById("spendbyAge");
ageGroup = []
ageSpend = []
for (x in sales.age_sales){
    ageGroup.push(x)
    ageSpend.push(sales.age_sales[x])
}
var spendbyAge = new Chart(sba, {
  type: 'line',
  data: {
    labels: ageGroup,
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: ageSpend,
    }],
  },
  
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        },
        scaleLabel: {
          display: true,
          labelString: 'Age Range By Group'
      }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        scaleLabel: {
          display: true,
          labelString: 'Total Revenue spend by Age Group($)'
        } 
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#0x555555",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});
