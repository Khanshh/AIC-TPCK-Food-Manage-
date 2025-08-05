export default function Header() {
    return (
        <header className="header">
            <nav className="nav-container">
                <a href="#" className="logo">
                    <ion-icon name="restaurant" role="img" className="md hydrated"></ion-icon>
                    MealMind
                </a>
                <ul className="nav-menu">
                    <li><a href="#home">Trang chủ</a></li>
                    <li><a href="#features">Tính năng</a></li>
                    <li><a href="#recipes">Công thức</a></li>
                    <li><a href="#nutrition">Dinh dưỡng</a></li>
                    <li><a href="#contact">Liên hệ</a></li>
                </ul>
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    );
}
