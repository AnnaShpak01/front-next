import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter()

  // Проверяем, является ли текущий путь активным
  const isActive = router.asPath === href

  return (
    <Link href={href} style={{ color: isActive ? '#6a5126' : 'rgb(164 143 122)' }}>
      {children}
    </Link>
  )
}

export default NavLink
