/*! @viselect/vue v3.2.6 MIT | https://github.com/Simonwep/selection/tree/master/packages/vue */
import i from "@viselect/vanilla";
export * from "@viselect/vanilla";
import { default as y } from "@viselect/vanilla";
import { defineComponent as p, ref as v, shallowRef as m, watchEffect as S, onBeforeUnmount as d, openBlock as _, createElementBlock as B, renderSlot as A } from "vue";
const h = /* @__PURE__ */ p({
  __name: "SelectionArea",
  props: {
    options: null,
    onBeforeStart: null,
    onBeforeDrag: null,
    onStart: null,
    onMove: null,
    onStop: null
  },
  setup(f, { expose: c }) {
    const r = f, n = v(), e = m();
    return S(() => {
      var o;
      if (n.value) {
        (o = e.value) == null || o.destroy(), e.value = new i({
          boundaries: n.value,
          ...r.options
        });
        const { onBeforeStart: t, onBeforeDrag: a, onStart: l, onMove: s, onStop: u } = r;
        t && e.value.on("beforestart", t), a && e.value.on("beforedrag", a), l && e.value.on("start", l), s && e.value.on("move", s), u && e.value.on("stop", u);
      }
    }), d(() => {
      var o;
      (o = e.value) == null || o.destroy();
    }), c({
      selection: e
    }), (o, t) => (_(), B("div", {
      ref_key: "container",
      ref: n
    }, [
      A(o.$slots, "default")
    ], 512));
  }
});
export {
  h as SelectionArea,
  y as VanillaSelectionArea
};
//# sourceMappingURL=viselect.mjs.map
