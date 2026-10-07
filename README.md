# 💌 Web Xin Lỗi Bé Ngọc

Trang web xin lỗi chân thành, ngọt ngào và lãng mạn dành riêng cho **Bé Ngọc**.
Giao diện tối ưu chuẩn hiển thị điện thoại di động (iPhone & Android), hiệu ứng cánh hoa bay, mở phong thư 3D, phát nhạc lãng mạn, các phiếu đền bù dễ thương và nút "Hông tha đâu" biết chạy trốn!

---

## 🌟 Tính Năng Nổi Bật

1. **Phong thư mở đầu lãng mạn (3D Interactive Envelope)**: Chạm để mở thư kèm âm thanh nốt nhạc du dương và hiệu ứng nổ tim.
2. **Gấu bông biết khóc & Lời xin lỗi chân thành**: Nhìn nhận thẳng thắn lỗi sai *"nói mà không suy nghĩ trước, thiếu tinh tế làm em buồn"*, không bao biện.
3. **Bản Cam Kết 3 Điều Với Bé Ngọc**:
   - Uốn lưỡi 7 lần trước khi nói.
   - Luôn tinh tế và nâng niu cảm xúc của Ngọc từng chút một.
   - Luôn nói lời dịu dàng, dỗ dành khi Ngọc dỗi.
4. **5 Phiếu Đền Bù Đặc Quyền (Coupons)**:
   - ✨ Phiếu Uốn Lưỡi 7 Lần & Siêu Tinh Tế.
   - 🧋 Phiếu 01 Ly Trà Sữa Hạ Hỏa Siêu To Full Topping.
   - 🍲 Phiếu Bao Trọn Bữa Ăn Mọi Món Bé Thích (lẩu, nướng, bánh tráng, ốc...).
   - 👑 Phiếu Chiều Chuộng Tuyệt Đối (Ngọc làm nóc nhà).
   - 🧸 Phiếu Gối Ôm Vỗ Về & Lắng Nghe 24/7.
5. **Nút "Hông tha đâu!" biết chạy trốn**:
   - Khi chạm hoặc di chuột vào, nút sẽ nhảy trốn và hiện các câu năn nỉ cực đáng yêu.
   - Nút "Dạ tha lỗi cho anh á!" sẽ ngày càng to ra.
6. **Màn ăn mừng ngập tràn pháo hoa & gấu ôm nhau**:
   - Pháo hoa rực rỡ (Confetti canvas).
   - Nút sao chép tin nhắn ngọt ngào để bé gửi lại cho bạn.
7. **Nhạc nền hộp nhạc Lofi**: Tự động phát giai điệu piano/kalimba êm dịu thông qua Web Audio API.

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages (Miễn Phí 100%)

### Cách 1: Sử dụng file `deploy.ps1` (Nhanh nhất)

1. Mở trình duyệt, vào [GitHub.com](https://github.com) và tạo một **Repository mới** (ví dụ đặt tên là `xin-loi-be-ngoc` hoặc `for-be-ngoc`, chọn chế độ **Public**).
2. Sao chép đường link repository vừa tạo (dạng: `https://github.com/TEN_GITHUB_CUA_BAN/xin-loi-be-ngoc.git`).
3. Mở PowerShell trong thư mục này và chạy lệnh:
   ```powershell
   .\deploy.ps1 -RepoUrl "https://github.com/TEN_GITHUB_CUA_BAN/xin-loi-be-ngoc.git"
   ```
4. Sau khi đẩy code lên, vào GitHub của bạn:
   - Vào mục **Settings** -> **Pages** (cột bên trái).
   - Tại mục **Build and deployment** -> **Source**: chọn **GitHub Actions** (hoặc chọn **Deploy from a branch** -> chọn nhánh `main` / `master` -> thư mục `/ (root)` -> bấm **Save**).
5. Sau khoảng 1-2 phút, GitHub sẽ cung cấp đường link web của bạn (ví dụ: `https://TEN_GITHUB_CUA_BAN.github.io/xin-loi-be-ngoc/`).
6. Gửi link đó cho Bé Ngọc qua Messenger, Zalo hoặc tin nhắn là xong! ❤️

---

### Cách 2: Các bước thủ công với Git

```bash
# 1. Thêm toàn bộ file vào git
git add .

# 2. Tạo commit
git commit -m "Xin loi Be Ngoc - Web app"

# 3. Đổi tên nhánh thành main
git branch -M main

# 4. Thêm link github repo của bạn
git remote add origin https://github.com/TEN_GITHUB_CUA_BAN/xin-loi-be-ngoc.git

# 5. Đẩy code lên GitHub
git push -u origin main
```
