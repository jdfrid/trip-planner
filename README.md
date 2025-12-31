# TripCraft - מערכת תכנון חופשות

מערכת חכמה לתכנון חופשות מותאמות אישית, כוללת ניהול יעדים, טיסות, מלונות, השכרת רכב ואטרקציות.

## תכונות עיקריות

- 🔍 **חיפוש בשפה חופשית** - המשתמש יכול לתאר את החופשה שהוא מחפש בשפה טבעית
- ✈️ **ניהול טיסות** - השוואת מחירים ובחירת טיסות
- 🏨 **ניהול מלונות** - מגוון אפשרויות לינה עם דירוגים וביקורות
- 🚗 **השכרת רכב** - אפשרויות רכב מגוונות
- 🎫 **אטרקציות** - המלצות לפעילויות ואטרקציות ביעד
- 📦 **חבילות מוכנות** - חבילות נסיעה מתוכננות מראש

## התקנה

### דרישות
- Node.js 18+
- npm או yarn

### שלבי התקנה

1. **התקנת כל החבילות**:
```bash
npm run install:all
```

2. **הזנת נתוני הדמו**:
```bash
cd backend
npm run seed
```

3. **הפעלת הפרויקט**:
```bash
npm run dev
```

או הפעלה נפרדת:
```bash
# Backend (port 3001)
cd backend && npm run dev

# Frontend (port 3000)
cd frontend && npm run dev
```

## מבנה הפרויקט

```
trip-planner/
├── backend/
│   ├── src/
│   │   ├── config/        # הגדרות DB
│   │   ├── controllers/   # Controllers
│   │   ├── routes/        # API Routes
│   │   └── seeds/         # נתוני דמו
│   ├── data/              # SQLite DB
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # רכיבים משותפים
│   │   ├── pages/         # דפי האתר
│   │   └── styles/        # CSS
│   └── package.json
└── package.json
```

## API Endpoints

### יעדים
- `GET /api/destinations` - כל היעדים
- `GET /api/destinations/:id` - יעד ספציפי
- `GET /api/destinations/:id/complete` - יעד עם כל המידע המקושר

### טיסות
- `GET /api/flights` - כל הטיסות
- `GET /api/flights/destination/:id` - טיסות ליעד

### מלונות
- `GET /api/hotels` - כל המלונות
- `GET /api/hotels/destination/:id` - מלונות ביעד

### השכרת רכב
- `GET /api/car-rentals` - כל אפשרויות הרכב
- `GET /api/car-rentals/destination/:id` - רכב ביעד

### אטרקציות
- `GET /api/attractions` - כל האטרקציות
- `GET /api/attractions/destination/:id` - אטרקציות ביעד

### חבילות
- `GET /api/packages` - כל החבילות
- `GET /api/packages/:id` - חבילה ספציפית

### חיפוש
- `POST /api/search` - חיפוש בשפה חופשית

## יעד הפיילוט - אוסטריה 🇦🇹

המערכת כוללת נתוני דמו עבור אוסטריה:

### ערים מכוסות
- **וינה** - הבירה הקיסרית
- **זלצבורג** - עיר המוזיקה
- **אינסברוק** - שער האלפים
- **הלשטאט** - כפר האגדות

### מידע כלול
- 4 טיסות (Austrian, EL AL, Wizz Air, Lufthansa)
- 7 מלונות (3-5 כוכבים)
- 4 אפשרויות השכרת רכב
- 12 אטרקציות (מוזיאונים, טבע, סקי, סיורים)
- 4 חבילות מוכנות (תרבות, הרפתקאות, רומנטי, משפחה)

## טכנולוגיות

### Backend
- Node.js + Express
- SQLite (better-sqlite3)
- UUID for IDs

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Lucide Icons

## רישיון

MIT

