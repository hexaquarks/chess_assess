<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    chartOption: {
      type: Object,
      default: null
    },
    height: ""
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
};
</script>
