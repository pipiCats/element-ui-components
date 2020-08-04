<template>
  <el-row>
    <el-table v-bind="$attrs" v-on="$listeners" v-loading="loadingProp">
      <el-table-column
        v-for="{ key, ...field } in columnFields"
        :key="key"
        v-bind="field"
      />
      <el-table-column
        v-for="{ key, type, render, ...field } in userFields"
        :key="key"
        :type="type"
        v-bind="field"
      >
        <template slot-scope="scope">
          <slot :name="key" v-bind="scope">
            <template v-if="isNotExpandColumn(type)">
              <template v-if="typeof render === 'function'">
                {{ render(scope.row[key], scope.row) }}
              </template>
              <template v-if="type && !render">
                {{ renderFunc(type)(scope.row[key], scope.row) }}
              </template>
              <template v-if="!type && !render">
                {{ scope.row[key] }}
              </template>
            </template>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" :style="{ padding: '20px' }">
      <hy-pagination
        v-model="pageParam"
        v-bind="paginationProps"
        @loading-change="handleLoadingChange"
        :on-search="onSearch"
      />
    </el-row>
  </el-row>
</template>

<script>
import pick from "lodash.pick";
import HyPagination from "../pagination";
import TableFields from "./tableFields";
import { EXPAND_COLUMN, SPECIAL_TABLE_COLUMN } from "./constants";
import defaultRenderType from "./renderType";
import warning from "../_utils/warning";

export default {
  name: "HyTable",
  inject: ["globalRenderType"],
  components: {
    HyPagination,
  },
  props: {
    fields: {
      required: true,
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    nextFields: {
      type: Array,
      default: () => [],
    },
    renderType: {
      type: Object,
      default: () => {},
    },
    onSearch: {
      type: Function,
      default: undefined,
    },
    pagination: {
      type: [Boolean, Object],
      default: () => {},
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
      default: 100,
    },
    search: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      pageParam: undefined,
      paginationLoading: false,
    };
  },
  computed: {
    renderTypes() {
      return {
        ...(this.globalRenderType || {}),
        ...this.renderType,
        ...defaultRenderType,
      };
    },
    dealedFields() {
      return this.tableFields.combineNextFields(this.nextFields);
    },
    columnFields() {
      return this.dealedFields.filter(({ type }) => SPECIAL_TABLE_COLUMN[type]);
    },
    userFields() {
      return this.dealedFields.filter(
        ({ type }) => !SPECIAL_TABLE_COLUMN[type]
      );
    },
    loadingProp() {
      return this.loading || this.paginationLoading;
    },
    paginationProps() {
      return pick(this.$props, ["total", "pageSizeKey", "currentKey"]);
    },
  },
  watch: {
    search: {
      immediate: true,
      handler(val) {
        if (val) {
          this.pageParam = val;
        }
      },
    },
  },
  methods: {
    isNotExpandColumn(type) {
      return type !== EXPAND_COLUMN;
    },
    renderFunc(type) {
      const renderFunc = this.renderTypes[type];
      warning(
        !!renderFunc,
        `The render function of type=${type} does not exist`
      );
      return renderFunc;
    },
    handleLoadingChange(loading) {
      this.paginationLoading = loading;
    },
  },
  created() {
    this.tableFields = new TableFields(this.fields);
  },
  mounted() {
    if (this.onSearch) {
      this.$nextTick(async () => {
        try {
          this.paginationLoading = true;
          await this.onSearch(this.pageParam, {
            currentKey: this.currentKey,
            pageSizeKey: this.pageSizeKey,
          });
          this.paginationLoading = false;
        } catch (error) {
          this.paginationLoading = false;
          throw error;
        }
      });
    }
  },
};
</script>
