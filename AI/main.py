import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Tải các biến môi trường từ file .env
load_dotenv()

# Khởi tạo FastAPI
app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8001",
        "http://127.0.0.1:8001",
        "http://localhost:8001/",
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khởi tạo client OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Định nghĩa mô hình dữ liệu cho yêu cầu
class ChatRequest(BaseModel):
    message: str
    language: str = "vi"  # Thêm trường language, mặc định là tiếng Việt

@app.options("/chat")
async def options_chat(request: Request):
    print("Nhận yêu cầu OPTIONS")
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
    print(f"Nhận yêu cầu POST: {request.message} | Ngôn ngữ: {request.language}")
    try:
        # Chọn prompt hệ thống theo ngôn ngữ
        if request.language == "en":
            system_prompt = ""
        else:
            system_prompt = ""

        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=250
        )
        reply = response.choices[0].message.content.strip()
        print(f"Phản hồi: {reply}")
        # Lưu lịch sử chat vào file
        with open("chat_history.txt", "a", encoding="utf-8") as f:
            f.write(f"Ngôn ngữ: {request.language}\nUser: {request.message}\nBot: {reply}\n---\n")
        return {"reply": reply}
    except Exception as e:
        print(f"Lỗi: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Lỗi khi xử lý yêu cầu: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)