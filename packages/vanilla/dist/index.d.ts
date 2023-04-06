import { EventTarget } from "./EventEmitter";
import type { ScrollEvent, SelectionEvents } from "./types";
import { PartialSelectionOptions } from "./types";
import { SelectAllSelectors } from "./utils";
export * from "./types";
export default class SelectionArea extends EventTarget<SelectionEvents> {
    static version: string;
    private readonly _options;
    private _selection;
    private readonly _area;
    private readonly _clippingElement;
    private _targetElement?;
    private _targetRect?;
    private _selectables;
    private _latestElement?;
    private readonly _areaRect;
    private _areaLocation;
    private _singleClick;
    private _frame;
    private _scrollAvailable;
    private _scrollingActive;
    private _scrollSpeed;
    private _scrollDelta;
    constructor(opt: PartialSelectionOptions);
    _bindStartEvents(activate?: boolean): void;
    _onTapStart(evt: MouseEvent | TouchEvent, silent?: boolean): void;
    _onSingleTap(evt: MouseEvent | TouchEvent): void;
    _delayedTapMove(evt: MouseEvent | TouchEvent): void;
    _setupSelectionArea(): void;
    _onTapMove(evt: MouseEvent | TouchEvent): void;
    _handleMoveEvent(evt: MouseEvent | TouchEvent): void;
    _onScroll(): void;
    _manualScroll(evt: ScrollEvent): void;
    _recalculateSelectionAreaRect(): void;
    _redrawSelectionArea(): void;
    _onTapStop(evt: MouseEvent | TouchEvent | null, silent: boolean): void;
    _updateElementSelection(): void;
    _emitEvent(name: keyof SelectionEvents, evt: MouseEvent | TouchEvent | null): unknown;
    _keepSelection(): void;
    /**
     * Manually triggers the start of a selection
     * @param evt A MouseEvent / TouchEvent -like object
     * @param silent If beforestart should be fired,
     */
    trigger(evt: MouseEvent | TouchEvent, silent?: boolean): void;
    /**
     * Can be used if during a selection elements have been added.
     * Will update everything which can be selected.
     */
    resolveSelectables(): void;
    /**
     * Same as deselect, but for all elements currently selected.
     * @param includeStored If the store should also get cleared
     * @param quiet If move / stop events should be fired
     */
    clearSelection(includeStored?: boolean, quiet?: boolean): void;
    /**
     * @returns {Array} Selected elements
     */
    getSelection(): Element[];
    /**
     * @returns {HTMLElement} The selection area element
     */
    getSelectionArea(): HTMLElement;
    /**
     * Cancel the current selection process.
     * @param keepEvent {boolean} true to fire a stop event after cancel.
     */
    cancel(keepEvent?: boolean): void;
    /**
     * Unbinds all events and removes the area-element.
     */
    destroy(): void;
    disable: () => void;
    enable: (activate?: boolean) => void;
    /**
     * Adds elements to the selection
     * @param query - CSS Query, can be an array of queries
     * @param quiet - If this should not trigger the move event
     */
    select(query: SelectAllSelectors, quiet?: boolean): Element[];
    /**
     * Removes a particular element from the selection.
     * @param query - CSS Query, can be an array of queries
     * @param quiet - If this should not trigger the move event
     */
    deselect(query: SelectAllSelectors, quiet?: boolean): void;
}