import { NextResponse } from 'next/server';
import { getAllLaptops, createLaptop, deleteLaptop, updateLaptop } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET all laptops
export async function GET() {
  try {
    const laptops = getAllLaptops();
    return NextResponse.json(laptops);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch laptops' }, { status: 500 });
  }
}

// POST create new laptop
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const price = parseInt(formData.get('price') as string) || 0;
    const currency = formData.get('currency') as string || 'TZS';
    const cpu = formData.get('cpu') as string || '';
    const ram = formData.get('ram') as string || '';
    const storage = formData.get('storage') as string || '';
    const gpu = formData.get('gpu') as string || '';
    const display = formData.get('display') as string || '';
    const battery = formData.get('battery') as string || '';
    const stock_status = formData.get('stock_status') as string || 'In Stock';
    const condition = formData.get('condition') as string || 'Brand New';
    const notes = formData.get('notes') as string || '';
    const featured = formData.get('featured') === 'true' ? 1 : 0;
    
    // Handle image upload
    let imagePath = '';
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create uploads directory
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'laptops');
      await mkdir(uploadsDir, { recursive: true });
      
      // Save file with unique name
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/laptops/${fileName}`;
    }
    
    const id = createLaptop({
      name,
      slug,
      price,
      currency,
      cpu,
      ram,
      storage,
      gpu,
      display,
      battery,
      image: imagePath,
      stock_status,
      condition,
      notes,
      featured,
    });
    
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create laptop' }, { status: 500 });
  }
}

// DELETE laptop
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    deleteLaptop(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete laptop' }, { status: 500 });
  }
}

// PUT update laptop
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);
    
    const updates: any = {};
    
    const fields = ['name', 'price', 'currency', 'cpu', 'ram', 'storage', 'gpu', 'display', 'battery', 'stock_status', 'condition', 'notes'];
    fields.forEach(field => {
      const value = formData.get(field);
      if (value !== null) {
        updates[field] = field === 'price' ? parseInt(value as string) : value;
      }
    });
    
    if (formData.get('featured') !== null) {
      updates.featured = formData.get('featured') === 'true' ? 1 : 0;
    }
    
    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'laptops');
      await mkdir(uploadsDir, { recursive: true });
      
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
      updates.image = `/uploads/laptops/${fileName}`;
    }
    
    if (updates.name) {
      updates.slug = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    updateLaptop(id, updates);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update laptop' }, { status: 500 });
  }
}
