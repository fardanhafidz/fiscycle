import { redirect } from 'next/navigation';

export default function ReadyAlias() {
  redirect('/mitra/onboarding/activate?ready=true');
}
