# EcoBin AI + SmartBin 360 Dashboard

A unified smart-waste app combining the EcoBin AI and SmartBin 360 feature sets. One Python/Streamlit dashboard provides shared bin operations, fleet search and CSV export, GPS maps, route planning, demand insights, waste-classifier demos, telemetry-driven alerts, analytics, ESP32 simulation, role/settings, field tasks, and public reports.

## Run the unified Python app

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
streamlit run app.py
```

Streamlit opens at `http://localhost:8501`. Sample classifier results and demand forecasts are labeled as demonstrations, not predictions from a trained model.

## Authentication setup

Users can sign in immediately after registration. Password reset is available only with a single-use recovery code; no password reset email is sent. On first sign-in, open **Account security & recovery** and generate, copy or download, and safely store your recovery codes. They are only displayed once. Configure a bootstrap administrator to manage roles/designations. SMTP settings are optional and used only for security notifications. Set secrets in the deployment environment, not in source control:

```powershell
$env:SMARTBIN_BOOTSTRAP_ADMIN_EMAIL = "admin@example.com"
$env:SMARTBIN_BOOTSTRAP_ADMIN_PASSWORD = "Use-a-long-unique-password-42!"
$env:SMARTBIN_TOTP_ENCRYPTION_KEY = (python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")

# Optional: enables account security notification emails.
$env:SMARTBIN_SMTP_HOST = "smtp.example.com"
$env:SMARTBIN_SMTP_PORT = "587"
$env:SMARTBIN_SMTP_FROM = "no-reply@example.com"
$env:SMARTBIN_SMTP_USERNAME = "smtp-user"
$env:SMARTBIN_SMTP_PASSWORD = "smtp-password"
```

On first startup, the bootstrap administrator is created. Remove the bootstrap email and password variables after setup; an existing administrator is not reset on subsequent startups. Keep `SMARTBIN_TOTP_ENCRYPTION_KEY` stable and backed up: changing or losing it prevents users with enabled authenticator two-factor authentication from signing in.

Authentication records are stored in `data/smartbin_auth.sqlite3` by default. Set `SMARTBIN_AUTH_DB_PATH` to a durable, private persistent-volume path in production; ephemeral hosting filesystems can lose user accounts on restart. Configure SMTP and the TOTP key in the deployment's secret store, never in source control. Administrators can approve requested designations and manage registration designations; users can set up authenticator-based 2FA and manage single-use recovery codes in account security settings.

## Legacy frontends

The standalone React/Vite and HTML frontends are retained as unauthenticated demos and do not use this Streamlit app's server-side authentication. Use `app.py` as the protected application; do not expose those legacy frontends as production alternatives.
