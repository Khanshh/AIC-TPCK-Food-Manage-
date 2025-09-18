export default function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <ion-icon
              name="restaurant"
              role="img"
              class="md hydrated"
            ></ion-icon>
            mealMind
          </div>
          <button
            className="close-btn"
            onClick={() => {
              if (typeof toggleSidebar === "function") toggleSidebar();
            }}
          >
            <ion-icon name="close" role="img" class="md hydrated"></ion-icon>
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="#home">
              <ion-icon name="home" role="img" class="md hydrated"></ion-icon>
              Trang chủ
            </a>
          </li>
          <li>
            <a href="#features">
              <ion-icon
                name="sparkles"
                role="img"
                class="md hydrated"
              ></ion-icon>
              Tính năng
            </a>
          </li>
          <li>
            <a href="#recipes">
              <ion-icon name="book" role="img" class="md hydrated"></ion-icon>
              Công thức
            </a>
          </li>
          <li>
            <a href="#nutrition">
              <ion-icon
                name="fitness"
                role="img"
                class="md hydrated"
              ></ion-icon>
              Dinh dưỡng
            </a>
          </li>
          <li>
            <a href="#menu">
              <ion-icon name="list" role="img" class="md hydrated"></ion-icon>
              Thực đơn
            </a>
          </li>
          <li>
            <a href="#ai-chat">
              <ion-icon
                name="chatbubbles"
                role="img"
                class="md hydrated"
              ></ion-icon>
              AI Tư vấn
            </a>
          </li>
          <li>
            <a href="#profile">
              <ion-icon name="person" role="img" class="md hydrated"></ion-icon>
              Hồ sơ
            </a>
          </li>
          <li>
            <a href="#contact">
              <ion-icon name="mail" role="img" class="md hydrated"></ion-icon>
              Liên hệ
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
