import type { SVGAttributes } from 'svelte/elements';

export type NormalIconProps = SVGAttributes<SVGSVGElement>;

export interface FillableIconProps extends NormalIconProps {
  filled?: boolean;
}
