import {Box, BoxProps, Button, Tooltip, ButtonProps} from '@chakra-ui/core'
import {PopperProps} from '@chakra-ui/core/dist/Popper'
import {IconDefinition} from '@fortawesome/free-solid-svg-icons'

import Icon from './icon'

type IconButtonProps = {
  icon: IconDefinition
  isActive?: boolean
  label: string
  onClick: (e: MouseEvent) => void
  placement?: PopperProps['placement']
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: ButtonProps['variant']
  variantColor?: ButtonProps['variantColor']
} & BoxProps

const zIndex = 1500 // Chakra Modals are set at 1400

export default function IconButton({
  icon,
  isActive = false,
  label,
  onClick,
  placement,
  size = 'sm',
  variant = 'ghost',
  variantColor = 'blue',
  ...p
}: IconButtonProps) {
  return (
    <Box {...p}>
      <Tooltip
        aria-label={label}
        hasArrow
        label={label}
        placement={placement || 'auto'}
        zIndex={zIndex}
      >
        <Button
          aria-label={label}
          isActive={isActive}
          onClick={onClick}
          size={size}
          variant={variant}
          variantColor={variantColor}
        >
          <Icon icon={icon} fixedWidth={false} />
        </Button>
      </Tooltip>
    </Box>
  )
}
