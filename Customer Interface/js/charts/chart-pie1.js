// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart1");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Pulled Lamb", "Beef", "Smoked Salmon", "Chicken Breat"],
    datasets: [{
      data: [70, 50, 59,26],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#f6c23e'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf','#f6b23e'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
    },
    legend: {
        display: true, // Display the legend
        position: 'bottom', // Position of the legend (top, bottom, left, right)
        labels: {
            fontColor: '#333', // Color of the labels
            fontSize: 8, // Font size of the labels
            usePointStyle: true, // Use point style (like circles instead of squares)
        },
    },
    cutoutPercentage: 0,
    layout: {
        padding: {
            top: 5,
            bottom: 5, // Add space between the chart and the legend
        }
    },
},
});