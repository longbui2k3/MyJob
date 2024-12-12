"# MyJob" 
# HƯỚNG DẪN SỬ DỤNG WEBSITE HỖ TRỢ ĐĂNG TIN VÀ TÌM KIẾM VIỆC LÀM

## Yêu cầu
- **NodeJS**: Nên dùng phiên bản LTS (Long Term Support). Có thể tải tại [đây](https://nodejs.org/en/download/).

## Server API

1. **Mở terminal tại thư mục `backend`:**
   ```bash
   cd backend
   ```

2. **Cài đặt các package:**
   ```bash
   npm install
   ```

3. **Tạo file `.env` trong thư mục `backend` với các thông tin sau:**

   ```env
   MONGODB_URI=<Connection string để kết nối tới MongoDB>
   AUTH_EMAIL=<Email đã được cấu hình để gửi email>
   AUTH_PASS=<Password của email được cấu hình (có thể lấy thông qua ứng dụng mật khẩu trên Google Account)>
   PORT=<Port để listen (lắng nghe) server API>
   CLIENT_DOMAIN=<Domain bên phía Client (vd: http://localhost:5713)>
   FIREBASE_API_KEY=<Firebase API key>
   FIREBASE_AUTH_DOMAIN=<Firebase auth domain>
   FIREBASE_PROJECT_ID=<Firebase project id>
   FIREBASE_STORAGE_BUCKET=<Firebase storage bucket>
   FIREBASE_MESSAGING_SENDER_ID=<Firebase messaging sender id>
   FIREBASE_APP_ID=<Firebase app id>
   FIREBASE_MEASUREMENT_ID=<Firebase measurement id>
   ```

4. **Chạy server:**
   ```bash
   npm run start
   ```

## Frontend

1. **Mở terminal tại thư mục `frontend`:**
   ```bash
   cd frontend
   ```

2. **Cài đặt các package:**
   ```bash
   npm install
   ```

3. **Tạo file `.env` trong thư mục `frontend` với các thông tin sau:**

   ```env
   VITE_SERVER_DOMAIN=<Domain bên phía Server (vd: http://localhost:8080/api/v1)>
   VITE_FIREBASE_API_KEY=<Firebase API key>
   VITE_FIREBASE_AUTH_DOMAIN=<Firebase auth domain>
   VITE_FIREBASE_PROJECT_ID=<Firebase project id>
   VITE_FIREBASE_STORAGE_BUCKET=<Firebase storage bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<Firebase messaging sender id>
   VITE_FIREBASE_APP_ID=<Firebase app id>
   VITE_FIREBASE_MEASUREMENT_ID=<Firebase measurement id>
   ```

4. **Chạy client:**
   ```bash
   npm run dev
   
