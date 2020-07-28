/**
 * @description 用于处理表格分页逻辑
 */
import isPlainObject from "../../_utils/isPlainObject";

const UNSAFE_PAGE_SIZE = 10;
const DEFAULT_CURRENT = 1;

export default {
  props: {
    value: {
      type: Object,
      default: undefined,
    },
    onSearch: {
      type: Function,
      default: undefined
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 80, 100],
    },
    pageSizeKey: {
      type: String,
      default: "pageSize",
    },
    currentKey: {
      type: String,
      default: "current",
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      pageSize: UNSAFE_PAGE_SIZE,
      current: DEFAULT_CURRENT,
    };
  },
  watch: {
    loading: {
      immediate: true,
      handler(status) {
        this.$emit("loading-change", status);
      },
    },
    value: {
      immediate: true,
      handler(val) {
        if (isPlainObject(val)) {
          this.current = val[this.currentKey];
          this.pageSize = val[this.pageSizeKey];
        }
      },
    },
  },
  methods: {
    getDefaultPageSize() {
      const pageSizes = this.pageSizes;
      if (Array.isArray(pageSizes) && pageSizes.length) {
        return pageSizes[0];
      }
      return UNSAFE_PAGE_SIZE;
    },
    notifyValueChange() {
      this.$emit("input", {
        [this.pageSizeKey]: this.pageSize,
        [this.currentKey]: this.current,
      });
    },
    handleSizeChange(pageSize) {
      const pageParam = {
        [this.pageSizeKey]: pageSize,
        [this.currentKey]: this.current,
      };
      if (pageSize * this.current > this.total) {
        pageParam[this.currentKey] = DEFAULT_CURRENT;
      }
      this.handleSearch(pageParam);
    },
    handleCurrentChange(current) {
      const pageParam = {
        [this.pageSizeKey]: this.pageSize,
        [this.currentKey]: current,
      };
      this.handleSearch(pageParam);
    },
    async handleSearch(pageParam) {
      if (!this.onSearch) return;
      const prePageParam = {
        current: this.current,
        pageSize: this.pageSize,
      };
      try {
        this.current = pageParam[this.currentKey];
        this.pageSize = pageParam[this.pageSizeKey];
        this.loading = true;
        await this.onSearch(pageParam);
        this.loading = false;
        this.notifyValueChange();
      } catch (error) {
        this.loading = false;
        this.current = prePageParam.current;
        this.pageSize = prePageParam.pageSize;
        this.notifyValueChange();
        throw error;
      }
    },
  },
  created() {
    if (isPlainObject(this.value)) return;
    this.pageSize = this.getDefaultPageSize();
    // 赋初始值
    this.notifyValueChange();
  },
};
