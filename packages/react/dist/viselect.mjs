/*! @viselect/react v3.2.6 MIT | https://github.com/Simonwep/selection/tree/master/packages/react */
import Se, { createRef as ir, useEffect as ur } from "react";
import sr from "@viselect/vanilla";
export * from "@viselect/vanilla";
import { default as hr } from "@viselect/vanilla";
var H = {}, fr = {
  get exports() {
    return H;
  },
  set exports(v) {
    H = v;
  }
}, F = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Re;
function lr() {
  if (Re)
    return F;
  Re = 1;
  var v = Se, R = Symbol.for("react.element"), P = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, S = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, O = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(E, l, p) {
    var g, h = {}, C = null, $ = null;
    p !== void 0 && (C = "" + p), l.key !== void 0 && (C = "" + l.key), l.ref !== void 0 && ($ = l.ref);
    for (g in l)
      m.call(l, g) && !O.hasOwnProperty(g) && (h[g] = l[g]);
    if (E && E.defaultProps)
      for (g in l = E.defaultProps, l)
        h[g] === void 0 && (h[g] = l[g]);
    return { $$typeof: R, type: E, key: C, ref: $, props: h, _owner: S.current };
  }
  return F.Fragment = P, F.jsx = T, F.jsxs = T, F;
}
var I = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Te;
function cr() {
  return Te || (Te = 1, process.env.NODE_ENV !== "production" && function() {
    var v = Se, R = Symbol.for("react.element"), P = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), E = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), $ = Symbol.for("react.offscreen"), X = Symbol.iterator, Oe = "@@iterator";
    function Ce(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = X && e[X] || e[Oe];
      return typeof r == "function" ? r : null;
    }
    var x = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function c(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        we("error", e, t);
      }
    }
    function we(e, r, t) {
      {
        var n = x.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var Pe = !1, xe = !1, je = !1, ke = !1, De = !1, Z;
    Z = Symbol.for("react.module.reference");
    function Ae(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === O || De || e === S || e === p || e === g || ke || e === $ || Pe || xe || je || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === h || e.$$typeof === T || e.$$typeof === E || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function Fe(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function Q(e) {
      return e.displayName || "Context";
    }
    function _(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case P:
          return "Portal";
        case O:
          return "Profiler";
        case S:
          return "StrictMode";
        case p:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            var r = e;
            return Q(r) + ".Consumer";
          case T:
            var t = e;
            return Q(t._context) + ".Provider";
          case l:
            return Fe(e, e.render, "ForwardRef");
          case h:
            var n = e.displayName || null;
            return n !== null ? n : _(e.type) || "Memo";
          case C: {
            var i = e, u = i._payload, o = i._init;
            try {
              return _(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, D = 0, ee, re, te, ne, ae, oe, ie;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function Ie() {
      {
        if (D === 0) {
          ee = console.log, re = console.info, te = console.warn, ne = console.error, ae = console.group, oe = console.groupCollapsed, ie = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        D++;
      }
    }
    function $e() {
      {
        if (D--, D === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: w({}, e, {
              value: ee
            }),
            info: w({}, e, {
              value: re
            }),
            warn: w({}, e, {
              value: te
            }),
            error: w({}, e, {
              value: ne
            }),
            group: w({}, e, {
              value: ae
            }),
            groupCollapsed: w({}, e, {
              value: oe
            }),
            groupEnd: w({}, e, {
              value: ie
            })
          });
        }
        D < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var M = x.ReactCurrentDispatcher, U;
    function W(e, r, t) {
      {
        if (U === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            U = n && n[1] || "";
          }
        return `
` + U + e;
      }
    }
    var B = !1, Y;
    {
      var We = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new We();
    }
    function se(e, r) {
      if (!e || B)
        return "";
      {
        var t = Y.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      B = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = M.current, M.current = null, Ie();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (y) {
              n = y;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (y) {
              n = y;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (y) {
            n = y;
          }
          e();
        }
      } catch (y) {
        if (y && n && typeof y.stack == "string") {
          for (var a = y.stack.split(`
`), d = n.stack.split(`
`), s = a.length - 1, f = d.length - 1; s >= 1 && f >= 0 && a[s] !== d[f]; )
            f--;
          for (; s >= 1 && f >= 0; s--, f--)
            if (a[s] !== d[f]) {
              if (s !== 1 || f !== 1)
                do
                  if (s--, f--, f < 0 || a[s] !== d[f]) {
                    var b = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, b), b;
                  }
                while (s >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        B = !1, M.current = u, $e(), Error.prepareStackTrace = i;
      }
      var k = e ? e.displayName || e.name : "", ye = k ? W(k) : "";
      return typeof e == "function" && Y.set(e, ye), ye;
    }
    function Ye(e, r, t) {
      return se(e, !1);
    }
    function Ne(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function N(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return se(e, Ne(e));
      if (typeof e == "string")
        return W(e);
      switch (e) {
        case p:
          return W("Suspense");
        case g:
          return W("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return Ye(e.render);
          case h:
            return N(e.type, r, t);
          case C: {
            var n = e, i = n._payload, u = n._init;
            try {
              return N(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var V = Object.prototype.hasOwnProperty, fe = {}, le = x.ReactDebugCurrentFrame;
    function L(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        le.setExtraStackFrame(t);
      } else
        le.setExtraStackFrame(null);
    }
    function Ve(e, r, t, n, i) {
      {
        var u = Function.call.bind(V);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var d = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw d.name = "Invariant Violation", d;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (L(i), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), L(null)), a instanceof Error && !(a.message in fe) && (fe[a.message] = !0, L(i), c("Failed %s type: %s", t, a.message), L(null));
          }
      }
    }
    var Le = Array.isArray;
    function q(e) {
      return Le(e);
    }
    function Me(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ue(e) {
      try {
        return ce(e), !1;
      } catch {
        return !0;
      }
    }
    function ce(e) {
      return "" + e;
    }
    function de(e) {
      if (Ue(e))
        return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Me(e)), ce(e);
    }
    var A = x.ReactCurrentOwner, Be = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ve, pe, J;
    J = {};
    function qe(e) {
      if (V.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Je(e) {
      if (V.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ge(e, r) {
      if (typeof e.ref == "string" && A.current && r && A.current.stateNode !== r) {
        var t = _(A.current.type);
        J[t] || (c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', _(A.current.type), e.ref), J[t] = !0);
      }
    }
    function ze(e, r) {
      {
        var t = function() {
          ve || (ve = !0, c("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Ke(e, r) {
      {
        var t = function() {
          pe || (pe = !0, c("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var He = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: R,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function Xe(e, r, t, n, i) {
      {
        var u, o = {}, a = null, d = null;
        t !== void 0 && (de(t), a = "" + t), Je(r) && (de(r.key), a = "" + r.key), qe(r) && (d = r.ref, Ge(r, i));
        for (u in r)
          V.call(r, u) && !Be.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            o[u] === void 0 && (o[u] = s[u]);
        }
        if (a || d) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && ze(o, f), d && Ke(o, f);
        }
        return He(e, a, d, i, n, A.current, o);
      }
    }
    var G = x.ReactCurrentOwner, ge = x.ReactDebugCurrentFrame;
    function j(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        ge.setExtraStackFrame(t);
      } else
        ge.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function K(e) {
      return typeof e == "object" && e !== null && e.$$typeof === R;
    }
    function be() {
      {
        if (G.current) {
          var e = _(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Ze(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var me = {};
    function Qe(e) {
      {
        var r = be();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ee(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = Qe(r);
        if (me[t])
          return;
        me[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + _(e._owner.type) + "."), j(e), c('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), j(null);
      }
    }
    function he(e, r) {
      {
        if (typeof e != "object")
          return;
        if (q(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            K(n) && Ee(n, r);
          }
        else if (K(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = Ce(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              K(o.value) && Ee(o.value, r);
        }
      }
    }
    function er(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === h))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = _(r);
          Ve(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var i = _(r);
          c("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && c("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function rr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            j(e), c("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), j(null);
            break;
          }
        }
        e.ref !== null && (j(e), c("Invalid attribute `ref` supplied to `React.Fragment`."), j(null));
      }
    }
    function _e(e, r, t, n, i, u) {
      {
        var o = Ae(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var d = Ze(i);
          d ? a += d : a += be();
          var s;
          e === null ? s = "null" : q(e) ? s = "array" : e !== void 0 && e.$$typeof === R ? (s = "<" + (_(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, c("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var f = Xe(e, r, t, i, u);
        if (f == null)
          return f;
        if (o) {
          var b = r.children;
          if (b !== void 0)
            if (n)
              if (q(b)) {
                for (var k = 0; k < b.length; k++)
                  he(b[k], e);
                Object.freeze && Object.freeze(b);
              } else
                c("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              he(b, e);
        }
        return e === m ? rr(f) : er(f), f;
      }
    }
    function tr(e, r, t) {
      return _e(e, r, t, !0);
    }
    function nr(e, r, t) {
      return _e(e, r, t, !1);
    }
    var ar = nr, or = tr;
    I.Fragment = m, I.jsx = ar, I.jsxs = or;
  }()), I;
}
(function(v) {
  process.env.NODE_ENV === "production" ? v.exports = lr() : v.exports = cr();
})(fr);
const dr = H.jsx, gr = (v) => {
  const R = ir();
  return ur(() => {
    const { onBeforeStart: P, onBeforeDrag: m, onStart: S, onMove: O, onStop: T, ...E } = v, l = R.current, p = new sr({
      boundaries: l,
      ...E
    });
    return P && p.on("beforestart", P), m && p.on("beforedrag", m), S && p.on("start", S), O && p.on("move", O), T && p.on("stop", T), () => p.destroy();
  }, []), /* @__PURE__ */ dr("div", { ref: R, className: v.className, id: v.id, children: v.children });
};
export {
  hr as VanillaSelectionArea,
  gr as default
};
//# sourceMappingURL=viselect.mjs.map
