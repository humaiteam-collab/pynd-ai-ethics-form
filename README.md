# เครื่องมือตรวจสอบและรับรองจริยธรรมการใช้ AI ในงานวิจัย

เว็บหน้าเดียว (static) เผยแพร่ผ่าน GitHub Pages ต้องเข้าสู่ระบบด้วยอีเมล (Firebase email-link)

## ตั้งค่าครั้งแรก
1. Firebase console → สร้างโปรเจกต์ → Build → Authentication → Sign-in method → เปิด **Google** (ตั้งอีเมลซัพพอร์ตของโปรเจกต์) และ **Email link (passwordless)**
2. Authentication → Settings → **Authorized domains** → เพิ่ม `<ชื่อบัญชี>.github.io`
3. Project settings → Your apps → เพิ่ม Web app → คัดลอกค่าใส่ `firebase-config.js`
4. ใน `firebase-config.js` แก้ `ALLOWED_ACCESS` (โดเมน/อีเมลที่อนุญาต)
5. GitHub → Settings → Pages → Deploy from branch `main` / root

## ข้อจำกัดที่ควรรู้
หน้านี้เป็นไฟล์ static บน repo สาธารณะ — ตัวโค้ด HTML ของฟอร์มเปิดดูได้ผ่าน repo/view-source
การล็อกอินช่วยจำกัดผู้ใช้ แต่ **ไม่สามารถกันการคัดลอกซอร์สโค้ด** ได้จริง
(การตรวจโดเมนอีเมลทำฝั่งเบราว์เซอร์ ผู้มีความรู้เลี่ยงได้) หากต้องการกันลอกจริง ต้องย้ายเนื้อหา/ตรรกะไปไว้ฝั่งเซิร์ฟเวอร์
