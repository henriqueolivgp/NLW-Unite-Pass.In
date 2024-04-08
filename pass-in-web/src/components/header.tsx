import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header() {
  return(
    <>
    <div className='flex items-center gap-5 py-2'>
      <img src={nlwUniteIcon} alt="NLW-Icon" />
      <nav className='flex items-center gap-5'>
        <NavLink to='/eventos' name='Eventos'/>
        <NavLink to='/participantes' name='Participantes' />
      </nav>
    </div>
    </>
  )
}