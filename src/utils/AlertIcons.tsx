import { AlertTriangle, CheckCircleIcon, XCircle, Info } from 'lucide-react'

export const alertIcons = {
    success:  <CheckCircleIcon className='text-success' size={34} />, 
    error: <XCircle className='text-destructive' size={34} />,
    warning:  <AlertTriangle className='text-warning'size={34} />,
    info: <Info className='text-info' size={34} />
}