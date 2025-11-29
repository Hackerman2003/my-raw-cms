import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './AdminDashboard';
import { getAllLaptops } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
  
  const laptops = getAllLaptops();
  
  return <AdminDashboard initialLaptops={laptops} />;
}
