import { useState, useEffect } from "react";

export default function Nutrition() {
  const userId = "demo-user";
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    age: 25,
    gender: "male",
    weight: 70,
    height: 175,
    activityLevel: "moderate",
    goal: "maintain",
    conditions: [],
    allergies: [],
    tastes: [],
  });
  const [loading, setLoading] = useState(false);
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [showSuggestedMeals, setShowSuggestedMeals] = useState(false);

  // --- Lấy hồ sơ hiện tại ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) return; // chưa có hồ sơ
        const data = await res.json();
        setProfile(data);
        setForm({
          age: data.age || 25,
          gender: data.gender || "male",
          weight: data.weight || 70,
          height: data.height || 175,
          activityLevel: data.activityLevel || "moderate",
          goal: data.goal || "maintain",
          conditions: data.conditions || [],
          allergies: data.allergies || [],
          tastes: data.tastes || [],
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // --- Tạo hoặc lưu hồ sơ ---
  const saveProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Lưu hồ sơ thất bại");
      const data = await res.json();
      setProfile(data);
      alert("Lưu hồ sơ thành công!");
    } catch (err) {
      console.error(err);
      alert("Lưu hồ sơ thất bại");
    } finally {
      setLoading(false);
    }
  };

  // --- Gợi ý món ăn ---
  const suggestMeals = async () => {
    if (!profile?.metrics) return;
    if (showSuggestedMeals) {
      setShowSuggestedMeals(false);
      return;
    }
    const range = profile.metrics.calorieRange;
    const avgCalories = Array.isArray(range)
      ? Math.round((range[0] + range[1]) / 2)
      : Math.round((range.min + range.max) / 2);

    try {
      const res = await fetch(`/api/planner/${userId}/random`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: 1, targetCalories: avgCalories }),
      });
      if (!res.ok) throw new Error("Lỗi khi lấy gợi ý món ăn");
      const data = await res.json();
      setSuggestedMeals(data.plan || []);
      setShowSuggestedMeals(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="nutrition">
      <div className="menu-header">
        <h1>Quay lại</h1>
        <div className="backHome" onClick={() => window.history.back()}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="goHome" onClick={() => (window.location.href = "/")}>
          🏠 Trang chủ
        </div>
      </div>

      {/* Form chỉnh sửa hồ sơ */}
      <div className="profile-form">
        <label>
          Tuổi:
          <input
            type="number"
            value={form.age}
            onChange={(e) => handleChange("age", Number(e.target.value))}
          />
        </label>
        <label>
          Giới tính:
          <select
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </label>
        <label>
          Cân nặng (kg):
          <input
            type="number"
            value={form.weight}
            onChange={(e) => handleChange("weight", Number(e.target.value))}
          />
        </label>
        <label>
          Chiều cao (cm):
          <input
            type="number"
            value={form.height}
            onChange={(e) => handleChange("height", Number(e.target.value))}
          />
        </label>
        <label>
          Mức hoạt động:
          <select
            value={form.activityLevel}
            onChange={(e) => handleChange("activityLevel", e.target.value)}
          >
            <option value="sedentary">Ít vận động</option>
            <option value="light">Vận động nhẹ</option>
            <option value="moderate">Vận động vừa</option>
            <option value="active">Vận động nhiều</option>
            <option value="very_active">Rất nhiều</option>
          </select>
        </label>
        <label>
          Mục tiêu:
          <select
            value={form.goal}
            onChange={(e) => handleChange("goal", e.target.value)}
          >
            <option value="lose">Giảm cân</option>
            <option value="maintain">Duy trì cân nặng</option>
            <option value="gain">Tăng cân</option>
          </select>
        </label>

        <button onClick={saveProfile} disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu hồ sơ"}
        </button>
      </div>

      {/* Chỉ số dinh dưỡng */}
      {profile?.metrics && (
        <div className="metrics">
          <h3>Chỉ số dinh dưỡng</h3>
          <ul>
            <li>BMR: {profile.metrics.bmr} cal/ngày</li>
            <li>TDEE: {profile.metrics.tdee} cal/ngày</li>
            <li>
              Calorie range:{" "}
              {Array.isArray(profile.metrics.calorieRange)
                ? `${profile.metrics.calorieRange[0]} - ${profile.metrics.calorieRange[1]}`
                : `${profile.metrics.calorieRange.min} - ${profile.metrics.calorieRange.max}`}{" "}
              cal/ngày
            </li>
          </ul>
          <button onClick={suggestMeals}>
            {showSuggestedMeals ? "Ẩn gợi ý món ăn" : "Gợi ý món ăn hôm nay"}
          </button>
        </div>
      )}

      {/* Gợi ý món ăn */}
      {showSuggestedMeals && suggestedMeals.length > 0 && (
        <div className="menu-plan">
          <h3>Gợi ý món ăn</h3>
          {suggestedMeals.map((day) => (
            <div key={day.date} className="plan-day">
              <h4>📅 {day.date}</h4>
              <ul>
                <li>
                  <strong>🍳 Sáng:</strong>{" "}
                  {day.meals.breakfast
                    .map((m) => `${m.name} (${m.calories} cal)`)
                    .join(", ")}
                </li>
                <li>
                  <strong>🍲 Trưa:</strong>{" "}
                  {day.meals.lunch
                    .map((m) => `${m.name} (${m.calories} cal)`)
                    .join(", ")}
                </li>
                <li>
                  <strong>🍛 Tối:</strong>{" "}
                  {day.meals.dinner
                    .map((m) => `${m.name} (${m.calories} cal)`)
                    .join(", ")}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
