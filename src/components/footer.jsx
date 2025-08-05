export default function Footer() {
  return (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-links">
                <a href="#about">Về chúng tôi</a>
                <a href="#privacy">Chính sách bảo mật</a>
                <a href="#terms">Điều khoản sử dụng</a>
                <a href="#help">Trợ giúp</a>
            </div>
            <div className="social-icons">
                <a href="#"><ion-icon name="logo-facebook" role="img" className="md hydrated"></ion-icon></a>
                <a href="#"><ion-icon name="logo-instagram" role="img" className="md hydrated"></ion-icon></a>
                <a href="#"><ion-icon name="logo-twitter" role="img" className="md hydrated"></ion-icon></a>
                <a href="#"><ion-icon name="logo-youtube" role="img" className="md hydrated"></ion-icon></a>
            </div>
            <p>© 2024 mealMind. Tất cả quyền được bảo lưu.</p>
        </div>
    </footer>
  );
}
