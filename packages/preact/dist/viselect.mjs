/*! @viselect/preact v3.2.6 MIT | https://github.com/Simonwep/selection/tree/master/packages/preact */
import { options as m, createRef as U } from "preact";
/*! @viselect/vanilla v3.2.6 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
var Z = Object.defineProperty, tt = (s, t, e) => t in s ? Z(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, d = (s, t, e) => (tt(s, typeof t != "symbol" ? t + "" : t, e), e);
class et {
  constructor() {
    d(this, "_listeners", /* @__PURE__ */ new Map()), d(this, "on", this.addEventListener), d(this, "off", this.removeEventListener), d(this, "emit", this.dispatchEvent);
  }
  addEventListener(t, e) {
    const i = this._listeners.get(t) || /* @__PURE__ */ new Set();
    return this._listeners.set(t, i), i.add(e), this;
  }
  removeEventListener(t, e) {
    var i;
    return (i = this._listeners.get(t)) == null || i.delete(e), this;
  }
  dispatchEvent(t, ...e) {
    let i = !0;
    for (const o of this._listeners.get(t) || [])
      i = o(...e) !== !1 && i;
    return i;
  }
  unbindAllListeners() {
    this._listeners.clear();
  }
}
const D = (s, t = "px") => typeof s == "number" ? s + t : s;
function y({ style: s }, t, e) {
  if (typeof t == "object")
    for (const [i, o] of Object.entries(t))
      o !== void 0 && (s[i] = D(o));
  else
    e !== void 0 && (s[t] = D(e));
}
function z(s) {
  return (t, e, i, o = {}) => {
    t instanceof HTMLCollection || t instanceof NodeList ? t = Array.from(t) : Array.isArray(t) || (t = [t]), Array.isArray(e) || (e = [e]);
    for (const n of t)
      for (const l of e)
        n[s](l, i, { capture: !1, ...o });
    return [t, e, i, o];
  };
}
const x = z("addEventListener"), E = z("removeEventListener"), w = (s) => {
  const { clientX: t, clientY: e, target: i } = s.touches && s.touches[0] || s;
  return { x: t, y: e, target: i };
};
function B(s, t, e = "touch") {
  switch (e) {
    case "center": {
      const i = t.left + t.width / 2, o = t.top + t.height / 2;
      return i >= s.left && i <= s.right && o >= s.top && o <= s.bottom;
    }
    case "cover":
      return t.left >= s.left && t.top >= s.top && t.right <= s.right && t.bottom <= s.bottom;
    case "touch":
      return s.right >= t.left && s.left <= t.right && s.bottom >= t.top && s.top <= t.bottom;
  }
}
function A(s, t = document) {
  const e = Array.isArray(s) ? s : [s];
  let i = [];
  for (let o = 0, n = e.length; o < n; o++) {
    const l = e[o];
    typeof l == "string" ? i = i.concat(Array.from(t.querySelectorAll(l))) : l instanceof Element && i.push(l);
  }
  return i;
}
const it = () => matchMedia("(hover: none), (pointer: coarse)").matches, st = () => "safari" in window, ot = (s) => {
  let t, e = -1, i = !1;
  return {
    next(...o) {
      t = o, i || (i = !0, e = requestAnimationFrame(() => {
        s(...t), i = !1;
      }));
    },
    cancel() {
      cancelAnimationFrame(e), i = !1;
    }
  };
}, { abs: S, max: F, min: P, ceil: q } = Math;
class K extends et {
  constructor(t) {
    var e, i, o, n, l;
    super(), d(this, "_options"), d(this, "_selection", {
      stored: [],
      selected: [],
      touched: [],
      changed: {
        added: [],
        // Added elements since last selection
        removed: []
        // Removed elements since last selection
      }
    }), d(this, "_area"), d(this, "_clippingElement"), d(this, "_targetElement"), d(this, "_targetRect"), d(this, "_selectables", []), d(this, "_latestElement"), d(this, "_areaRect", new DOMRect()), d(this, "_areaLocation", { y1: 0, x2: 0, y2: 0, x1: 0 }), d(this, "_singleClick", !0), d(this, "_frame"), d(this, "_scrollAvailable", !0), d(this, "_scrollingActive", !1), d(this, "_scrollSpeed", { x: 0, y: 0 }), d(this, "_scrollDelta", { x: 0, y: 0 }), d(this, "disable", this._bindStartEvents.bind(this, !1)), d(this, "enable", this._bindStartEvents), this._options = {
      selectionAreaClass: "selection-area",
      selectionContainerClass: void 0,
      selectables: [],
      document: window.document,
      startAreas: ["html"],
      boundaries: ["html"],
      container: "body",
      ...t,
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        ...t.behaviour,
        startThreshold: (e = t.behaviour) != null && e.startThreshold ? typeof t.behaviour.startThreshold == "number" ? t.behaviour.startThreshold : { x: 10, y: 10, ...t.behaviour.startThreshold } : { x: 10, y: 10 },
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          ...(i = t.behaviour) == null ? void 0 : i.scrolling,
          startScrollMargins: {
            x: 0,
            y: 0,
            ...(n = (o = t.behaviour) == null ? void 0 : o.scrolling) == null ? void 0 : n.startScrollMargins
          }
        }
      },
      features: {
        range: !0,
        touch: !0,
        ...t.features,
        singleTap: {
          allow: !0,
          intersect: "native",
          ...(l = t.features) == null ? void 0 : l.singleTap
        }
      }
    };
    for (const p of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      typeof this[p] == "function" && (this[p] = this[p].bind(this));
    const { document: r, selectionAreaClass: a, selectionContainerClass: c } = this._options;
    this._area = r.createElement("div"), this._clippingElement = r.createElement("div"), this._clippingElement.appendChild(this._area), this._area.classList.add(a), c && this._clippingElement.classList.add(c), y(this._area, {
      willChange: "top, left, bottom, right, width, height",
      top: 0,
      left: 0,
      position: "fixed"
    }), y(this._clippingElement, {
      overflow: "hidden",
      position: "fixed",
      transform: "translate3d(0, 0, 0)",
      // https://stackoverflow.com/a/38268846
      pointerEvents: "none",
      zIndex: "1"
    }), this._frame = ot((p) => {
      this._recalculateSelectionAreaRect(), this._updateElementSelection(), this._emitEvent("move", p), this._redrawSelectionArea();
    }), this.enable();
  }
  _bindStartEvents(t = !0) {
    const { document: e, features: i } = this._options, o = t ? x : E;
    o(e, "mousedown", this._onTapStart), i.touch && o(e, "touchstart", this._onTapStart, {
      passive: !1
    });
  }
  _onTapStart(t, e = !1) {
    const { x: i, y: o, target: n } = w(t), { _options: l } = this, { document: r } = this._options, a = n.getBoundingClientRect(), c = A(l.startAreas, l.document), p = A(
      l.boundaries,
      l.document
    );
    this._targetElement = p.find(
      (v) => B(v.getBoundingClientRect(), a)
    );
    const f = t.composedPath();
    if (!this._targetElement || !c.find((v) => f.includes(v)) || !p.find((v) => f.includes(v)) || !e && this._emitEvent("beforestart", t) === !1)
      return;
    this._areaLocation = { x1: i, y1: o, x2: 0, y2: 0 };
    const h = r.scrollingElement || r.body;
    this._scrollDelta = {
      x: h.scrollLeft,
      y: h.scrollTop
    }, this._singleClick = !0, this.clearSelection(!1, !0), x(r, ["touchmove", "mousemove"], this._delayedTapMove, {
      passive: !1
    }), x(r, ["mouseup", "touchcancel", "touchend"], this._onTapStop), x(r, "scroll", this._onScroll);
  }
  _onSingleTap(t) {
    const {
      singleTap: { intersect: e },
      range: i
    } = this._options.features, o = w(t);
    let n;
    if (e === "native")
      n = o.target;
    else if (e === "touch") {
      this.resolveSelectables();
      const { x: r, y: a } = o;
      n = this._selectables.find((c) => {
        const { right: p, left: f, top: h, bottom: v } = c.getBoundingClientRect();
        return r < p && r > f && a < v && a > h;
      });
    }
    if (!n)
      return;
    for (this.resolveSelectables(); !this._selectables.includes(n); ) {
      if (!n.parentElement)
        return;
      n = n.parentElement;
    }
    const { stored: l } = this._selection;
    if (this._emitEvent("start", t), t.shiftKey && l.length && i) {
      const r = this._latestElement ?? l[0], [a, c] = r.compareDocumentPosition(n) & 4 ? [n, r] : [r, n], p = [
        ...this._selectables.filter(
          (f) => f.compareDocumentPosition(a) & 4 && f.compareDocumentPosition(c) & 2
        ),
        a,
        c
      ];
      this.select(p), this._latestElement = n;
    } else
      l.includes(n) && (l.length === 1 || t.ctrlKey || l.every((r) => this._selection.stored.includes(r))) ? (this.deselect(n), this._latestElement = n) : (this.select(n), this._latestElement = n);
    this._emitEvent("stop", t);
  }
  _delayedTapMove(t) {
    const {
      container: e,
      document: i,
      behaviour: { startThreshold: o }
    } = this._options, { x1: n, y1: l } = this._areaLocation, { x: r, y: a } = w(t);
    if (
      // Single number for both coordinates
      typeof o == "number" && S(r + a - (n + l)) >= o || // Different x and y threshold
      typeof o == "object" && S(r - n) >= o.x || S(a - l) >= o.y
    ) {
      if (E(i, ["mousemove", "touchmove"], this._delayedTapMove, {
        passive: !1
      }), this._emitEvent("beforedrag", t) === !1) {
        E(i, ["mouseup", "touchcancel", "touchend"], this._onTapStop);
        return;
      }
      x(i, ["mousemove", "touchmove"], this._onTapMove, {
        passive: !1
      }), y(this._area, "display", "block"), A(e, i)[0].appendChild(this._clippingElement), this.resolveSelectables(), this._singleClick = !1, this._targetRect = this._targetElement.getBoundingClientRect(), this._scrollAvailable = this._targetElement.scrollHeight !== this._targetElement.clientHeight || this._targetElement.scrollWidth !== this._targetElement.clientWidth, this._scrollAvailable && (x(i, "wheel", this._manualScroll, { passive: !1 }), this._selectables = this._selectables.filter(
        (c) => this._targetElement.contains(c)
      )), this._setupSelectionArea(), this._emitEvent("start", t), this._onTapMove(t);
    }
    this._handleMoveEvent(t);
  }
  _setupSelectionArea() {
    const { _clippingElement: t, _targetElement: e, _area: i } = this, o = this._targetRect = e.getBoundingClientRect();
    this._scrollAvailable ? (y(t, {
      top: o.top,
      left: o.left,
      width: o.width,
      height: o.height
    }), y(i, {
      marginTop: -o.top,
      marginLeft: -o.left
    })) : (y(t, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }), y(i, {
      marginTop: 0,
      marginLeft: 0
    }));
  }
  _onTapMove(t) {
    const { x: e, y: i } = w(t), { _scrollSpeed: o, _areaLocation: n, _options: l, _frame: r } = this, { speedDivider: a } = l.behaviour.scrolling, c = this._targetElement;
    if (n.x2 = e, n.y2 = i, this._scrollAvailable && !this._scrollingActive && (o.y || o.x)) {
      this._scrollingActive = !0;
      const p = () => {
        if (!o.x && !o.y) {
          this._scrollingActive = !1;
          return;
        }
        const { scrollTop: f, scrollLeft: h } = c;
        o.y && (c.scrollTop += q(o.y / a), n.y1 -= c.scrollTop - f), o.x && (c.scrollLeft += q(o.x / a), n.x1 -= c.scrollLeft - h), r.next(t), requestAnimationFrame(p);
      };
      requestAnimationFrame(p);
    } else
      r.next(t);
    this._handleMoveEvent(t);
  }
  _handleMoveEvent(t) {
    const { features: e } = this._options;
    (e.touch && it() || this._scrollAvailable && st()) && t.preventDefault();
  }
  _onScroll() {
    const {
      _scrollDelta: t,
      _options: { document: e }
    } = this, { scrollTop: i, scrollLeft: o } = e.scrollingElement || e.body;
    this._areaLocation.x1 += t.x - o, this._areaLocation.y1 += t.y - i, t.x = o, t.y = i, this._setupSelectionArea(), this._frame.next(null);
  }
  _manualScroll(t) {
    const { manualSpeed: e } = this._options.behaviour.scrolling, i = t.deltaY ? t.deltaY > 0 ? 1 : -1 : 0, o = t.deltaX ? t.deltaX > 0 ? 1 : -1 : 0;
    this._scrollSpeed.y += i * e, this._scrollSpeed.x += o * e, this._onTapMove(t), t.preventDefault();
  }
  _recalculateSelectionAreaRect() {
    const { _scrollSpeed: t, _areaLocation: e, _areaRect: i, _targetElement: o, _options: n } = this, {
      scrollTop: l,
      scrollHeight: r,
      clientHeight: a,
      scrollLeft: c,
      scrollWidth: p,
      clientWidth: f
    } = o, h = this._targetRect, { x1: v, y1: T } = e;
    let { x2: u, y2: _ } = e;
    const {
      behaviour: {
        scrolling: { startScrollMargins: b }
      }
    } = n;
    u < h.left + b.x ? (t.x = c ? -S(h.left - u + b.x) : 0, u = u < h.left ? h.left : u) : u > h.right - b.x ? (t.x = p - c - f ? S(
      h.left + h.width - u - b.x
    ) : 0, u = u > h.right ? h.right : u) : t.x = 0, _ < h.top + b.y ? (t.y = l ? -S(h.top - _ + b.y) : 0, _ = _ < h.top ? h.top : _) : _ > h.bottom - b.y ? (t.y = r - l - a ? S(
      h.top + h.height - _ - b.y
    ) : 0, _ = _ > h.bottom ? h.bottom : _) : t.y = 0;
    const R = P(v, u), k = P(T, _), J = F(v, u), Q = F(T, _);
    i.x = R, i.y = k, i.width = J - R, i.height = Q - k;
  }
  _redrawSelectionArea() {
    const { x: t, y: e, width: i, height: o } = this._areaRect, { style: n } = this._area;
    n.left = `${t}px`, n.top = `${e}px`, n.width = `${i}px`, n.height = `${o}px`;
  }
  _onTapStop(t, e) {
    var i;
    const { document: o, features: n } = this._options, { _singleClick: l } = this;
    E(o, ["mousemove", "touchmove"], this._delayedTapMove), E(o, ["touchmove", "mousemove"], this._onTapMove), E(o, ["mouseup", "touchcancel", "touchend"], this._onTapStop), E(o, "scroll", this._onScroll), this._keepSelection(), t && l && n.singleTap.allow ? this._onSingleTap(t) : !l && !e && (this._updateElementSelection(), this._emitEvent("stop", t)), this._scrollSpeed.x = 0, this._scrollSpeed.y = 0, this._scrollAvailable && E(o, "wheel", this._manualScroll, { passive: !0 }), this._clippingElement.remove(), (i = this._frame) == null || i.cancel(), y(this._area, "display", "none");
  }
  _updateElementSelection() {
    const { _selectables: t, _options: e, _selection: i, _areaRect: o } = this, { stored: n, selected: l, touched: r } = i, { intersect: a, overlap: c } = e.behaviour, p = c === "invert", f = [], h = [], v = [];
    for (let u = 0; u < t.length; u++) {
      const _ = t[u];
      if (B(o, _.getBoundingClientRect(), a)) {
        if (l.includes(_))
          n.includes(_) && !r.includes(_) && r.push(_);
        else if (p && n.includes(_)) {
          v.push(_);
          continue;
        } else
          h.push(_);
        f.push(_);
      }
    }
    p && h.push(...n.filter((u) => !l.includes(u)));
    const T = c === "keep";
    for (let u = 0; u < l.length; u++) {
      const _ = l[u];
      !f.includes(_) && !// Check if user wants to keep previously selected elements, e.g.
      // not make them part of the current selection as soon as they're touched.
      (T && n.includes(_)) && v.push(_);
    }
    i.selected = f, i.changed = { added: h, removed: v }, this._latestElement = f[f.length - 1];
  }
  _emitEvent(t, e) {
    return this.emit(t, {
      event: e,
      store: this._selection,
      selection: this
    });
  }
  _keepSelection() {
    const { _options: t, _selection: e } = this, { selected: i, changed: o, touched: n, stored: l } = e, r = i.filter((a) => !l.includes(a));
    switch (t.behaviour.overlap) {
      case "drop": {
        e.stored = [
          ...r,
          ...l.filter((a) => !n.includes(a))
          // Elements not touched
        ];
        break;
      }
      case "invert": {
        e.stored = [
          ...r,
          ...l.filter((a) => !o.removed.includes(a))
          // Elements not removed from selection
        ];
        break;
      }
      case "keep": {
        e.stored = [
          ...l,
          ...i.filter((a) => !l.includes(a))
          // Newly added
        ];
        break;
      }
    }
  }
  /**
   * Manually triggers the start of a selection
   * @param evt A MouseEvent / TouchEvent -like object
   * @param silent If beforestart should be fired,
   */
  trigger(t, e = !0) {
    this._onTapStart(t, e);
  }
  /**
   * Can be used if during a selection elements have been added.
   * Will update everything which can be selected.
   */
  resolveSelectables() {
    this._selectables = A(
      this._options.selectables,
      this._options.document
    );
  }
  /**
   * Same as deselect, but for all elements currently selected.
   * @param includeStored If the store should also get cleared
   * @param quiet If move / stop events should be fired
   */
  clearSelection(t = !0, e = !1) {
    const { selected: i, stored: o, changed: n } = this._selection;
    n.added = [], n.removed.push(...i, ...t ? o : []), e || (this._emitEvent("move", null), this._emitEvent("stop", null)), this._selection = {
      stored: t ? [] : o,
      selected: [],
      touched: [],
      changed: { added: [], removed: [] }
    };
  }
  /**
   * @returns {Array} Selected elements
   */
  getSelection() {
    return this._selection.stored;
  }
  /**
   * @returns {HTMLElement} The selection area element
   */
  getSelectionArea() {
    return this._area;
  }
  /**
   * Cancel the current selection process.
   * @param keepEvent {boolean} true to fire a stop event after cancel.
   */
  cancel(t = !1) {
    this._onTapStop(null, !t);
  }
  /**
   * Unbinds all events and removes the area-element.
   */
  destroy() {
    this.cancel(), this.disable(), this._clippingElement.remove(), super.unbindAllListeners();
  }
  /**
   * Adds elements to the selection
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  select(t, e = !1) {
    const { changed: i, selected: o, stored: n } = this._selection, l = A(t, this._options.document).filter(
      (r) => !o.includes(r) && !n.includes(r)
    );
    return n.push(...l), o.push(...l), i.added.push(...l), i.removed = [], this._latestElement = void 0, e || (this._emitEvent("move", null), this._emitEvent("stop", null)), l;
  }
  /**
   * Removes a particular element from the selection.
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  deselect(t, e = !1) {
    const { selected: i, stored: o, changed: n } = this._selection, l = A(t, this._options.document).filter(
      (r) => i.includes(r) || o.includes(r)
    );
    l.length && (this._selection.stored = o.filter((r) => !l.includes(r)), this._selection.selected = i.filter((r) => !l.includes(r)), this._selection.changed.added = [], this._selection.changed.removed.push(
      ...l.filter((r) => !n.removed.includes(r))
    ), this._latestElement = void 0, e || (this._emitEvent("move", null), this._emitEvent("stop", null)));
  }
}
d(K, "version", "3.2.6");
var I, g, M, $, j = 0, G = [], L = [], O = m.__b, N = m.__r, V = m.diffed, W = m.__c, X = m.unmount;
function nt(s, t) {
  m.__h && m.__h(g, s, j || t), j = 0;
  var e = g.__H || (g.__H = { __: [], __h: [] });
  return s >= e.__.length && e.__.push({ __V: L }), e.__[s];
}
function lt(s, t) {
  var e = nt(I++, 3);
  !m.__s && ct(e.__H, t) && (e.__ = s, e.i = t, g.__H.__h.push(e));
}
function rt() {
  for (var s; s = G.shift(); )
    if (s.__P && s.__H)
      try {
        s.__H.__h.forEach(H), s.__H.__h.forEach(C), s.__H.__h = [];
      } catch (t) {
        s.__H.__h = [], m.__e(t, s.__v);
      }
}
m.__b = function(s) {
  g = null, O && O(s);
}, m.__r = function(s) {
  N && N(s), I = 0;
  var t = (g = s.__c).__H;
  t && (M === g ? (t.__h = [], g.__h = [], t.__.forEach(function(e) {
    e.__N && (e.__ = e.__N), e.__V = L, e.__N = e.i = void 0;
  })) : (t.__h.forEach(H), t.__h.forEach(C), t.__h = [])), M = g;
}, m.diffed = function(s) {
  V && V(s);
  var t = s.__c;
  t && t.__H && (t.__H.__h.length && (G.push(t) !== 1 && $ === m.requestAnimationFrame || (($ = m.requestAnimationFrame) || at)(rt)), t.__H.__.forEach(function(e) {
    e.i && (e.__H = e.i), e.__V !== L && (e.__ = e.__V), e.i = void 0, e.__V = L;
  })), M = g = null;
}, m.__c = function(s, t) {
  t.some(function(e) {
    try {
      e.__h.forEach(H), e.__h = e.__h.filter(function(i) {
        return !i.__ || C(i);
      });
    } catch (i) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], m.__e(i, e.__v);
    }
  }), W && W(s, t);
}, m.unmount = function(s) {
  X && X(s);
  var t, e = s.__c;
  e && e.__H && (e.__H.__.forEach(function(i) {
    try {
      H(i);
    } catch (o) {
      t = o;
    }
  }), e.__H = void 0, t && m.__e(t, e.__v));
};
var Y = typeof requestAnimationFrame == "function";
function at(s) {
  var t, e = function() {
    clearTimeout(i), Y && cancelAnimationFrame(t), setTimeout(s);
  }, i = setTimeout(e, 100);
  Y && (t = requestAnimationFrame(e));
}
function H(s) {
  var t = g, e = s.__c;
  typeof e == "function" && (s.__c = void 0, e()), g = t;
}
function C(s) {
  var t = g;
  s.__c = s.__(), g = t;
}
function ct(s, t) {
  return !s || s.length !== t.length || t.some(function(e, i) {
    return e !== s[i];
  });
}
var ht = 0;
function _t(s, t, e, i, o, n) {
  var l, r, a = {};
  for (r in t)
    r == "ref" ? l = t[r] : a[r] = t[r];
  var c = { type: s, props: a, key: e, ref: l, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --ht, __source: o, __self: n };
  if (typeof s == "function" && (l = s.defaultProps))
    for (r in l)
      a[r] === void 0 && (a[r] = l[r]);
  return m.vnode && m.vnode(c), c;
}
const ut = (s) => {
  const t = U();
  return lt(() => {
    const {
      onBeforeStart: e,
      onBeforeDrag: i,
      onStart: o,
      onMove: n,
      onStop: l,
      ...r
    } = s, a = t.current, c = new K({
      boundaries: a,
      ...r
    });
    return e && c.on("beforestart", e), i && c.on("beforedrag", i), o && c.on("start", o), n && c.on("move", n), l && c.on("stop", l), () => c.destroy();
  }, []), _t("div", {
    ref: t,
    className: s.className,
    id: s.id,
    children: s.children
  });
};
export {
  K as VanillaSelectionArea,
  ut as default
};
//# sourceMappingURL=viselect.mjs.map
