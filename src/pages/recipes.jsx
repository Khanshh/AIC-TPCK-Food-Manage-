export default function Recipes() {
  return (
    <section className="recipes" id="home">
      <div className="menu-header">
        <h1>Quay lại</h1>
        <div className="backHome" onClick={() => window.history.back()}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="goHome" onClick={() => (window.location.href = "/")}>
          🏠 Trang chủ
        </div>
      </div>
      <h1>Trang web đang phát triển...</h1>
    </section>
  );
}
