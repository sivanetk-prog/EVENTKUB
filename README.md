# web101 - Event Management System

ระบบจัดการกิจกรรม/อีเวนต์แบบพื้นฐาน สร้างด้วย Node.js + Express + MySQL และหน้าเว็บ HTML/CSS/JS แบบตรงไปตรงมา

## ความสามารถหลัก

- สร้างกิจกรรมและกำหนดจำนวนผู้เข้าร่วมสูงสุด
- จัดการข้อมูลผู้ใช้ในระบบ
- ให้ผู้ใช้ลงทะเบียนเข้าร่วมกิจกรรม
- แสดงรายชื่อผู้เข้าร่วมทั้งหมดของแต่ละกิจกรรม

## โครงสร้างโปรเจค

```text
web101/
|-- database/   schema และ seed สำหรับ MySQL
|-- frontend/   หน้าเว็บแบบ Vanilla HTML/CSS/JS
`-- server/     REST API ด้วย Node.js + Express
```

## วิธีรัน

1. รัน MySQL จาก `server/docker-compose.yml`
2. import ไฟล์ `database/schema.sql`
3. ติดตั้งแพ็กเกจในโฟลเดอร์ `server`
4. รัน `node index.js`
5. เปิด `frontend/index.html`

## API หลัก

- `GET /users`
- `POST /users`
- `GET /events`
- `POST /events`
- `PUT /events/:id`
- `DELETE /events/:id`
- `GET /registrations`
- `POST /registrations`
- `DELETE /registrations/:id`
