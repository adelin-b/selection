import type { PropType as __PropType } from 'vue';
import SelectionArea, { SelectionOptions } from '@viselect/vanilla';
declare const _sfc_main: import("vue").DefineComponent<{
    options: {
        type: __PropType<Omit<SelectionOptions, "boundaries">>;
        required: true;
    };
    onBeforeStart: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => boolean | void) | undefined>;
        required: false;
    };
    onBeforeDrag: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => boolean | void) | undefined>;
        required: false;
    };
    onStart: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => void) | undefined>;
        required: false;
    };
    onMove: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => void) | undefined>;
        required: false;
    };
    onStop: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => void) | undefined>;
        required: false;
    };
}, {
    selection: import("vue").ShallowRef<SelectionArea | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: __PropType<Omit<SelectionOptions, "boundaries">>;
        required: true;
    };
    onBeforeStart: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => boolean | void) | undefined>;
        required: false;
    };
    onBeforeDrag: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => boolean | void) | undefined>;
        required: false;
    };
    onStart: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => void) | undefined>;
        required: false;
    };
    onMove: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => void) | undefined>;
        required: false;
    };
    onStop: {
        type: __PropType<((e: import("@viselect/vanilla").SelectionEvent) => void) | undefined>;
        required: false;
    };
}>>, {}>;
export default _sfc_main;
