import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

export function LaunchChart({ launches }: any) {
   const chartOptions = {
    chart: { id: "energy-bar", toolbar: { show: true } },
    xaxis: { categories: launches.map((l: any) => l.missionName), title: { text: "Missions" } },
    title: { text: "Estimated Energy Usage by Launch" },
    dataLabels: { enabled: false },
    yaxis: { title: { text: "Energy (J)" } },
    colors: ['#059669', '#1e40af', '#dc2626'],
  };

  const constructSeries = [
    { 
      name: "Energy", 
      data: launches.map((l: any) => l.energyMJ) 
    },
    { 
      name: "Mass", 
      data: launches.map((l: any) => l.mass)
    },
    { 
      name: "Payload Weight", 
      data: launches.map((l: any) => l.payloadWeights)
    }
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Chart options={chartOptions} series={constructSeries} type="bar" height={300} />
    </div>
  );
}


export function EnergyChart({ datasource, chartType = "bar" }: any) {
   const chartOptions = {
      chart: {
        type: chartType,
        height: 350,
        toolbar: {
          show: false
        }
      },
      colors: ['#059669d9', '#1e40afd9'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: datasource.map((item: { name: string }) => item.name),
        labels: {
          show: true,
          style: {
            colors: '#666',
            fontFamily: 'Roboto, sans-serif'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Energy (J)',
            style: {
              fontSize: '13px',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              color: '#059669d9'
            }
          },
          labels: {
            formatter: (value: number) => value.toFixed(1),
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto, sans-serif',
              colors: '#666'
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Mass (kg)',
            style: {
              fontSize: '13px',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              color: '#1e40afd9'
            }
          },
          labels: {
            formatter: (value: number) => {
              switch (true) {
                case value >= 1000000:
                  return (value / 1000000).toFixed(1) + 'M';
                case value >= 1000:
                  return (value / 1000).toFixed(0) + 'K';
                default:
                return value.toFixed(0);
              }
            },
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto, sans-serif',
              colors: '#666'
            }
          }
        }
      ]
    };

  const constructSeries = [
      {
        name: 'Energy',
        data: datasource.map((item: { energy: number }) => item.energy)
      },
      {
        name: 'Mass',
        data: datasource.map((item: { mass: number }) => item.mass)
      }
    ];

  return (
    <ReactApexChart options={chartOptions} series={constructSeries} type={chartType} height={350} />
  );
}