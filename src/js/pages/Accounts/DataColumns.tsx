import Account from "@js/types/Account";

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: 'Balance',
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('type')}</div>
    }    
  },
  {
    accessorKey: "balance",
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"))
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount)
  
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "transactions",
    header: () => <div className="text-center">Transactions</div>,
    cell: ({ row }) => {
      return <a href="/" className="block text-center">View</a>
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const account = row.original
  
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(account.id)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View account</DropdownMenuItem>
              <DropdownMenuItem>View transactions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export default columns