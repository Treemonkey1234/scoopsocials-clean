# 🔑 ScoopSocials Deploy Key Setup Script (PowerShell)
# This script generates SSH keys and provides setup instructions

param(
    [switch]$Test
)

Write-Host "🚀 ScoopSocials Deploy Key Setup" -ForegroundColor Blue
Write-Host "================================="

# Check if SSH directory exists
$sshDir = "$env:USERPROFILE\.ssh"
if (!(Test-Path $sshDir)) {
    Write-Host "Creating ~/.ssh directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $sshDir -Force | Out-Null
}

# Generate timestamp for unique key name
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$keyName = "scoopsocials_deploy_$timestamp"
$keyPath = "$sshDir\$keyName"

Write-Host "Generating SSH key pair..." -ForegroundColor Yellow

# Check if ssh-keygen is available
try {
    $sshKeygenPath = Get-Command ssh-keygen -ErrorAction Stop
    & ssh-keygen -t ed25519 -C "scoopsocials-deploy-$timestamp" -f $keyPath -N '""'
} catch {
    Write-Host "❌ ssh-keygen not found. Please install Git for Windows or OpenSSH." -ForegroundColor Red
    Write-Host "Git for Windows: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or install OpenSSH: Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ SSH key pair generated successfully!" -ForegroundColor Green
Write-Host ""

# Display public key
Write-Host "📋 Your PUBLIC key (add this to GitHub):" -ForegroundColor Blue
Write-Host "================================================"
Get-Content "$keyPath.pub"
Write-Host "================================================"

# Update SSH config
$sshConfig = "$sshDir\config"
Write-Host "Updating SSH config..." -ForegroundColor Yellow

$configEntry = @"

# ScoopSocials Deploy Key - Generated $(Get-Date)
Host github-scoopsocials
    HostName github.com
    User git
    IdentityFile $keyPath
    IdentitiesOnly yes
"@

Add-Content -Path $sshConfig -Value $configEntry

Write-Host "✅ SSH config updated!" -ForegroundColor Green

# Instructions
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Blue
Write-Host "=============="
Write-Host "1. Copy the PUBLIC key above"
Write-Host "2. Go to your GitHub repository"
Write-Host "3. Settings → Deploy keys → Add deploy key"
Write-Host "4. Title: 'ScoopSocials Deploy Key $timestamp'"
Write-Host "5. Paste the public key"
Write-Host "6. ✅ Check 'Allow write access'"
Write-Host "7. Click 'Add key'"
Write-Host ""

Write-Host "🧪 Test the connection:" -ForegroundColor Blue
Write-Host "ssh -T github-scoopsocials"
Write-Host ""

Write-Host "🚀 Deploy with:" -ForegroundColor Blue
Write-Host "git remote add deploy github-scoopsocials:yourusername/scoopsocials-clean.git"
Write-Host "git push deploy main"
Write-Host ""

Write-Host "🎉 Deploy key setup complete!" -ForegroundColor Green

# Offer to test connection
if (!$Test) {
    $response = Read-Host "Would you like to test the SSH connection now? (y/n)"
    if ($response -match '^[Yy]$') {
        Write-Host "Testing SSH connection..." -ForegroundColor Blue
        try {
            & ssh -T github-scoopsocials
            Write-Host "✅ SSH connection successful!" -ForegroundColor Green
        } catch {
            Write-Host "❌ SSH connection failed. Make sure you've added the public key to GitHub." -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "📄 Key files location:" -ForegroundColor Blue
Write-Host "Private key: $keyPath"
Write-Host "Public key:  $keyPath.pub"
Write-Host ""
Write-Host "⚠️  Keep your private key secure and never share it!" -ForegroundColor Red 