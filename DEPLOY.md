# 🚀 הוראות פריסה - TripCraft

## אפשרות 1: Render (מומלץ)

### שלב 1: העלאה ל-GitHub

1. צור ריפו חדש ב-GitHub (ציבורי או פרטי)
2. פתח PowerShell והרץ:

```powershell
cd C:\Users\jdfri\trip-planner
git init
git add .
git commit -m "Initial commit - TripCraft vacation planner"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trip-planner.git
git push -u origin main
```

### שלב 2: פריסה ב-Render

1. היכנס ל-[Render Dashboard](https://dashboard.render.com/)
2. לחץ על **New** > **Blueprint**
3. חבר את GitHub שלך ובחר את הריפו `trip-planner`
4. Render יזהה את `render.yaml` ויפרוס אוטומטית!

### כתובות לאחר הפריסה:
- **Frontend:** `https://tripcraft-frontend.onrender.com`
- **Backend API:** `https://tripcraft-api.onrender.com`

---

## אפשרות 2: פריסה ידנית ב-Render

### Backend (Web Service)
1. New > Web Service
2. Connect GitHub repo
3. הגדרות:
   - **Name:** tripcraft-api
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free

### Frontend (Static Site)
1. New > Static Site
2. Connect GitHub repo
3. הגדרות:
   - **Name:** tripcraft-frontend
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`
   - **Environment Variable:** `VITE_API_URL` = `https://tripcraft-api.onrender.com`

---

## אפשרות 3: Vercel (Frontend) + Render (Backend)

### Frontend ב-Vercel
1. היכנס ל-[Vercel](https://vercel.com)
2. Import Git Repository
3. בחר את התיקייה `frontend` כ-Root Directory
4. הוסף Environment Variable:
   - `VITE_API_URL` = `https://tripcraft-api.onrender.com`

### Backend ב-Render
כמו באפשרות 2 (Web Service)

---

## 🔧 הגדרות נוספות

### Environment Variables

**Backend:**
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tripcraft-frontend.onrender.com
```

**Frontend:**
```
VITE_API_URL=https://tripcraft-api.onrender.com
```

---

## ⚠️ שים לב

### Render Free Tier
- השרת "נרדם" אחרי 15 דקות של חוסר פעילות
- הפעלה ראשונה אחרי "שינה" לוקחת ~30 שניות
- מסד הנתונים (SQLite) נמחק בכל פריסה מחדש (נתוני הדמו נטענים אוטומטית)

### לשימוש בפרודקשן
מומלץ לשדרג ל:
- Render Starter Plan ($7/חודש) - ללא "שינה"
- PostgreSQL במקום SQLite - לנתונים קבועים

---

## 📞 בדיקה

לאחר הפריסה, בדוק:
1. `https://tripcraft-api.onrender.com/health` - אמור להחזיר `{"status":"ok"}`
2. `https://tripcraft-api.onrender.com/api/destinations` - רשימת יעדים
3. `https://tripcraft-frontend.onrender.com` - האתר

---

## 🎉 סיימת!

האתר שלך באוויר! שתף את הלינק:
`https://tripcraft-frontend.onrender.com`

