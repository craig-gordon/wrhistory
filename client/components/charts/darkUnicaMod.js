const darkUnicaMod = {
  chart: {
    style: {
      // boxShadow: '3px 3px 5px rgba(61, 61, 61, 0.4)',
      fontFamily: 'Franklin Gothic, sans-serif'
    },
    borderColor: '#1c1c1c',
    borderWidth: 3,
    borderRadius: 2,
    height: 500,
    spacingRight: 20
  },
  plotOptions: {
    series: {
      lineWidth: 6,
      marker: {
        radius: 8,
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
        fontSize: '14px'
      }
    },
    tickInterval: 60 * 1000
  }
};

export default darkUnicaMod;