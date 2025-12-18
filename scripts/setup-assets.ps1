# PowerShell script to help set up fonts and images

Write-Host "Setting up project assets..." -ForegroundColor Cyan
Write-Host ""

# Check if images directory exists
if (Test-Path "images") {
    Write-Host "Found images directory" -ForegroundColor Green
    
    # Copy images to public
    if (-not (Test-Path "public\images")) {
        New-Item -ItemType Directory -Path "public\images" -Force | Out-Null
    }
    
    Copy-Item -Path "images\*" -Destination "public\images\" -Recurse -Force
    Write-Host "Copied images to public/images/" -ForegroundColor Green
} else {
    Write-Host "Images directory not found" -ForegroundColor Red
}

Write-Host ""

# Check fonts directory
if (-not (Test-Path "public\fonts\josefin-sans")) {
    New-Item -ItemType Directory -Path "public\fonts\josefin-sans" -Force | Out-Null
    Write-Host "Created fonts directory" -ForegroundColor Green
}

Write-Host ""
Write-Host "Next steps for fonts:" -ForegroundColor Yellow
Write-Host "1. Visit: https://gwfh.mranftl.com/fonts/josefin-sans"
Write-Host "2. Select weights: 300, 400, 500, 600, 700"
Write-Host "3. Select formats: woff2 and woff"
Write-Host "4. Download and extract the ZIP"
Write-Host "5. Copy all .woff2 and .woff files to: public/fonts/josefin-sans/"
Write-Host ""
