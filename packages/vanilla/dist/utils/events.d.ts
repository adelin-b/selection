type AnyFunction = (...arg: any) => any;
export type EventBindingArgs = [
    EventTarget | EventTarget[],
    string | string[],
    AnyFunction,
    Record<string, unknown>?
];
interface EventBinding {
    (elements: EventTarget | EventTarget[], events: string | string[], fn: AnyFunction, options?: Record<string, unknown>): EventBindingArgs;
}
/**
 * Add event(s) to element(s).
 * @param elements DOM-Elements
 * @param events Event names
 * @param fn Callback
 * @param options Optional options
 * @return Array passed arguments
 */
export declare const on: EventBinding;
/**
 * Remove event(s) from element(s).
 * @param elements DOM-Elements
 * @param events Event names
 * @param fn Callback
 * @param options Optional options
 * @return Array passed arguments
 */
export declare const off: EventBinding;
/**
 * Simplifies a touch / mouse-event
 * @param evt
 */
export declare const simplifyEvent: (evt: any) => {
    target: HTMLElement;
    x: number;
    y: number;
};
export {};
