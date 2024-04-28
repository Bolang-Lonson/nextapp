import Link from 'next/link'
import logo from './dojo-logo.png'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav>
            <Image 
                src={logo}
                alt='Dojo Helpdesk logo'
                width={70}
                quality={100}
                placeholder='blur'
            />
            <h1>Dojo Helpdesk</h1>
            <Link href='/'>Dashboard</Link>
            <Link href='/tickets'>Tickets</Link>
        </nav>
    )
}