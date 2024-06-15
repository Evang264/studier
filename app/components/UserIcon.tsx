import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function UserIcon({ isClickable = false, href = "", size }:
    { isClickable?: boolean, href?: string, size: number }) {
  if (!isClickable)
    return <FaUserCircle size={size} />;
  return (
    <Link href={href}>
      <FaUserCircle className="hover:text-gray-300" size={size} />
    </Link>
  );
}