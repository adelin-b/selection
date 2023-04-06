/*! @viselect/vanilla v3.2.6 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
var j = Object.defineProperty;
var H = (c, n, e) => n in c ? j(c, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[n] = e;
var u = (c, n, e) => (H(c, typeof n != "symbol" ? n + "" : n, e), e);
class q {
  constructor() {
    u(this, "_listeners", /* @__PURE__ */ new Map());
    // Let's also support on, off and emit like node
    /* eslint-disable no-invalid-this */
    u(this, "on", this.addEventListener);
    u(this, "off", this.removeEventListener);
    u(this, "emit", this.dispatchEvent);
  }
  addEventListener(n, e) {
    const t = this._listeners.get(n) || /* @__PURE__ */ new Set();
    return this._listeners.set(n, t), t.add(e), this;
  }
  removeEventListener(n, e) {
    var t;
    return (t = this._listeners.get(n)) == null || t.delete(e), this;
  }
  dispatchEvent(n, ...e) {
    let t = !0;
    for (const s of this._listeners.get(n) || [])
      t = s(...e) !== !1 && t;
    return t;
  }
  unbindAllListeners() {
    this._listeners.clear();
  }
}
const C = (c, n = "px") => typeof c == "number" ? c + n : c;
function y({ style: c }, n, e) {
  if (typeof n == "object")
    for (const [t, s] of Object.entries(n))
      s !== void 0 && (c[t] = C(s));
  else
    e !== void 0 && (c[n] = C(e));
}
function B(c) {
  return (n, e, t, s = {}) => {
    n instanceof HTMLCollection || n instanceof NodeList ? n = Array.from(n) : Array.isArray(n) || (n = [n]), Array.isArray(e) || (e = [e]);
    for (const o of n)
      for (const i of e)
        o[c](i, t, { capture: !1, ...s });
    return [n, e, t, s];
  };
}
const x = B("addEventListener"), E = B("removeEventListener"), A = (c) => {
  const { clientX: n, clientY: e, target: t } = c.touches && c.touches[0] || c;
  return { x: n, y: e, target: t };
};
function M(c, n, e = "touch") {
  switch (e) {
    case "center": {
      const t = n.left + n.width / 2, s = n.top + n.height / 2;
      return t >= c.left && t <= c.right && s >= c.top && s <= c.bottom;
    }
    case "cover":
      return n.left >= c.left && n.top >= c.top && n.right <= c.right && n.bottom <= c.bottom;
    case "touch":
      return c.right >= n.left && c.left <= n.right && c.bottom >= n.top && c.top <= n.bottom;
  }
}
function S(c, n = document) {
  const e = Array.isArray(c) ? c : [c];
  let t = [];
  for (let s = 0, o = e.length; s < o; s++) {
    const i = e[s];
    typeof i == "string" ? t = t.concat(Array.from(n.querySelectorAll(i))) : i instanceof Element && t.push(i);
  }
  return t;
}
const F = () => matchMedia("(hover: none), (pointer: coarse)").matches, W = () => "safari" in window, X = (c) => {
  let n, e = -1, t = !1;
  return {
    next(...s) {
      n = s, t || (t = !0, e = requestAnimationFrame(() => {
        c(...n), t = !1;
      }));
    },
    cancel() {
      cancelAnimationFrame(e), t = !1;
    }
  };
}, { abs: b, max: R, min: k, ceil: D } = Math;
class Y extends q {
  constructor(e) {
    var i, l, r, h, _;
    super();
    // Options
    u(this, "_options");
    // Selection store
    u(this, "_selection", {
      stored: [],
      selected: [],
      touched: [],
      changed: {
        added: [],
        // Added elements since last selection
        removed: []
        // Removed elements since last selection
      }
    });
    // Area element and clipping element
    u(this, "_area");
    u(this, "_clippingElement");
    // Target container (element) and boundary (cached)
    u(this, "_targetElement");
    u(this, "_targetRect");
    u(this, "_selectables", []);
    u(this, "_latestElement");
    // Caches the position of the selection-area
    u(this, "_areaRect", new DOMRect());
    // Dynamically constructed area rect
    u(this, "_areaLocation", { y1: 0, x2: 0, y2: 0, x1: 0 });
    // If a single click is being performed.
    // It's a single-click until the user dragged the mouse.
    u(this, "_singleClick", !0);
    u(this, "_frame");
    // Is getting set on movement.
    u(this, "_scrollAvailable", !0);
    u(this, "_scrollingActive", !1);
    u(this, "_scrollSpeed", { x: 0, y: 0 });
    u(this, "_scrollDelta", { x: 0, y: 0 });
    /* eslint-disable no-invalid-this */
    u(this, "disable", this._bindStartEvents.bind(this, !1));
    u(this, "enable", this._bindStartEvents);
    this._options = {
      selectionAreaClass: "selection-area",
      selectionContainerClass: void 0,
      selectables: [],
      document: window.document,
      startAreas: ["html"],
      boundaries: ["html"],
      container: "body",
      ...e,
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        ...e.behaviour,
        startThreshold: (i = e.behaviour) != null && i.startThreshold ? typeof e.behaviour.startThreshold == "number" ? e.behaviour.startThreshold : { x: 10, y: 10, ...e.behaviour.startThreshold } : { x: 10, y: 10 },
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          ...(l = e.behaviour) == null ? void 0 : l.scrolling,
          startScrollMargins: {
            x: 0,
            y: 0,
            ...(h = (r = e.behaviour) == null ? void 0 : r.scrolling) == null ? void 0 : h.startScrollMargins
          }
        }
      },
      features: {
        range: !0,
        touch: !0,
        ...e.features,
        singleTap: {
          allow: !0,
          intersect: "native",
          ...(_ = e.features) == null ? void 0 : _.singleTap
        }
      }
    };
    for (const f of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      typeof this[f] == "function" && (this[f] = this[f].bind(this));
    const { document: t, selectionAreaClass: s, selectionContainerClass: o } = this._options;
    this._area = t.createElement("div"), this._clippingElement = t.createElement("div"), this._clippingElement.appendChild(this._area), this._area.classList.add(s), o && this._clippingElement.classList.add(o), y(this._area, {
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
    }), this._frame = X((f) => {
      this._recalculateSelectionAreaRect(), this._updateElementSelection(), this._emitEvent("move", f), this._redrawSelectionArea();
    }), this.enable();
  }
  _bindStartEvents(e = !0) {
    const { document: t, features: s } = this._options, o = e ? x : E;
    o(t, "mousedown", this._onTapStart), s.touch && o(t, "touchstart", this._onTapStart, {
      passive: !1
    });
  }
  _onTapStart(e, t = !1) {
    const { x: s, y: o, target: i } = A(e), { _options: l } = this, { document: r } = this._options, h = i.getBoundingClientRect(), _ = S(l.startAreas, l.document), f = S(
      l.boundaries,
      l.document
    );
    this._targetElement = f.find(
      (g) => M(g.getBoundingClientRect(), h)
    );
    const m = e.composedPath();
    if (!this._targetElement || !_.find((g) => m.includes(g)) || !f.find((g) => m.includes(g)) || !t && this._emitEvent("beforestart", e) === !1)
      return;
    this._areaLocation = { x1: s, y1: o, x2: 0, y2: 0 };
    const a = r.scrollingElement || r.body;
    this._scrollDelta = {
      x: a.scrollLeft,
      y: a.scrollTop
    }, this._singleClick = !0, this.clearSelection(!1, !0), x(r, ["touchmove", "mousemove"], this._delayedTapMove, {
      passive: !1
    }), x(r, ["mouseup", "touchcancel", "touchend"], this._onTapStop), x(r, "scroll", this._onScroll);
  }
  _onSingleTap(e) {
    const {
      singleTap: { intersect: t },
      range: s
    } = this._options.features, o = A(e);
    let i;
    if (t === "native")
      i = o.target;
    else if (t === "touch") {
      this.resolveSelectables();
      const { x: r, y: h } = o;
      i = this._selectables.find((_) => {
        const { right: f, left: m, top: a, bottom: g } = _.getBoundingClientRect();
        return r < f && r > m && h < g && h > a;
      });
    }
    if (!i)
      return;
    for (this.resolveSelectables(); !this._selectables.includes(i); ) {
      if (!i.parentElement)
        return;
      i = i.parentElement;
    }
    const { stored: l } = this._selection;
    if (this._emitEvent("start", e), e.shiftKey && l.length && s) {
      const r = this._latestElement ?? l[0], [h, _] = r.compareDocumentPosition(i) & 4 ? [i, r] : [r, i], f = [
        ...this._selectables.filter(
          (m) => m.compareDocumentPosition(h) & 4 && m.compareDocumentPosition(_) & 2
        ),
        h,
        _
      ];
      this.select(f), this._latestElement = i;
    } else
      l.includes(i) && (l.length === 1 || e.ctrlKey || l.every((r) => this._selection.stored.includes(r))) ? (this.deselect(i), this._latestElement = i) : (this.select(i), this._latestElement = i);
    this._emitEvent("stop", e);
  }
  _delayedTapMove(e) {
    const {
      container: t,
      document: s,
      behaviour: { startThreshold: o }
    } = this._options, { x1: i, y1: l } = this._areaLocation, { x: r, y: h } = A(e);
    if (
      // Single number for both coordinates
      typeof o == "number" && b(r + h - (i + l)) >= o || // Different x and y threshold
      typeof o == "object" && b(r - i) >= o.x || b(h - l) >= o.y
    ) {
      if (E(s, ["mousemove", "touchmove"], this._delayedTapMove, {
        passive: !1
      }), this._emitEvent("beforedrag", e) === !1) {
        E(s, ["mouseup", "touchcancel", "touchend"], this._onTapStop);
        return;
      }
      x(s, ["mousemove", "touchmove"], this._onTapMove, {
        passive: !1
      }), y(this._area, "display", "block"), S(t, s)[0].appendChild(this._clippingElement), this.resolveSelectables(), this._singleClick = !1, this._targetRect = this._targetElement.getBoundingClientRect(), this._scrollAvailable = this._targetElement.scrollHeight !== this._targetElement.clientHeight || this._targetElement.scrollWidth !== this._targetElement.clientWidth, this._scrollAvailable && (x(s, "wheel", this._manualScroll, { passive: !1 }), this._selectables = this._selectables.filter(
        (_) => this._targetElement.contains(_)
      )), this._setupSelectionArea(), this._emitEvent("start", e), this._onTapMove(e);
    }
    this._handleMoveEvent(e);
  }
  _setupSelectionArea() {
    const { _clippingElement: e, _targetElement: t, _area: s } = this, o = this._targetRect = t.getBoundingClientRect();
    this._scrollAvailable ? (y(e, {
      top: o.top,
      left: o.left,
      width: o.width,
      height: o.height
    }), y(s, {
      marginTop: -o.top,
      marginLeft: -o.left
    })) : (y(e, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }), y(s, {
      marginTop: 0,
      marginLeft: 0
    }));
  }
  _onTapMove(e) {
    const { x: t, y: s } = A(e), { _scrollSpeed: o, _areaLocation: i, _options: l, _frame: r } = this, { speedDivider: h } = l.behaviour.scrolling, _ = this._targetElement;
    if (i.x2 = t, i.y2 = s, this._scrollAvailable && !this._scrollingActive && (o.y || o.x)) {
      this._scrollingActive = !0;
      const f = () => {
        if (!o.x && !o.y) {
          this._scrollingActive = !1;
          return;
        }
        const { scrollTop: m, scrollLeft: a } = _;
        o.y && (_.scrollTop += D(o.y / h), i.y1 -= _.scrollTop - m), o.x && (_.scrollLeft += D(o.x / h), i.x1 -= _.scrollLeft - a), r.next(e), requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    } else
      r.next(e);
    this._handleMoveEvent(e);
  }
  _handleMoveEvent(e) {
    const { features: t } = this._options;
    (t.touch && F() || this._scrollAvailable && W()) && e.preventDefault();
  }
  _onScroll() {
    const {
      _scrollDelta: e,
      _options: { document: t }
    } = this, { scrollTop: s, scrollLeft: o } = t.scrollingElement || t.body;
    this._areaLocation.x1 += e.x - o, this._areaLocation.y1 += e.y - s, e.x = o, e.y = s, this._setupSelectionArea(), this._frame.next(null);
  }
  _manualScroll(e) {
    const { manualSpeed: t } = this._options.behaviour.scrolling, s = e.deltaY ? e.deltaY > 0 ? 1 : -1 : 0, o = e.deltaX ? e.deltaX > 0 ? 1 : -1 : 0;
    this._scrollSpeed.y += s * t, this._scrollSpeed.x += o * t, this._onTapMove(e), e.preventDefault();
  }
  _recalculateSelectionAreaRect() {
    const { _scrollSpeed: e, _areaLocation: t, _areaRect: s, _targetElement: o, _options: i } = this, {
      scrollTop: l,
      scrollHeight: r,
      clientHeight: h,
      scrollLeft: _,
      scrollWidth: f,
      clientWidth: m
    } = o, a = this._targetRect, { x1: g, y1: T } = t;
    let { x2: p, y2: d } = t;
    const {
      behaviour: {
        scrolling: { startScrollMargins: v }
      }
    } = i;
    p < a.left + v.x ? (e.x = _ ? -b(a.left - p + v.x) : 0, p = p < a.left ? a.left : p) : p > a.right - v.x ? (e.x = f - _ - m ? b(
      a.left + a.width - p - v.x
    ) : 0, p = p > a.right ? a.right : p) : e.x = 0, d < a.top + v.y ? (e.y = l ? -b(a.top - d + v.y) : 0, d = d < a.top ? a.top : d) : d > a.bottom - v.y ? (e.y = r - l - h ? b(
      a.top + a.height - d - v.y
    ) : 0, d = d > a.bottom ? a.bottom : d) : e.y = 0;
    const w = k(g, p), L = k(T, d), P = R(g, p), O = R(T, d);
    s.x = w, s.y = L, s.width = P - w, s.height = O - L;
  }
  _redrawSelectionArea() {
    const { x: e, y: t, width: s, height: o } = this._areaRect, { style: i } = this._area;
    i.left = `${e}px`, i.top = `${t}px`, i.width = `${s}px`, i.height = `${o}px`;
  }
  _onTapStop(e, t) {
    var l;
    const { document: s, features: o } = this._options, { _singleClick: i } = this;
    E(s, ["mousemove", "touchmove"], this._delayedTapMove), E(s, ["touchmove", "mousemove"], this._onTapMove), E(s, ["mouseup", "touchcancel", "touchend"], this._onTapStop), E(s, "scroll", this._onScroll), this._keepSelection(), e && i && o.singleTap.allow ? this._onSingleTap(e) : !i && !t && (this._updateElementSelection(), this._emitEvent("stop", e)), this._scrollSpeed.x = 0, this._scrollSpeed.y = 0, this._scrollAvailable && E(s, "wheel", this._manualScroll, { passive: !0 }), this._clippingElement.remove(), (l = this._frame) == null || l.cancel(), y(this._area, "display", "none");
  }
  _updateElementSelection() {
    const { _selectables: e, _options: t, _selection: s, _areaRect: o } = this, { stored: i, selected: l, touched: r } = s, { intersect: h, overlap: _ } = t.behaviour, f = _ === "invert", m = [], a = [], g = [];
    for (let p = 0; p < e.length; p++) {
      const d = e[p];
      if (M(o, d.getBoundingClientRect(), h)) {
        if (l.includes(d))
          i.includes(d) && !r.includes(d) && r.push(d);
        else if (f && i.includes(d)) {
          g.push(d);
          continue;
        } else
          a.push(d);
        m.push(d);
      }
    }
    f && a.push(...i.filter((p) => !l.includes(p)));
    const T = _ === "keep";
    for (let p = 0; p < l.length; p++) {
      const d = l[p];
      !m.includes(d) && !// Check if user wants to keep previously selected elements, e.g.
      // not make them part of the current selection as soon as they're touched.
      (T && i.includes(d)) && g.push(d);
    }
    s.selected = m, s.changed = { added: a, removed: g }, this._latestElement = m[m.length - 1];
  }
  _emitEvent(e, t) {
    return this.emit(e, {
      event: t,
      store: this._selection,
      selection: this
    });
  }
  _keepSelection() {
    const { _options: e, _selection: t } = this, { selected: s, changed: o, touched: i, stored: l } = t, r = s.filter((h) => !l.includes(h));
    switch (e.behaviour.overlap) {
      case "drop": {
        t.stored = [
          ...r,
          ...l.filter((h) => !i.includes(h))
          // Elements not touched
        ];
        break;
      }
      case "invert": {
        t.stored = [
          ...r,
          ...l.filter((h) => !o.removed.includes(h))
          // Elements not removed from selection
        ];
        break;
      }
      case "keep": {
        t.stored = [
          ...l,
          ...s.filter((h) => !l.includes(h))
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
  trigger(e, t = !0) {
    this._onTapStart(e, t);
  }
  /**
   * Can be used if during a selection elements have been added.
   * Will update everything which can be selected.
   */
  resolveSelectables() {
    this._selectables = S(
      this._options.selectables,
      this._options.document
    );
  }
  /**
   * Same as deselect, but for all elements currently selected.
   * @param includeStored If the store should also get cleared
   * @param quiet If move / stop events should be fired
   */
  clearSelection(e = !0, t = !1) {
    const { selected: s, stored: o, changed: i } = this._selection;
    i.added = [], i.removed.push(...s, ...e ? o : []), t || (this._emitEvent("move", null), this._emitEvent("stop", null)), this._selection = {
      stored: e ? [] : o,
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
  cancel(e = !1) {
    this._onTapStop(null, !e);
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
  select(e, t = !1) {
    const { changed: s, selected: o, stored: i } = this._selection, l = S(e, this._options.document).filter(
      (r) => !o.includes(r) && !i.includes(r)
    );
    return i.push(...l), o.push(...l), s.added.push(...l), s.removed = [], this._latestElement = void 0, t || (this._emitEvent("move", null), this._emitEvent("stop", null)), l;
  }
  /**
   * Removes a particular element from the selection.
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  deselect(e, t = !1) {
    const { selected: s, stored: o, changed: i } = this._selection, l = S(e, this._options.document).filter(
      (r) => s.includes(r) || o.includes(r)
    );
    l.length && (this._selection.stored = o.filter((r) => !l.includes(r)), this._selection.selected = s.filter((r) => !l.includes(r)), this._selection.changed.added = [], this._selection.changed.removed.push(
      ...l.filter((r) => !i.removed.includes(r))
    ), this._latestElement = void 0, t || (this._emitEvent("move", null), this._emitEvent("stop", null)));
  }
}
u(Y, "version", "3.2.6");
export {
  Y as default
};
//# sourceMappingURL=viselect.mjs.map
