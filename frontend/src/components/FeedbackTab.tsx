import { useGetAllContactMessages } from '../hooks/useQueries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare } from 'lucide-react';

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

export default function FeedbackTab() {
  const { data: messages = [], isLoading, isError } = useGetAllContactMessages();

  const sortedMessages = [...messages].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-xl font-bold text-plum">Customer Feedback</h2>
        <p className="font-sans text-sm text-muted-foreground">{messages.length} message{messages.length !== 1 ? 's' : ''} received</p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-lavender/60 overflow-hidden shadow-cozy">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <p className="font-sans text-sm text-destructive">Failed to load feedback. Make sure you are logged in as admin.</p>
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-lavender mx-auto mb-3" />
            <p className="font-serif text-lg text-plum mb-1">No feedback yet</p>
            <p className="font-sans text-sm text-muted-foreground">Customer messages and feedback will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-lavender/40 bg-lavender/20">
                  <TableHead className="font-sans font-bold text-plum">From</TableHead>
                  <TableHead className="font-sans font-bold text-plum">Message</TableHead>
                  <TableHead className="font-sans font-bold text-plum whitespace-nowrap">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMessages.map((msg) => (
                  <TableRow key={String(msg.id)} className="border-lavender/30 hover:bg-lavender/10">
                    <TableCell className="min-w-[160px]">
                      <p className="font-sans font-bold text-sm text-plum">{msg.name}</p>
                      <a
                        href={`mailto:${msg.email}`}
                        className="font-sans text-xs text-rose hover:text-rose-dark transition-colors underline underline-offset-1"
                      >
                        {msg.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[400px]">
                      <p className="font-sans text-sm text-plum-light leading-relaxed whitespace-pre-wrap break-words">
                        {msg.message}
                      </p>
                    </TableCell>
                    <TableCell className="font-sans text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(msg.timestamp)}
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
