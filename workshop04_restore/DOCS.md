# Workshop 04: เอาไฟล์ออกจาก Staging โดยไม่ทำงานหาย

Workshop นี้เขียนในรูปแบบบทสนทนากับ ChatGPT เพื่อให้ค่อย ๆ เรียนรู้จากสถานการณ์ที่เกิดขึ้นจริง:

```bash
git add .
```

แล้วเพิ่งพบว่า `.env`, ไฟล์ log หรือไฟล์ที่ยังทำไม่เสร็จถูกเพิ่มเข้า Staging ไปด้วย

หลังจบบทนี้ คุณจะสามารถ:

- เอาไฟล์ออกจาก Staging โดยไม่ลบไฟล์และไม่ทิ้งงานที่แก้ไว้
- แยกความต่างระหว่าง `git restore --staged <file>` กับ `git restore <file>`
- ตรวจสอบสิ่งที่จะถูก Commit ก่อนบันทึกจริง
- แก้สถานการณ์ที่เผลอใช้ `git add .`

> [!IMPORTANT]
> ใจความสำคัญของบทนี้คือ **เอาไฟล์ออกจาก Staging** กับ **ทิ้งการแก้ไขในไฟล์** เป็นคนละเรื่องกัน

---

## ทำความรู้จักพื้นที่ 3 ส่วนของ Git

> **ผู้เรียน:** ก่อนเริ่ม ขอทบทวนหน่อยว่า Working Directory, Staging Area และ Repository ต่างกันอย่างไร?
>
> **ChatGPT:** ลองนึกภาพว่าไฟล์เดินทางผ่าน 3 จุดนี้:

```text
Working Directory  ── git add ──>  Staging Area  ── git commit ──>  Repository
   กำลังแก้ไฟล์                     เตรียมจะ Commit                    บันทึกแล้ว
```

- **Working Directory** คือไฟล์ที่กำลังสร้างหรือแก้ไขอยู่บนเครื่อง
- **Staging Area** คือรายการการเปลี่ยนแปลงที่เลือกไว้สำหรับ Commit ครั้งถัดไป
- **Repository** คือประวัติที่บันทึกเป็น Commit แล้ว

คำสั่งหลักของ Workshop นี้จะพาไฟล์ย้อนจาก Staging Area กลับมาเป็นงานที่ยังไม่ Stage:

```text
Working Directory  <── git restore --staged ──  Staging Area
```

ไฟล์และเนื้อหาที่แก้ไว้ยังอยู่เหมือนเดิม

---

## ก่อนเริ่ม Workshop

> **ChatGPT:** เข้าไปที่ Repository ที่ใช้ฝึก แล้วตรวจสอบสถานะก่อนเสมอ

```bash
cd git-workshop
git status
```

ถ้า Repository ไม่มีงานค้างอยู่ ควรเห็น:

```text
nothing to commit, working tree clean
```

> **ผู้เรียน:** ถ้าไม่ขึ้นว่า clean ล่ะ?
>
> **ChatGPT:** อย่าเพิ่งรันคำสั่งตาม Workshop ต่อ ให้ดู `git status` ก่อนว่างานเดิมคืออะไร เพื่อไม่ให้เผลอแก้ ลบ หรือ Commit งานที่ไม่เกี่ยวข้อง

---

## Step 1: สร้างสถานการณ์จำลอง

สร้างไฟล์ใหม่ 3 ไฟล์:

```bash
echo "console.log('User service');" > user.js
echo "DB_PASSWORD=123456" > .env
echo "Application started" > app.log
```

ตรวจสอบสถานะ:

```bash
git status
```

ควรเห็นประมาณนี้:

```text
Untracked files:
  .env
  app.log
  user.js
```

> **ผู้เรียน:** ตอนนี้ทั้งสามไฟล์อยู่ตรงไหน?
>
> **ChatGPT:** อยู่ใน Working Directory และยังเป็น `untracked` หมายถึง Git มองเห็นไฟล์แล้ว แต่ยังไม่มีไฟล์ใดอยู่ใน Staging Area

---

## Step 2: จำลองการเผลอใช้ `git add .`

เพิ่มทุกไฟล์เข้า Staging:

```bash
git add .
git status
```

จะเห็นผลลัพธ์ประมาณนี้:

```text
Changes to be committed:
  new file: .env
  new file: app.log
  new file: user.js
```

สมมติว่าเราต้องการจัดการไฟล์ดังนี้:

| ไฟล์ | ต้องการ Commit หรือไม่ | เหตุผล |
|---|---:|---|
| `user.js` | ใช่ | เป็น Source Code ที่ต้องการบันทึก |
| `.env` | ไม่ | อาจมีรหัสผ่านหรือข้อมูลลับ |
| `app.log` | ไม่ | เป็นไฟล์ที่โปรแกรมสร้างขึ้นชั่วคราว |

> **ผู้เรียน:** ผมเผลอ Stage ทุกไฟล์ไปแล้ว ต้องลบ `.env` กับ `app.log` แล้วสร้างใหม่ไหม?
>
> **ChatGPT:** ไม่ต้องลบไฟล์ ใช้ `git restore --staged` เพื่อเอาเฉพาะไฟล์ที่ไม่ต้องการออกจากรายการ Commit ได้

---

## Step 3: เอา `.env` ออกจาก Staging

รันคำสั่ง:

```bash
git restore --staged .env
git status
```

ควรเห็นประมาณนี้:

```text
Changes to be committed:
  new file: app.log
  new file: user.js

Untracked files:
  .env
```

> **ผู้เรียน:** `.env` หายไปหรือยัง?
>
> **ChatGPT:** ไม่หาย ไฟล์ยังอยู่บนเครื่องพร้อมเนื้อหาเดิม เพียงแต่ไม่อยู่ในรายการที่จะ Commit แล้ว

ความหมายของคำสั่งนี้คือ:

```bash
git restore --staged .env
```

```text
เอา .env ออกจาก Staging Area
แต่เก็บไฟล์และเนื้อหาของ .env ไว้ใน Working Directory
```

---

## Step 4: เอา `app.log` ออกจาก Staging

ทำแบบเดียวกันกับไฟล์ log:

```bash
git restore --staged app.log
git status
```

ตอนนี้ควรเห็น:

```text
Changes to be committed:
  new file: user.js

Untracked files:
  .env
  app.log
```

> **ChatGPT:** ตอนนี้ Staging Area เหลือเฉพาะ `user.js` ดังนั้น Commit ครั้งถัดไปจะไม่รวม `.env` และ `app.log`

---

## Step 5: ตรวจสอบก่อน Commit

> **ผู้เรียน:** จะตรวจสอบได้อย่างไรว่าสิ่งที่กำลังจะ Commit มีแค่ `user.js` จริง ๆ?
>
> **ChatGPT:** ใช้ `git diff --staged` เพื่อตรวจสิ่งที่อยู่ใน Staging Area

```bash
git diff --staged
```

ผลลัพธ์ควรแสดงเฉพาะการเพิ่ม `user.js` จากนั้นจึง Commit:

```bash
git commit -m "feat: add user service"
git status
```

หลัง Commit แล้ว `git status` ควรยังแสดงไฟล์ที่ไม่ได้ Commit:

```text
Untracked files:
  .env
  app.log
```

นี่เป็นหลักฐานว่า `git restore --staged` ไม่ได้ลบไฟล์ เพียงนำไฟล์ออกจาก Staging เท่านั้น

---

## คำถามสำคัญ: `--staged` ต่างกันอย่างไร?

> **ผู้เรียน:** แล้วสองคำสั่งนี้ต่างกันอย่างไร?

```bash
git restore --staged README.md
git restore README.md
```

> **ChatGPT:** ต่างกันมาก โดยเฉพาะผลต่อเนื้อหาที่คุณยังไม่ได้ Commit

| คำสั่ง | สิ่งที่เกิดขึ้น | งานที่แก้ไว้ยังอยู่หรือไม่ |
|---|---|---:|
| `git restore --staged README.md` | เอาไฟล์ออกจาก Staging | อยู่ |
| `git restore README.md` | ทิ้งการแก้ไขใน Working Directory แล้วคืนไฟล์ตามแหล่งอ้างอิงของ Git | อาจหาย |

### คำสั่งที่ปลอดภัยกว่าสำหรับการจัด Staging ใหม่

```bash
git restore --staged README.md
```

ภาพจำ:

```text
Staging Area  ──>  Working Directory
                    งานที่แก้ยังอยู่
```

### คำสั่งที่ต้องระวัง

```bash
git restore README.md
```

สำหรับไฟล์ที่ถูกติดตามอยู่ คำสั่งนี้จะทิ้งการแก้ไขที่ยังไม่ได้ Stage ใน Working Directory และคืนเนื้อหาจาก Index งานที่ยังไม่ได้ Commit อาจกู้คืนด้วย Git ไม่ได้

> [!WARNING]
> ก่อนใช้ `git restore <file>` ควรรัน `git diff -- <file>` และอ่านสิ่งที่จะถูกทิ้งให้ครบก่อนเสมอ

---

## ทดลองเปรียบเทียบสองคำสั่ง

### 1. แก้ไข `README.md`

```bash
echo "This line is very important." >> README.md
git diff -- README.md
```

### 2. เพิ่มไฟล์เข้า Staging

```bash
git add README.md
git status
```

ตอนนี้ `README.md` จะอยู่ในหัวข้อ `Changes to be committed`

### 3. เอาไฟล์ออกจาก Staging

```bash
git restore --staged README.md
git status
```

ควรเห็นประมาณนี้:

```text
Changes not staged for commit:
  modified: README.md
```

ตรวจเนื้อหาที่แก้ไว้อีกครั้ง:

```bash
git diff -- README.md
```

ข้อความ `This line is very important.` ยังอยู่ แสดงว่าเราไม่ได้ทำงานหาย

### 4. ทิ้งการแก้ไขใน Working Directory

> [!CAUTION]
> ขั้นตอนนี้ตั้งใจสาธิตการทิ้งงาน อย่าใช้กับไฟล์งานจริงที่ยังต้องการเก็บ

```bash
git restore README.md
git status
```

ข้อความที่เพิ่มไว้จะหายไป เพราะ Git คืน `README.md` ให้ตรงกับเนื้อหาใน Staging Area ซึ่ง ณ จุดนี้ตรงกับ Commit ล่าสุด

> **ผู้เรียน:** สรุปคือมี `--staged` งานยังอยู่ แต่ถ้าไม่มี `--staged` งานที่แก้ไว้อาจหายใช่ไหม?
>
> **ChatGPT:** ใช่ ให้หยุดอ่านคำสั่งทุกครั้งก่อนกด Enter ว่ากำลัง “จัดรายการที่จะ Commit” หรือกำลัง “ทิ้งเนื้อหาในไฟล์”

---

## Step 6: เอาทุกไฟล์ออกจาก Staging

> **ผู้เรียน:** ถ้าเผลอ `git add .` แล้วอยากจัด Staging ใหม่ทั้งหมด ต้องเอาออกทีละไฟล์ไหม?
>
> **ChatGPT:** ไม่จำเป็น ใช้จุด (`.`) เพื่อระบุทุกไฟล์ภายใต้ตำแหน่งปัจจุบันได้

```bash
git restore --staged .
git status
```

ไฟล์ทั้งหมดในขอบเขตปัจจุบันจะออกจาก Staging แต่ไฟล์และการแก้ไขยังอยู่ใน Working Directory

> [!NOTE]
> จุด (`.`) หมายถึง Path ปัจจุบันและสิ่งที่อยู่ภายใต้ Path นั้น ถ้าต้องการครอบคลุมทั้ง Repository ควรรันคำสั่งจากโฟลเดอร์รากของ Repository

---

## สถานการณ์ที่พบบ่อยในงานจริง

สมมติโปรเจกต์ ASP.NET มีไฟล์และโฟลเดอร์เหล่านี้:

```text
Controllers/
Models/
Views/
bin/
obj/
appsettings.Development.json
```

หลังเผลอรัน `git add .` พบว่า Staging มี:

```text
new file: bin/...
new file: obj/...
new file: appsettings.Development.json
modified: Controllers/EmployeeController.cs
```

แต่ต้องการ Commit เฉพาะ Controller ให้เอารายการที่ไม่เกี่ยวข้องออก:

```bash
git restore --staged bin
git restore --staged obj
git restore --staged appsettings.Development.json
git status
git diff --staged
```

เมื่อยืนยันว่าเหลือเฉพาะ `Controllers/EmployeeController.cs` แล้วจึง Commit:

```bash
git commit -m "feat: add employee controller"
```

> **ผู้เรียน:** ถ้าต้องเอา `.env`, `logs/`, `node_modules/`, `bin/` และ `obj/` ออกจาก Staging ทุกครั้ง ดูยุ่งมากเลย
>
> **ChatGPT:** ถูกต้อง วิธีป้องกันระยะยาวคือกำหนดรายการเหล่านี้ใน `.gitignore` เพื่อไม่ให้ Git นำไฟล์เหล่านี้มาเป็นไฟล์ใหม่ตั้งแต่แรก ซึ่งจะเรียนต่อใน Workshop 05

---

## แบบฝึกหัดท้าย Workshop

### โจทย์

สร้างไฟล์จำลอง 3 ไฟล์:

```bash
echo "Temporary debug" > debug.log
echo "API_SECRET=abc123" > .env
echo "console.log('Department');" > department.js
```

จากนั้น:

1. ใช้ `git add .` เพื่อเพิ่มทุกไฟล์เข้า Staging
2. เอา `.env` และ `debug.log` ออกจาก Staging โดยไม่ลบไฟล์
3. ตรวจสอบให้แน่ใจว่า Staging เหลือเฉพาะ `department.js`
4. Commit ด้วยข้อความ `feat: add department module`

ลองทำด้วยตัวเองก่อนเปิดเฉลย

<details>
<summary><strong>ดูเฉลย</strong></summary>

```bash
git add .
git status

git restore --staged .env
git restore --staged debug.log

git status
git diff --staged

git commit -m "feat: add department module"
```

ก่อน Commit หัวข้อ `Changes to be committed` ควรมีเพียง:

```text
new file: department.js
```

</details>

---

## สรุปแบบ ChatGPT

> **ผู้เรียน:** ถ้าจะจำบทนี้ให้ได้ใน 30 วินาที ควรจำอะไรบ้าง?
>
> **ChatGPT:** จำคำสั่ง 3 แบบนี้ให้แม่น:

```bash
git add README.md
```

นำการเปลี่ยนแปลงของ `README.md` เข้า Staging

```bash
git restore --staged README.md
```

นำ `README.md` ออกจาก Staging แต่เก็บการแก้ไขไว้

```bash
git restore README.md
```

ทิ้งการแก้ไขใน Working Directory ของ `README.md` และคืนเนื้อหาจาก Index — ต้องใช้ด้วยความระมัดระวัง

Workflow ที่แนะนำก่อน Commit:

```text
git status
    ↓
git diff --staged
    ↓
ยืนยันว่าไม่มีไฟล์ลับหรือไฟล์ที่ไม่เกี่ยวข้อง
    ↓
git commit
```

## Cheat Sheet

| ต้องการทำอะไร | คำสั่ง |
|---|---|
| ดูสถานะไฟล์ | `git status` |
| นำไฟล์เข้า Staging | `git add <file>` |
| เอาไฟล์เดียวออกจาก Staging | `git restore --staged <file>` |
| เอาทุกไฟล์ในขอบเขตปัจจุบันออกจาก Staging | `git restore --staged .` |
| ดูสิ่งที่ยังไม่ได้ Stage | `git diff` |
| ดูสิ่งที่กำลังจะ Commit | `git diff --staged` |
| ทิ้งการแก้ไขใน Working Directory | `git restore <file>` |

> **Workshop ถัดไป:** Workshop 05 จะใช้ `.gitignore` เพื่อให้ Git มองข้าม `.env`, log, `node_modules/`, `bin/` และ `obj/` ตั้งแต่ต้น
