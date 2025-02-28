import { FormControl } from '@angular/forms';
import { OptionalKeys } from './OptionalKeys.type';
import { RequiredKeys } from './RequiredKeys.type';

// Construct the mapped type for the form controls

export type ControlsOf<T extends Record<string, any>> = {
  [K in RequiredKeys<T>]: FormControl<T[K]>;
} & {
  [K in OptionalKeys<T>]?: FormControl<T[K] | null>;
};
