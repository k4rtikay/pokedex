import * as RadixTooltip from '@radix-ui/react-tooltip';
import './Tooltip.scss';

export default function Tooltip({ children, text }) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className="custom-tooltip" sideOffset={5}>
          {text}
          <RadixTooltip.Arrow className="tooltip-arrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}