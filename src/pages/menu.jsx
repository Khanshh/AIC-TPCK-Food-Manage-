import { useState, useEffect } from "react";

export default function MenuPlanner() {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);
  const [targetCalories, setTargetCalories] = useState(2000);
  const userId = "demo-user";

  // Tạo thực đơn random theo calo
  const createRandomPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/planner/${userId}/random`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, targetCalories }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setPlan(data.plan || []);
    } catch (err) {
      console.error("Lỗi tạo thực đơn random:", err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa toàn bộ thực đơn
  const deletePlan = async () => {
    if (!confirm("Bạn có chắc muốn xóa toàn bộ thực đơn?")) return;
    try {
      const res = await fetch(`/api/planner/${userId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setPlan([]);
    } catch (err) {
      console.error("Lỗi xóa thực đơn:", err);
    }
  };

  // Lấy kế hoạch hiện tại
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`/api/planner/${userId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error("Lỗi tải thực đơn:", err);
      }
    };
    fetchPlan();
  }, []);

  return (
    <section className="menuPlanner">
      {/* Header */}
      <div className="menu-header">
        <h1>Quay lại</h1>
        <div className="backHome" onClick={() => window.history.back()}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="goHome" onClick={() => (window.location.href = "/")}>
          🏠 Trang chủ
        </div>
      </div>

      <div className="menu-title">
        <h1>Thực đơn cá nhân</h1>
      </div>

      {/* Controls */}
      <div className="menu-controls">
        <label>
          Số ngày:
          <input
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </label>
        <label>
          Calo/ngày:
          <input
            type="number"
            min={500}
            max={5000}
            value={targetCalories}
            onChange={(e) => setTargetCalories(Number(e.target.value))}
          />
        </label>
        <button onClick={createRandomPlan} disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo thực đơn theo calo"}
        </button>
        <button className="delete-btn" onClick={deletePlan}>
          Xóa toàn bộ thực đơn
        </button>
      </div>

      {/* Menu plan */}
      <div className="menu-plan">
        {plan.length === 0 ? (
          <p>Chưa có thực đơn. Nhấn "Tạo thực đơn theo calo" để bắt đầu.</p>
        ) : (
          plan.map((day) => (
            <div key={day.id} className="plan-day">
              <h3>📅 {day.date}</h3>
              <ul>
                <li>
                  <strong>🍳 Sáng:</strong>{" "}
                  {day.meals.breakfast.map((m, i) => (
                    <span key={m.id}>
                      {m.name}{" "}
                      <span className="calories">({m.calories} cal)</span>
                      {i < day.meals.breakfast.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </li>
                <li>
                  <strong>🍲 Trưa:</strong>{" "}
                  {day.meals.lunch.map((m, i) => (
                    <span key={m.id}>
                      {m.name}{" "}
                      <span className="calories">({m.calories} cal)</span>
                      {i < day.meals.lunch.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </li>
                <li>
                  <strong>🍛 Tối:</strong>{" "}
                  {day.meals.dinner.map((m, i) => (
                    <span key={m.id}>
                      {m.name}{" "}
                      <span className="calories">({m.calories} cal)</span>
                      {i < day.meals.dinner.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </li>
              </ul>
              {day.shoppingList?.length > 0 && (
                <details>
                  <summary>🛒 Danh sách mua sắm</summary>
                  <ul>
                    {day.shoppingList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
