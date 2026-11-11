import './layout.css'
import { NavLink } from 'react-router-dom';
import title from '../assets/qbb_title.webp'
import discord_logo from '../assets/discord_logo_day.png'

type LayoutProps = {children: React.ReactNode}

function Layout({ children }: LayoutProps) {
  const discord = "https://discord.gg/SMKNdCnt4S";
  const year = new Date().getFullYear();
  return (
    <>
    <div className="page-layout">
    <div className="head">
      <NavLink to="/" className="header" aria-label="QUESBB home">
      <img className="title" src={title} alt="QUESBB" />
      </NavLink>
  
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/practice" className={({ isActive }) =>
          `nav-link${isActive ? ' active' : ''}`}>Questions</NavLink>
          <NavLink to="/library" className={({ isActive }) =>
          `nav-link${isActive ? ' active' : ''}`}>Library</NavLink>
        </nav>
      </div>
      <main className="page-content">{ children }</main>
      <footer>
      <div className="footer">
          <p>© Jack_Sonic {year}</p>
          
        <a href={discord} className="discord" aria-label="QUESBB home" target="_blank" rel="noopener noreferrer">
          <img className="dc" src={discord_logo} alt="Discord Logo" />
          <p>Discord</p>
        </a>
        </div>
      </footer>
      </div>
    </>
    );
}

export default Layout
