import { useState } from 'react';
import { useGetAllProducts, useDeleteProduct } from '../hooks/useQueries';
import { Product } from '../backend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import ProductFormModal from './ProductFormModal';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsTab() {
  const { data: products = [], isLoading, isError } = useGetAllProducts();
  const deleteProduct = useDeleteProduct();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteProduct.mutateAsync(deletingId);
    } catch {
      // handled by mutation
    }
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-plum">Products</h2>
          <p className="font-sans text-sm text-muted-foreground">{products.length} product{products.length !== 1 ? 's' : ''} in store</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full shadow-warm gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-lavender/60 overflow-hidden shadow-cozy">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <p className="font-sans text-sm text-destructive">Failed to load products. Make sure you are logged in as admin.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-lavender mx-auto mb-3" />
            <p className="font-serif text-lg text-plum mb-1">No products yet</p>
            <p className="font-sans text-sm text-muted-foreground mb-4">Add your first product to get started.</p>
            <Button onClick={handleAddNew} className="bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-lavender/40 bg-lavender/20">
                <TableHead className="font-sans font-bold text-plum">Product</TableHead>
                <TableHead className="font-sans font-bold text-plum">Category</TableHead>
                <TableHead className="font-sans font-bold text-plum">Price</TableHead>
                <TableHead className="font-sans font-bold text-plum">Stock</TableHead>
                <TableHead className="font-sans font-bold text-plum text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={String(product.id)} className="border-lavender/30 hover:bg-lavender/10">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover border border-lavender"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-lavender/40 flex items-center justify-center">
                          <Package className="w-5 h-5 text-plum-light" />
                        </div>
                      )}
                      <div>
                        <p className="font-sans font-bold text-sm text-plum">{product.name}</p>
                        <p className="font-sans text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{product.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-sans text-xs bg-lavender/40 text-plum border-lavender">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-sans font-bold text-plum">₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`font-sans text-sm font-bold ${Number(product.stockQuantity) === 0 ? 'text-destructive' : Number(product.stockQuantity) < 5 ? 'text-amber-600' : 'text-green-700'}`}>
                      {String(product.stockQuantity)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        className="w-8 h-8 text-violet hover:bg-violet/10 hover:text-violet-dark"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingId(product.id)}
                        className="w-8 h-8 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingProduct(null); }}
        editProduct={editingProduct}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deletingId !== null} onOpenChange={(open) => { if (!open) setDeletingId(null); }}>
        <AlertDialogContent className="bg-card border-lavender/60 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-plum">Delete Product?</AlertDialogTitle>
            <AlertDialogDescription className="font-sans text-muted-foreground">
              This action cannot be undone. The product will be permanently removed from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-lavender text-plum font-sans font-bold rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-sans font-bold rounded-full"
            >
              {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
