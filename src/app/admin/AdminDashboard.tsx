'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Laptop, 
  Save,
  X,
  Upload
} from 'lucide-react';
import type { Laptop as LaptopType } from '@/lib/db';

interface AdminDashboardProps {
  initialLaptops: LaptopType[];
}

export function AdminDashboard({ initialLaptops }: AdminDashboardProps) {
  const router = useRouter();
  const [laptops, setLaptops] = useState(initialLaptops);
  const [showForm, setShowForm] = useState(false);
  const [editingLaptop, setEditingLaptop] = useState<LaptopType | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (editingLaptop) {
        formData.append('id', editingLaptop.id.toString());
        await fetch('/api/laptops', {
          method: 'PUT',
          body: formData,
        });
      } else {
        await fetch('/api/laptops', {
          method: 'POST',
          body: formData,
        });
      }
      
      // Refresh data
      const res = await fetch('/api/laptops');
      const data = await res.json();
      setLaptops(data);
      setShowForm(false);
      setEditingLaptop(null);
      setImagePreview(null);
    } catch (error) {
      alert('Failed to save laptop');
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this laptop?')) return;
    
    try {
      await fetch('/api/laptops', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      setLaptops(laptops.filter(l => l.id !== id));
    } catch (error) {
      alert('Failed to delete laptop');
    }
  };

  const handleEdit = (laptop: LaptopType) => {
    setEditingLaptop(laptop);
    setImagePreview(laptop.image || null);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/DITRONICS-COMPANY-LOGO.png"
              alt="Ditronics"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-[var(--anchor-dark)]">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your laptops</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/laptops')}>
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center">
                <Laptop size={24} className="text-[var(--vermilion)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--anchor-dark)]">{laptops.length}</p>
                <p className="text-sm text-gray-500">Total Laptops</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--teal-green)]/10 flex items-center justify-center">
                <Laptop size={24} className="text-[var(--teal-green)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--anchor-dark)]">
                  {laptops.filter(l => l.stock_status === 'In Stock').length}
                </p>
                <p className="text-sm text-gray-500">In Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--sunny)]/10 flex items-center justify-center">
                <Laptop size={24} className="text-[var(--sunny)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--anchor-dark)]">
                  {laptops.filter(l => l.featured).length}
                </p>
                <p className="text-sm text-gray-500">Featured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--anchor-dark)]">Laptops</h2>
          <Button variant="primary" onClick={() => { setShowForm(true); setEditingLaptop(null); setImagePreview(null); }}>
            <Plus size={18} className="mr-2" />
            Add Laptop
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {editingLaptop ? 'Edit Laptop' : 'Add New Laptop'}
                </h3>
                <button onClick={() => { setShowForm(false); setEditingLaptop(null); }}>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Laptop Name *</label>
                    <Input 
                      name="name" 
                      required 
                      defaultValue={editingLaptop?.name}
                      placeholder="e.g. Dell XPS 15"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (TZS) *</label>
                    <Input 
                      name="price" 
                      type="number" 
                      required 
                      defaultValue={editingLaptop?.price}
                      placeholder="e.g. 2500000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Currency</label>
                    <select 
                      name="currency" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.currency || 'TZS'}
                    >
                      <option value="TZS">TZS</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CPU</label>
                    <Input 
                      name="cpu" 
                      defaultValue={editingLaptop?.cpu}
                      placeholder="e.g. Intel i7-13700H"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">RAM</label>
                    <Input 
                      name="ram" 
                      defaultValue={editingLaptop?.ram}
                      placeholder="e.g. 16GB DDR5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Storage</label>
                    <Input 
                      name="storage" 
                      defaultValue={editingLaptop?.storage}
                      placeholder="e.g. 512GB SSD"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">GPU</label>
                    <Input 
                      name="gpu" 
                      defaultValue={editingLaptop?.gpu}
                      placeholder="e.g. RTX 4060"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Display</label>
                    <Input 
                      name="display" 
                      defaultValue={editingLaptop?.display}
                      placeholder="e.g. 15.6&quot; FHD IPS"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Battery</label>
                    <Input 
                      name="battery" 
                      defaultValue={editingLaptop?.battery}
                      placeholder="e.g. 86Wh"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock Status</label>
                    <select 
                      name="stock_status" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.stock_status || 'In Stock'}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Limited">Limited</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Condition</label>
                    <select 
                      name="condition" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.condition || 'Brand New'}
                    >
                      <option value="Brand New">Brand New</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Used - Like New">Used - Like New</option>
                      <option value="Used - Good">Used - Good</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--vermilion)] transition-colors">
                        <input 
                          type="file" 
                          name="image" 
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <Upload size={20} />
                          <span>Click to upload image</span>
                        </div>
                      </label>
                      {imagePreview && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <Textarea 
                      name="notes" 
                      defaultValue={editingLaptop?.notes}
                      placeholder="Additional details about this laptop..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="featured" 
                        value="true"
                        defaultChecked={!!editingLaptop?.featured}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Featured on homepage</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                    <Save size={18} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Laptop'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingLaptop(null); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Laptops Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {laptops.length === 0 ? (
            <div className="p-12 text-center">
              <Laptop size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No laptops yet. Add your first laptop!</p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                <Plus size={18} className="mr-2" />
                Add Laptop
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Image</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Featured</th>
                    <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {laptops.map((laptop) => (
                    <tr key={laptop.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="w-16 h-12 rounded bg-gray-100 overflow-hidden">
                          {laptop.image ? (
                            <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Laptop size={20} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-[var(--anchor-dark)]">{laptop.name}</p>
                        <p className="text-sm text-gray-500">{laptop.cpu}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-[var(--vermilion)]">
                          {formatPrice(laptop.price)} {laptop.currency}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          laptop.stock_status === 'In Stock' 
                            ? 'bg-green-100 text-green-700'
                            : laptop.stock_status === 'Limited'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {laptop.stock_status}
                        </span>
                      </td>
                      <td className="p-4">
                        {laptop.featured ? (
                          <span className="text-[var(--vermilion)]">★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(laptop)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit size={18} className="text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleDelete(laptop.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
