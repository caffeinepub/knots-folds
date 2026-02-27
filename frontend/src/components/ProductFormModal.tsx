import { useState, useEffect } from 'react';
import { useAddProduct, useUpdateProduct } from '../hooks/useQueries';
import { Product } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  editProduct?: Product | null;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
  imageUrl: string;
  category: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  stockQuantity?: string;
  imageUrl?: string;
  category?: string;
}

const emptyForm: FormData = {
  name: '',
  description: '',
  price: '',
  stockQuantity: '',
  imageUrl: '',
  category: '',
};

export default function ProductFormModal({ open, onClose, editProduct }: ProductFormModalProps) {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const isEditing = !!editProduct;
  const isPending = addProduct.isPending || updateProduct.isPending;

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description,
        price: String(editProduct.price),
        stockQuantity: String(editProduct.stockQuantity),
        imageUrl: editProduct.imageUrl,
        category: editProduct.category,
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [editProduct, open]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price < 0) newErrors.price = 'Enter a valid price.';
    const stock = parseInt(formData.stockQuantity);
    if (!formData.stockQuantity || isNaN(stock) || stock < 0) newErrors.stockQuantity = 'Enter a valid stock quantity.';
    if (!formData.category.trim()) newErrors.category = 'Category is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditing && editProduct) {
        await updateProduct.mutateAsync({
          id: editProduct.id,
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          stockQuantity: BigInt(parseInt(formData.stockQuantity)),
          imageUrl: formData.imageUrl.trim(),
          category: formData.category.trim(),
        });
      } else {
        await addProduct.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          stockQuantity: BigInt(parseInt(formData.stockQuantity)),
          imageUrl: formData.imageUrl.trim(),
          category: formData.category.trim(),
        });
      }
      onClose();
    } catch {
      // error handled by mutation state
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="max-w-lg bg-card border-lavender/60 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-plum">
            {isEditing ? '✏️ Edit Product' : '➕ Add New Product'}
          </DialogTitle>
          <DialogDescription className="font-sans text-muted-foreground">
            {isEditing ? 'Update the product details below.' : 'Fill in the details for the new product.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="font-sans text-sm font-bold text-plum">Product Name *</Label>
            <Input
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="e.g. Woolen Teddy Bear"
              className={`bg-blush border-lavender focus:border-rose font-sans ${errors.name ? 'border-destructive' : ''}`}
            />
            {errors.name && <p className="font-sans text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="font-sans text-sm font-bold text-plum">Category *</Label>
            <Input
              value={formData.category}
              onChange={handleChange('category')}
              placeholder="e.g. Woolen Toys"
              className={`bg-blush border-lavender focus:border-rose font-sans ${errors.category ? 'border-destructive' : ''}`}
            />
            {errors.category && <p className="font-sans text-xs text-destructive">{errors.category}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="font-sans text-sm font-bold text-plum">Description *</Label>
            <Textarea
              value={formData.description}
              onChange={handleChange('description')}
              placeholder="Describe the product..."
              rows={3}
              className={`bg-blush border-lavender focus:border-rose font-sans resize-none ${errors.description ? 'border-destructive' : ''}`}
            />
            {errors.description && <p className="font-sans text-xs text-destructive">{errors.description}</p>}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-sans text-sm font-bold text-plum">Price (₹) *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange('price')}
                placeholder="e.g. 499"
                className={`bg-blush border-lavender focus:border-rose font-sans ${errors.price ? 'border-destructive' : ''}`}
              />
              {errors.price && <p className="font-sans text-xs text-destructive">{errors.price}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="font-sans text-sm font-bold text-plum">Stock Qty *</Label>
              <Input
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={handleChange('stockQuantity')}
                placeholder="e.g. 10"
                className={`bg-blush border-lavender focus:border-rose font-sans ${errors.stockQuantity ? 'border-destructive' : ''}`}
              />
              {errors.stockQuantity && <p className="font-sans text-xs text-destructive">{errors.stockQuantity}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label className="font-sans text-sm font-bold text-plum">Image URL</Label>
            <Input
              value={formData.imageUrl}
              onChange={handleChange('imageUrl')}
              placeholder="https://... or /assets/..."
              className="bg-blush border-lavender focus:border-rose font-sans"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded-xl border border-lavender"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
          </div>

          {(addProduct.isError || updateProduct.isError) && (
            <p className="font-sans text-xs text-destructive">
              Failed to save product. Make sure you are logged in as admin.
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-lavender text-plum font-sans font-bold rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full shadow-warm"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                isEditing ? 'Save Changes' : 'Add Product'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
