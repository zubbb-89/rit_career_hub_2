# -------------------------------------------------
# push.ps1 – quick “add‑commit‑push” helper
# -------------------------------------------------

# 1️⃣ Make sure we are in the repo root (just in case)
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Path)

# 2️⃣ Clean up a possible stale lock file
$lockFile = ".git\index.lock"
if (Test-Path $lockFile) {
    Write-Host "Removing stale lock file..."
    Remove-Item -Force $lockFile
}

# 3️⃣ Stage everything (gitignore will keep secrets out)
git add .

# 4️⃣ Show what will be committed (optional)
Write-Host "`n=== git status ==="
git status

# 5️⃣ Prompt for a commit message (press ENTER for a default)
$message = Read-Host "`nEnter commit message (default: 'Auto‑commit')"
if ([string]::IsNullOrWhiteSpace($message)) { $message = "Auto-commit" }

# 6️⃣ Commit
git commit -m "$message"

# 7️⃣ Push to origin/main
git push origin main