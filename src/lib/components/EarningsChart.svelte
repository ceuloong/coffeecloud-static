<script lang="ts">
  import { onMount } from 'svelte';
  import { language, t } from '$lib/stores/i18nStore';
  import { browser } from '$app/environment';
  
  let ApexCharts;
  
  export let data: {
    labels: string[];
    values: number[];
  };
  
  let chartElement: HTMLElement;
  let chart: any;
  let selectedRange = '7d';
  
  const timeRanges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' }
  ];

  // 格式化日期
  function formatDate(dateStr: string, range: string) {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateStr);
        return '';
      }
      
      // 根据不同的时间范围使用不同的格式
      switch(range) {
        case '24h':
          // 24小时显示 时:分
          return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
          });
        case '7d':
          // 7天显示 月/日
          return date.toLocaleDateString('zh-CN', {
            month: '2-digit',
            day: '2-digit'
          });
        case '30d':
          // 30天每3天显示一次日期
          return date.getDate() % 3 === 0 ? 
            date.toLocaleDateString('zh-CN', {
              month: '2-digit',
              day: '2-digit'
            }) : '';
        case '90d':
          // 90天显示月/日，每15天显示一次
          return date.getDate() % 15 === 1 ? 
            date.toLocaleDateString('zh-CN', {
              month: '2-digit',
              day: '2-digit'
            }) : '';
        default:
          return '';
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  // 格式化tooltip的日期显示
  function formatTooltipDate(dateStr: string, range: string) {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateStr);
        return 'Invalid Date';
      }
      
      switch(range) {
        case '24h':
          // 24小时显示 月/日 时:分
          return date.toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
        default:
          // 其他情况显示 年/月/日
          return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
      }
    } catch (error) {
      console.error('Error formatting tooltip date:', error);
      return 'Invalid Date';
    }
  }

  // 格式化数值
  function formatValue(value: number) {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}k`;
    }
    return value.toFixed(4);
  }

  async function fetchEarningsData(range: string) {
    const response = await fetch(`/api/earnings/chart?range=${range}`);
    return await response.json();
  }

  onMount(async () => {
    if (browser) {
      const ApexChartsModule = await import('apexcharts');
      ApexCharts = ApexChartsModule.default;
      
      const initialData = await fetchEarningsData(selectedRange);
      data = initialData;
      
      const options = {
        chart: {
          type: 'line',
          height: 300,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            }
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        },
        series: [{
          name: t('dashboard.earnings.chart.daily', $language),
          data: data.values
        }],
        xaxis: {
          categories: data.labels.map(d => formatDate(d, selectedRange)),
          title: {
            text: t('dashboard.earnings.chart.xAxis', $language)
          },
          tooltip: {
            enabled: false
          },
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500
            },
            rotate: -45,  // 旋转标签
            rotateAlways: false,
            hideOverlappingLabels: true,  // 隐藏重叠的标签
            maxHeight: 60
          },
          tickAmount: getTickAmount(selectedRange)  // 根据时间范围设置刻度数量
        },
        yaxis: {
          title: {
            text: t('dashboard.earnings.chart.yAxis', $language)
          },
          labels: {
            formatter: (value: number) => formatValue(value),
            style: {
              fontSize: '12px',
              fontWeight: 500
            }
          }
        },
        stroke: {
          curve: 'smooth',
          width: 3,
          lineCap: 'round'
        },
        colors: ['#059669'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.8,
            opacityFrom: 0.8,
            opacityTo: 0.2,
            stops: [0, 90, 100],
            colorStops: [
              {
                offset: 0,
                color: '#059669',
                opacity: 0.8
              },
              {
                offset: 100,
                color: '#059669',
                opacity: 0.2
              }
            ]
          }
        },
        tooltip: {
          shared: true,
          intersect: false,
          theme: 'light',
          style: {
            fontSize: '12px'
          },
          y: {
            formatter: (value: number) => `${value.toFixed(4)} ${t('dashboard.earnings.chart.unit', $language)}`
          },
          x: {
            formatter: (value: number) => {
              return formatTooltipDate(data.labels[value], selectedRange);
            }
          }
        },
        markers: {
          size: 5,
          colors: ['#059669'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 7,
            sizeOffset: 3
          }
        },
        grid: {
          borderColor: '#e5e7eb',
          strokeDashArray: 4,
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5
          },
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
          }
        },
        responsive: [{
          breakpoint: 640,
          options: {
            chart: {
              height: 250
            },
            markers: {
              size: 4,
              hover: {
                size: 6
              }
            }
          }
        }]
      };

      chart = new ApexCharts(chartElement, options);
      chart.render();

      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    }
  });

  // 根据时间范围获取合适的刻度数量
  function getTickAmount(range: string): number {
    switch(range) {
      case '24h':
        return 6;  // 每4小时一个刻度
      case '7d':
        return 7;  // 每天一个刻度
      case '30d':
        return 10;  // 每3天一个刻度
      case '90d':
        return 6;  // 大约每15天一个刻度
      default:
        return 7;
    }
  }

  async function updateTimeRange(range: string) {
    selectedRange = range;
    if (browser && chart) {
      const newData = await fetchEarningsData(range);
      chart.updateOptions({
        xaxis: {
          categories: newData.labels.map(d => formatDate(d, range)),
          tickAmount: getTickAmount(range)
        },
        tooltip: {
          x: {
            formatter: (value: number) => {
              return formatTooltipDate(newData.labels[value], range);
            }
          }
        }
      });
      chart.updateSeries([{
        data: newData.values
      }]);
    }
  }
</script>

<div class="earnings-chart">
  <div class="chart-header">
    <h3>{t('dashboard.earnings.chart.title', $language)}</h3>
    <div class="time-ranges">
      {#each timeRanges as range}
        <button 
          class="range-btn" 
          class:active={selectedRange === range.value}
          on:click={() => updateTimeRange(range.value)}
        >
          {t(`dashboard.earnings.chart.timeRanges.${range.value}`, $language)}
        </button>
      {/each}
    </div>
  </div>

  <div class="chart-container" bind:this={chartElement}></div>
</div>

<style>
  .earnings-chart {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .chart-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  .time-ranges {
    display: flex;
    gap: 0.5rem;
  }

  .range-btn {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: white;
    color: var(--text-color);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .range-btn:hover {
    background: #f8fafc;
  }

  .range-btn.active {
    background: #059669;
    color: white;
    border-color: #059669;
  }

  .chart-container {
    height: 300px;
    position: relative;
    margin-top: 1rem;
  }

  @media (max-width: 640px) {
    .chart-container {
      height: 250px;
    }
  }
</style> 