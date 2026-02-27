import { useGetAllOrders, useUpdateOrderStatus } from '../hooks/useQueries';
import { OrderStatus } from '../backend';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag } from 'lucide-react';

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: 'Pending',
  [OrderStatus.processing]: 'Processing',
  [OrderStatus.shipped]: 'Shipped',
  [OrderStatus.delivered]: 'Delivered',
  [OrderStatus.cancelled]: 'Cancelled',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: 'bg-amber-100 text-amber-800 border-amber-200',
  [OrderStatus.processing]: 'bg-blue-100 text-blue-800 border-blue-200',
  [OrderStatus.shipped]: 'bg-violet/15 text-violet-dark border-violet/20',
  [OrderStatus.delivered]: 'bg-green-100 text-green-800 border-green-200',
  [OrderStatus.cancelled]: 'bg-red-100 text-red-800 border-red-200',
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function OrdersTab() {
  const { data: orders = [], isLoading, isError } = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
    } catch {
      // handled by mutation
    }
  };

  const sortedOrders = [...orders].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-xl font-bold text-plum">Orders</h2>
        <p className="font-sans text-sm text-muted-foreground">{orders.length} order{orders.length !== 1 ? 's' : ''} received</p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-lavender/60 overflow-hidden shadow-cozy">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <p className="font-sans text-sm text-destructive">Failed to load orders. Make sure you are logged in as admin.</p>
          </div>
        ) : sortedOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-lavender mx-auto mb-3" />
            <p className="font-serif text-lg text-plum mb-1">No orders yet</p>
            <p className="font-sans text-sm text-muted-foreground">Orders placed by customers will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-lavender/40 bg-lavender/20">
                  <TableHead className="font-sans font-bold text-plum">Order #</TableHead>
                  <TableHead className="font-sans font-bold text-plum">Customer</TableHead>
                  <TableHead className="font-sans font-bold text-plum">Product ID</TableHead>
                  <TableHead className="font-sans font-bold text-plum">Qty</TableHead>
                  <TableHead className="font-sans font-bold text-plum">Date</TableHead>
                  <TableHead className="font-sans font-bold text-plum">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={String(order.id)} className="border-lavender/30 hover:bg-lavender/10">
                    <TableCell className="font-sans font-bold text-plum">#{String(order.id)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-sans font-bold text-sm text-plum">{order.customerName}</p>
                        <p className="font-sans text-xs text-muted-foreground">{order.phone}</p>
                        <p className="font-sans text-xs text-muted-foreground line-clamp-1 max-w-[160px]">{order.address}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-sans text-sm text-plum-light">#{String(order.productId)}</TableCell>
                    <TableCell className="font-sans font-bold text-plum">{String(order.quantity)}</TableCell>
                    <TableCell className="font-sans text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(order.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(val) => handleStatusChange(order.id, val as OrderStatus)}
                      >
                        <SelectTrigger className={`w-36 h-8 text-xs font-sans font-bold border rounded-full px-3 ${STATUS_COLORS[order.status]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatus).map((s) => (
                            <SelectItem key={s} value={s} className="font-sans text-sm">
                              {STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
