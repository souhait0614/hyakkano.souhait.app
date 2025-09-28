import type { ComponentPropsWithRef } from 'react';
import type { AllUnionFields } from 'type-fest';

export type NormalIconProps = ComponentPropsWithRef<'svg'>;

export interface FillableIconProps extends ComponentPropsWithRef<'svg'> {
  filled?: boolean;
}

export type IconProps = AllUnionFields<NormalIconProps | FillableIconProps>;
