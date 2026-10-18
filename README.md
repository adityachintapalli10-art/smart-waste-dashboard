# EcoBin AI Smart Waste Dashboard

A smart waste dashboard for monitoring bins, telemetry, collection routes, analytics, staff tasks, and public reports. The primary app is a Python Streamlit dashboard (`app.py`); the original React/Vite implementation is also retained.

## Run the Python app

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
streamlit run app.py
```

Streamlit opens the dashboard at `http://localhost:8501`.

## Run the React app

```sh
npm install
npm run dev
```

Build the React app with `npm run build`.
