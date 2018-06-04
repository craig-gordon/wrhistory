const darkUnicaMod = {
  chart: {
    style: {
      fontFamily: 'Franklin Gothic, sans-serif'
    }
  },
  plotOptions: {
    series: {
      lineWidth: 4,
      marker: {
        radius: 6,
        symbol: 'circle'
      }
    }
  },
  title: {
    style: {
      fontSize: '24px'
    }
  },
  subtitle: {
    style: {
      textAlign: 'center'
    }
  },
  xAxis: {
    labels: {
      style: {
        fontSize: '14px'
      }
    },
    title: {
      enabled: false
    }
  },
  yAxis: {
    labels: {
      style: {
        fontSize: '14px'
      }
    },
    title: {
      style: {
        fontSize: '13px'
      }
    },
    tickInterval: 60 * 1000
  }
};

export default darkUnicaMod;