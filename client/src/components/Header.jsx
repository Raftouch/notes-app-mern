import { NavLink } from 'react-router-dom'
import note from '../assets/note.png'

function Header() {
  return (
    <header className="h-[80px] w-full flex justify-between items-center px-5 border-b-2">
      <img className="w-[50px]" src={note} alt="note-img" />
      <span className="flex gap-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </span>
    </header>
  )
}

export default Header
