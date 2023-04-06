import { SelectionEvents, SelectionOptions } from '@viselect/vanilla';
import { FunctionalComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface SelectionAreaProps extends Omit<Partial<SelectionOptions>, 'boundaries'>, HTMLAttributes<HTMLDivElement> {
    id?: string;
    className?: string;
    onBeforeStart?: SelectionEvents['beforestart'];
    onBeforeDrag?: SelectionEvents['beforedrag'];
    onStart?: SelectionEvents['start'];
    onMove?: SelectionEvents['move'];
    onStop?: SelectionEvents['stop'];
}
export declare const SelectionArea: FunctionalComponent<SelectionAreaProps>;
