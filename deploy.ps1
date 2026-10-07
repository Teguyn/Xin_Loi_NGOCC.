param (
    [string]$RepoUrl = ""
)

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "💌 DEPLOY WEB XIN LỖI BÉ NGỌC LÊN GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
    $RepoUrl = Read-Host "👉 Nhập đường dẫn GitHub Repository của bạn (VD: https://github.com/username/xin-loi-be-ngoc.git)"
}

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
    Write-Host "❌ Bạn chưa nhập URL repository. Vui lòng thử lại!" -ForegroundColor Red
    exit 1
}

Write-Host "`n📦 Đang chuẩn bị và đóng gói file..." -ForegroundColor Yellow
git add .
git commit -m "Web xin loi Be Ngoc sieu de thuong va chan thanh"

Write-Host "`n🌿 Cấu hình nhánh main..." -ForegroundColor Yellow
git branch -M main

# Kiểm tra xem đã có origin chưa
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "🔄 Cập nhật remote origin..." -ForegroundColor Yellow
    git remote set-url origin $RepoUrl
} else {
    Write-Host "🔗 Thêm remote origin..." -ForegroundColor Yellow
    git remote add origin $RepoUrl
}

Write-Host "`n🚀 Đang đẩy code lên GitHub..." -ForegroundColor Cyan
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n============================================================" -ForegroundColor Green
    Write-Host "🎉 ĐẨY CODE LÊN GITHUB THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "👉 Bước cuối cùng để lấy link gửi Bé Ngọc:" -ForegroundColor Yellow
    Write-Host "1. Vào trang GitHub của bạn -> mục Settings -> Pages" -ForegroundColor White
    Write-Host "2. Tại 'Build and deployment' -> Source chọn 'GitHub Actions' (hoặc 'Deploy from a branch' -> main -> / (root))" -ForegroundColor White
    Write-Host "3. Đợi 1 phút là có link dạng: https://<username>.github.io/<repo-name>/" -ForegroundColor Cyan
    Write-Host "4. Gửi link cho Bé Ngọc ngay nha! Chúc hai bạn mau làm hòa ❤️" -ForegroundColor Magenta
} else {
    Write-Host "`n❌ Có lỗi xảy ra khi push. Vui lòng kiểm tra lại quyền truy cập hoặc tài khoản GitHub!" -ForegroundColor Red
}
