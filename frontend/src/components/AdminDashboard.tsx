import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Package, ShoppingBag, MessageSquare } from 'lucide-react';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import FeedbackTab from './FeedbackTab';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img
            src="/assets/image.png"
            alt="Knots & Folds"
            className="w-10 h-10 rounded-full object-cover border-2 border-rose/30"
          />
          <div>
            <h1 className="font-serif text-2xl font-bold text-plum">Admin Dashboard</h1>
            <p className="font-sans text-xs text-muted-foreground">Knots & Folds — Store Management</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          className="border-rose/30 text-rose hover:bg-rose/10 font-sans font-bold rounded-full gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="bg-lavender/40 border border-lavender rounded-2xl p-1 mb-6 w-full sm:w-auto">
          <TabsTrigger
            value="products"
            className="font-sans font-bold text-sm rounded-xl data-[state=active]:bg-rose data-[state=active]:text-primary-foreground gap-2"
          >
            <Package className="w-4 h-4" />
            Products
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="font-sans font-bold text-sm rounded-xl data-[state=active]:bg-rose data-[state=active]:text-primary-foreground gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="font-sans font-bold text-sm rounded-xl data-[state=active]:bg-rose data-[state=active]:text-primary-foreground gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
