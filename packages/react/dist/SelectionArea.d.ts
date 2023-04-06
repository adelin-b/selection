import { SelectionEvents, SelectionOptions } from '@viselect/vanilla';
import React from 'react';
export interface SelectionAreaProps extends Omit<Partial<SelectionOptions>, 'boundaries'>, React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    className?: string;
    onBeforeStart?: SelectionEvents['beforestart'];
    onBeforeDrag?: SelectionEvents['beforedrag'];
    onStart?: SelectionEvents['start'];
    onMove?: SelectionEvents['move'];
    onStop?: SelectionEvents['stop'];
}
export declare const SelectionArea: React.FunctionComponent<SelectionAreaProps>;
