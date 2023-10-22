import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type Props = {
    title?: string;
    description?: string;
    className?: string;
}

export const AlertDestructive: React.FC<Props> = ({title, description, className}) => {
  return (
    <Alert variant="destructive" className={className}>
      <ExclamationTriangleIcon className="h-4 w-4 -mt-1" />
      { title && <AlertTitle>{title}</AlertTitle> }
      { description && <AlertDescription>
        {description}
      </AlertDescription> 
      }

    </Alert>
  )
}
