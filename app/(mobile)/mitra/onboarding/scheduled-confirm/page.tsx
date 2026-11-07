import { redirect } from 'next/navigation';

export default function ScheduledConfirmAlias() {
  redirect('/mitra/onboarding/installation?scheduled=true');
}
