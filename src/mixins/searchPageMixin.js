import cloneDeep from "lodash/cloneDeep";
import warning from "../components/_utils/warning";
import isPlainObject from "../components/_utils/isPlainObject";

const ACTION_TYPE = {
  QUERY: "onQuery",
  RESET: "onReset",
  FRESH: "onFresh",
  TABLE_SEARCH: "onTableSearch",
};

const DEFAULT_CURRENT = 1;

export default {
  data() {
    return {
      pageloading: false,
      // 用于保存table loading状态
      __tableLoading: false,
      // 存储原始的form值，用于表单重置
      __form: {},
      // 存储当前分页参数
      __pageParam: undefined,
      // 存储分页参数key
      __paramKey: {},
      // 默认pageParam
      __defaultPageParam: {}
    };
  },
  computed: {
    nextTableProps() {
      return {
        onSearch: (pageParam, paramKey) => {
          return this.searchProxy(
            ACTION_TYPE.TABLE_SEARCH,
            pageParam,
            paramKey
          );
        },
        loading: this.pageloading,
        search: this.__pageParam,
      };
    },
    searchProxy() {
      return this.createSearchProxy();
    },
  },
  methods: {
    __setPageLoading(actionType, loading) {
      if (actionType === ACTION_TYPE.TABLE_SEARCH) {
        this.__tableLoading = loading;
      } else {
        this.pageloading = loading;
      }
    },
    createSearchProxy() {
      const handler = {
        async apply(target, context, applyArguments) {
          let params;
          let tempPageParams;
          const [actionType] = applyArguments;
          // table自带的搜索，如表格挂载查询、分页查询等
          if (actionType === ACTION_TYPE.TABLE_SEARCH) {
            // eslint-disable-next-line no-unused-vars
            const [_, pageParam, paramKey] = applyArguments;
            params = { ...pageParam, ...context.form };
            if (paramKey) {
              context.__paramKey = paramKey;
              context.__defaultPageParam = pageParam;
            }
            tempPageParams = pageParam;
          } else if (
            actionType === ACTION_TYPE.QUERY ||
            actionType === ACTION_TYPE.RESET
          ) {
            if (actionType === ACTION_TYPE.RESET) {
              // reset form fields
              context.form = cloneDeep(context.__form);
            }
            const { currentKey } = context.__paramKey;
            const finalPageParam = {
              ...(context.__pageParam || context.__defaultPageParam),
              [currentKey]: DEFAULT_CURRENT,
            };
            params = {
              ...finalPageParam,
              ...context.form,
            };
            tempPageParams = finalPageParam;
          } else if (actionType === ACTION_TYPE.FRESH) {
            params = {
              ...context.__pageParam,
              ...context.form,
            };
          }
          context.__setPageLoading(actionType, true);
          const result = await target(params).catch((error) => {
            context.__setPageLoading(actionType, false);
            throw error;
          });
          context.__pageParam = tempPageParams;
          context.__setPageLoading(actionType, false);
          return result;
        },
      };

      return typeof window.Proxy !== "undefined"
        ? new Proxy(this.onSearch, handler)
        : (...args) => handler.apply(this.onSearch, this, args);
    },
    createAction(actionType) {
      // 处理重新提交查询请求
      if (this.pageloading || this.__tableLoading) return;
      this.searchProxy(actionType);
    },
    [ACTION_TYPE.QUERY]() {
      this.createAction(ACTION_TYPE.QUERY);
    },
    [ACTION_TYPE.RESET]() {
      this.createAction(ACTION_TYPE.RESET);
    },
    [ACTION_TYPE.FRESH]() {
      this.createAction(ACTION_TYPE.FRESH);
    },
  },
  created() {
    warning(
      isPlainObject(this.form),
      "the mixin need a two-way binding ‘form’ attribute"
    );
    warning(
      typeof this.onSearch === "function",
      "the mixin need the onSearch method"
    );
    this.__form = cloneDeep(this.form);
  },
};
