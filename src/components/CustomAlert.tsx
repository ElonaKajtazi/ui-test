import { X } from 'lucide-react';
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

interface ICustumAlert {
    title?: string,
    description?: string
    type: 'success' | 'error' | 'warning' | 'info' 
    icon?: React.ReactNode
    variant?: 'subtle' | 'outline'
    children?: React.ReactNode 
    onClose?: () => void
}

const variantMap = {
    success: 'success',
    error: 'destructive',
    warning: 'warning',
    info: 'info',
  } as const
  
const variantStyles = {
  subtle: {
    success: 'bg-success-foreground border-success text-success',
    error: 'bg-destructive-foreground  border-destructive text-destructive',
    warning: 'bg-warning-foreground border-warning text-warning',
    info: 'bg-info-foreground border-info text-info',
  },
  outline: {
    success: 'border border-success text-success bg-transparent',
    error: 'border border-destructive text-destructive bg-transparent',
    warning: 'border border-warning text-warning bg-transparent',
    info: 'border border-info text-info bg-transparent',
  },
} as const


export default function CustomAlert({ 
  title, 
  description, 
  type, 
  icon, 
  variant = 'outline',
  children,
  onClose
}: ICustumAlert) {
  return (
    <Alert variant={variantMap[type]} className={`flex ${variantStyles[variant][type]} items-center gap-3`}>
      {icon && <span className='mr-3'>{icon}</span>}
      <div className='flex-1'>
        {children && children}
        {!children &&
          <>
            {title && <AlertTitle>{title}</AlertTitle>}
            <AlertDescription>{description}</AlertDescription>
          </>
        }
      </div>

      {onClose && (
        <Button
          title='Close'
          className='hover:bg-inherit hover:text-slate-700 ml-auto'
          variant='ghost'
          size='icon'
          onClick={onClose}>
          <X className='w-4 h-4'/>
        </Button>
      )}
    </Alert>
  )
}