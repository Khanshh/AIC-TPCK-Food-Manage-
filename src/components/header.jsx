import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#" className="logo">
          <ion-icon name="restaurant" role="img"></ion-icon>
          MealMind
        </a>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Trang chủ
            </a>
          </li>
          <li>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Tính năng
            </a>
          </li>
          <li>
            <a href="#recipes" onClick={() => setMenuOpen(false)}>
              Công thức
            </a>
          </li>
          <li>
            <a href="#nutrition" onClick={() => setMenuOpen(false)}>
              Dinh dưỡng
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Liên hệ
            </a>
          </li>
        </ul>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}
