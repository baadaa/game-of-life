import { navigate } from 'gatsby';

export default function FourOhFourPage() {
  if (typeof window === 'undefined') return null;
  navigate('/');
  return null;
}
