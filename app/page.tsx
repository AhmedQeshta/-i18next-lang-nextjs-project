import { redirect } from 'next/navigation';
import { defaultLng } from '@/lib/constants';

export default function RootPage() {
  redirect(`/${defaultLng}`);
}
