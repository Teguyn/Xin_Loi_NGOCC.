[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$RepoUrl = "https://github.com/Teguyn/Xin_Loi_NGOCC..git"
)

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "💌 DEPLOY WEB XIN LOI BE NGOC LEN GITHUB" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Magenta

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
    $RepoUrl = Read-Host "Nhap URL GitHub Repository (VD: https://github.com/Teguyn/Xin_Loi_NGOCC..git)"
}

Write-Host "`n1. Kiem tra commit..." -ForegroundColor Yellow
git add .
git commit -m "Cap nhat web xin loi Be Ngoc - giai doan tim hieu chan thanh va tinh te" 2>$null

Write-Host "`n2. Cau hinh nhanh main..." -ForegroundColor Yellow
git branch -M main

Write-Host "`n3. Cau hinh remote origin: $RepoUrl" -ForegroundColor Yellow
$currentRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    git remote set-url origin $RepoUrl
} else {
    git remote add origin $RepoUrl
}

Write-Host "`n4. Dang day code len GitHub..." -ForegroundColor Cyan
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host "🎉 DEPLOY THANH CONG LEN GITHUB!" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host "Cac buoc tiep theo de lay link gui Ngoc:" -ForegroundColor Yellow
    Write-Host "1. Vao GitHub: https://github.com/Teguyn/Xin_Loi_NGOCC." -ForegroundColor White
    Write-Host "2. Vao muc Settings -> chon Pages (menu ben trai)" -ForegroundColor White
    Write-Host "3. Muc 'Build and deployment' -> Source: chon 'GitHub Actions'" -ForegroundColor White
    Write-Host "   (Hoac chon 'Deploy from a branch' -> main -> root -> Save)" -ForegroundColor White
    Write-Host "4. Link web cua ban se co dang: https://teguyn.github.io/Xin_Loi_NGOCC./" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Khong the push code tu dong. Vui long kiem tra tai khoan GitHub hoac nhap Token!" -ForegroundColor Red
}
