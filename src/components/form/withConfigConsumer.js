import { createHOC } from "../vue-hoc";

const { hasOwnProperty } = Object.prototype;

function getAttrsIncludeProps(attrs = {}, props) {
  return Object.keys(attrs).reduce((next, key) => {
    if (hasOwnProperty.call(props, key)) {
      next[key] = attrs[key];
    }
    return next;
  }, {});
}

function getAttrsExcludeProps(attrs = {}, props) {
  return Object.keys(attrs).reduce((next, key) => {
    if (!hasOwnProperty.call(props, key)) {
      next[key] = attrs[key];
    }
    return next;
  }, {});
}

export default function withConfigConsumer(Component) {
  const { props = {} } = Component;

  return createHOC(
    Component,
    {
      name: "withConfigConsumer",
      inheritAttrs: false,
      inheritProps: false,
      inject: {
        thales: { default: {} },
      },
      props: {},
    },
    {
      listeners(listeners) {
        return {
          ...listeners,
          "forward-ref": (key, ref) => {
            this[key] = ref;
          },
        };
      },
      attrs(attrs) {
        return getAttrsExcludeProps(attrs, props);
      },
      props($props) {
        const { _componentTag: tagName } = this.$options;
        console.log('tagName', tagName)

        const injectProps = this.thales[tagName];
        const afferentProps = getAttrsIncludeProps(this.$attrs, props);
        return {
          ...$props,
          ...injectProps,
          ...afferentProps,
        };
      },
    }
  );
}
