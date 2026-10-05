# Workshop 05: ใช้ `.gitignore` ป้องกันไฟล์ที่ไม่ควรเข้า Git

Workshop นี้ต่อจากปัญหาใน Workshop 04: หลังรัน `git add .` เราพบว่าไฟล์ที่ไม่ควร Commit เช่น `.env`, log และ Build Output ถูกเพิ่มเข้า Staging ไปด้วย

แทนที่จะคอยใช้ `git restore --staged` ทุกครั้ง เราจะกำหนดกติกาให้ Git มองข้ามไฟล์เหล่านั้นตั้งแต่ต้นด้วย `.gitignore`

หลังจบบทนี้ คุณจะสามารถ:

- สร้างและเขียนกฎใน `.gitignore`
- Ignore ไฟล์ตามชื่อ นามสกุล และโฟลเดอร์
- ยกเว้นไฟล์บางรายการด้วยเครื่องหมาย `!`
- ตรวจสอบว่าไฟล์ถูก Ignore ด้วยกฎใด
- หยุด Track ไฟล์ที่เคยถูกเพิ่มเข้า Git แล้ว
- รับมืออย่างถูกต้องเมื่อ Secret เคยถูก Push ขึ้น Remote

> [!IMPORTANT]
> `.gitignore` ไม่ได้ลบไฟล์ และไม่ได้ซ่อนไฟล์ที่ Git ติดตามอยู่แล้วโดยอัตโนมัติ

---

## ปัญหาที่ `.gitignore` ช่วยแก้

> **ผู้เรียน:** ใน Workshop ก่อน ผมเผลอใช้ `git add .` แล้ว `.env`, log, `node_modules/`, `bin/` และ `obj/` ติดเข้า Staging ต้องคอยเอาออกทุกครั้งเลยหรือ?
>
> **ChatGPT:** ไม่ต้อง เราสามารถสร้าง `.gitignore` เพื่อบอก Git ว่าไฟล์หรือโฟลเดอร์ใดไม่ควรถูกนำมาติดตาม

ตัวอย่างไฟล์ที่มักไม่ควร Commit:

| ประเภท | ตัวอย่าง | เหตุผล |
|---|---|---|
| Secret และค่าของเครื่อง | `.env`, `config.local.json` | อาจมีรหัสผ่านหรือ API Key |
| Dependency ที่ติดตั้งใหม่ได้ | `node_modules/` | มีขนาดใหญ่และสร้างใหม่ได้ |
| Build Output | `dist/`, `bin/`, `obj/` | เกิดจากกระบวนการ Build |
| Log และไฟล์ชั่วคราว | `*.log`, `*.tmp` | เปลี่ยนบ่อยและไม่ใช่ Source Code |
| การตั้งค่าเฉพาะ IDE | `.vs/`, `*.user` | แตกต่างกันในแต่ละเครื่อง |

ภาพจำของ `.gitignore`:

```text
ไฟล์ที่ยังไม่ถูก Track
        ↓
Git ตรวจสอบกฎใน .gitignore
        ↓
ตรงกับกฎ ──> Git มองข้าม
ไม่ตรงกฎ ──> แสดงใน git status และเพิ่มด้วย git add ได้
```

---

## ก่อนเริ่ม Workshop

> **ChatGPT:** เข้าไปที่ Repository เดิมและตรวจสอบสถานะก่อน

```bash
cd git-workshop
git status
```

ถ้ามีไฟล์จาก Workshop ก่อนหน้าค้างอยู่ ให้ดูว่าไฟล์เหล่านั้นคืออะไรและอยู่ในสถานะใดก่อนทำต่อ

> [!WARNING]
> อย่าใช้ `git add .` ทันทีโดยไม่อ่าน `git status` เพราะอาจนำไฟล์ลับหรืองานที่ไม่เกี่ยวข้องเข้า Staging

---

## Step 1: สร้างไฟล์ที่ไม่ควร Commit

สร้างไฟล์และโฟลเดอร์สำหรับทดลอง:

```bash
echo "DB_PASSWORD=123456" > .env
echo "Application started" > app.log
mkdir logs
echo "Error log" > logs/error.log
```

ตรวจสอบสถานะ:

```bash
git status
```

Git ควรมองเห็นรายการประมาณนี้:

```text
Untracked files:
  .env
  app.log
  logs/
```

> **ผู้เรียน:** ทำไม `logs/error.log` ไม่แสดงแยกเป็นอีกบรรทัด?
>
> **ChatGPT:** โดยปกติ `git status` จะย่อไฟล์ที่ยังไม่ถูก Track ภายในโฟลเดอร์เป็นชื่อโฟลเดอร์ เช่น `logs/` แต่ Git ยังมองเห็นไฟล์ข้างในอยู่

---

## Step 2: สร้าง `.gitignore`

สร้างไฟล์ `.gitignore` และเพิ่มกฎ:

```bash
echo ".env" > .gitignore
echo "*.log" >> .gitignore
echo "logs/" >> .gitignore
```

เนื้อหาใน `.gitignore` ควรเป็น:

```gitignore
.env
*.log
logs/
```

ตรวจสอบอีกครั้ง:

```bash
git status
```

ตอนนี้ควรเห็นเฉพาะ `.gitignore` เป็นไฟล์ใหม่ ส่วน `.env`, `app.log` และ `logs/error.log` จะไม่แสดงเป็น Untracked

> **ผู้เรียน:** ไฟล์เหล่านั้นถูกลบไปแล้วหรือ?
>
> **ChatGPT:** ไม่ถูกลบ ไฟล์ยังอยู่บนเครื่อง เพียงแต่ Git ไม่นำมาแสดงและไม่เพิ่มไฟล์เหล่านั้นด้วย `git add .`

---

## อ่านกฎใน `.gitignore`

### Ignore ไฟล์ตามชื่อ

```gitignore
.env
config.local.json
```

ใช้เมื่อทราบชื่อไฟล์ที่ต้องการ Ignore แน่นอน

### Ignore ไฟล์ตามนามสกุล

```gitignore
*.log
*.tmp
*.bak
```

เครื่องหมาย `*` แทนข้อความใด ๆ ดังนั้น `*.log` จะตรงกับ `app.log`, `error.log` และ `debug.log`

### Ignore ทั้งโฟลเดอร์

```gitignore
node_modules/
logs/
dist/
```

เครื่องหมาย `/` ท้ายชื่อช่วยสื่อให้ชัดเจนว่ากฎนี้ใช้กับโฟลเดอร์

### เขียน Comment และเว้นบรรทัด

```gitignore
# Environment variables
.env

# Generated logs
*.log
logs/
```

- บรรทัดที่เริ่มด้วย `#` คือ Comment
- บรรทัดว่างใช้แบ่งกลุ่มกฎให้อ่านง่าย

### Ignore ทุกอย่าง แต่เก็บบางไฟล์

```gitignore
logs/*
!logs/.gitkeep
```

ความหมายคือ:

1. Ignore ทุกอย่างภายใน `logs/`
2. ยกเว้น `logs/.gitkeep` ด้วยเครื่องหมาย `!`

รูปแบบนี้มีประโยชน์เมื่อต้องการเก็บโครงสร้างโฟลเดอร์ว่างไว้ใน Git

> [!NOTE]
> Git ไม่ได้ Track โฟลเดอร์โดยตรง แต่ Track ไฟล์ภายในโฟลเดอร์ ชื่อ `.gitkeep` เป็นเพียงธรรมเนียมที่นิยมใช้ ไม่ใช่คำสั่งพิเศษของ Git

---

## Step 3: Commit `.gitignore`

> **ผู้เรียน:** ตัว `.gitignore` เองต้อง Commit หรือไม่?
>
> **ChatGPT:** ควร Commit เพื่อให้ทุกคนที่ Clone โปรเจกต์ใช้กฎชุดเดียวกัน

ตรวจสอบและ Commit:

```bash
git status
git add .gitignore
git diff --staged
git commit -m "chore: add gitignore"
```

คำว่า `chore` เหมาะกับงานดูแลโครงสร้างหรือเครื่องมือของโปรเจกต์ที่ไม่ได้เพิ่ม Feature โดยตรง

---

## Step 4: ทดสอบด้วย `git add .`

ทดลองเพิ่มทุกไฟล์:

```bash
git add .
git status
```

`.env`, ไฟล์ที่ลงท้ายด้วย `.log` และไฟล์ภายใน `logs/` ไม่ควรเข้า Staging

> **ChatGPT:** นี่คือประโยชน์หลักของ `.gitignore` — ป้องกันความผิดพลาดตั้งแต่ก่อนสร้าง Commit

---

## ตรวจสอบว่าไฟล์ถูก Ignore เพราะกฎใด

> **ผู้เรียน:** ถ้ามีกฎหลายบรรทัด จะรู้ได้อย่างไรว่า `.env` ถูก Ignore เพราะกฎไหน?
>
> **ChatGPT:** ใช้ `git check-ignore` พร้อมตัวเลือก `-v`

```bash
git check-ignore -v .env
```

ผลลัพธ์อาจเป็น:

```text
.gitignore:1:.env    .env
```

แปลว่า `.env` ถูก Ignore ด้วยกฎ `.env` ที่บรรทัด 1 ของไฟล์ `.gitignore`

ตรวจหลายไฟล์พร้อมกันได้เช่นกัน:

```bash
git check-ignore -v .env app.log logs/error.log
```

ถ้าคำสั่งไม่แสดงผลสำหรับไฟล์ใด โดยทั่วไปหมายความว่าไฟล์นั้นไม่ตรงกับกฎ Ignore ที่ Git ตรวจพบ

---

## ตัวอย่าง `.gitignore` ตามประเภทโปรเจกต์

ตัวอย่างเหล่านี้เป็นจุดเริ่มต้น ควรปรับให้ตรงกับเครื่องมือและข้อตกลงของทีม

### Node.js หรือ Express

```gitignore
node_modules/
dist/
coverage/
logs/
*.log

.env
.env.*
!.env.example
```

กฎ `.env.*` จะตรงกับไฟล์อย่าง `.env.local` และ `.env.production` รวมถึง `.env.example` ด้วย จึงต้องใช้ `!.env.example` หากต้องการเก็บไฟล์ตัวอย่าง

ตัวอย่าง `.env.example` ควรมีเฉพาะชื่อ Variable และค่าตัวอย่างที่ไม่ใช่ Secret:

```dotenv
DATABASE_URL=
PORT=3000
JWT_SECRET=
```

### ASP.NET Core

```gitignore
bin/
obj/
.vs/
*.user
*.suo
appsettings.Development.json
```

ก่อน Ignore `appsettings.Development.json` ควรตรวจข้อตกลงของทีม บางโปรเจกต์อาจ Commit ไฟล์นี้โดยเก็บเฉพาะค่าที่ไม่ลับ แล้วใช้ Environment Variables, .NET User Secrets หรือ Secret Manager สำหรับข้อมูลลับ

### React หรือ Vite

```gitignore
node_modules/
dist/
coverage/
*.log
.env
.env.local
```

`dist/` มักเป็นผลลัพธ์จากการ Build และสามารถสร้างใหม่ได้

### Classic ASP

```gitignore
logs/
uploads/
temp/
*.bak
*.old
connect.local.asp
```

หากเดิมมี Connection String ใน `connect.asp` อาจแยกเป็น:

- `connect.example.asp` สำหรับโครงสร้างที่ Commit ได้
- `connect.local.asp` สำหรับค่าจริงบนแต่ละเครื่องและกำหนดให้ Ignore

---

## จุดสำคัญ: `.gitignore` ไม่หยุด Track ไฟล์เดิม

> **ผู้เรียน:** ผมเพิ่ม `.env` ลง `.gitignore` แล้ว แต่ `git status` ยังแสดงว่า `.env` ถูกแก้ไข ทำไม Git ไม่ Ignore?
>
> **ChatGPT:** เพราะ `.env` เคยถูก Track มาก่อนแล้ว `.gitignore` มีผลหลักกับไฟล์ที่ยังไม่ถูก Track เท่านั้น

ทดลองด้วยไฟล์ที่ไม่มีข้อมูลลับจริง:

```bash
echo "DEMO_VALUE=123" > tracked-demo.txt
git add tracked-demo.txt
git commit -m "test: add tracked demo file"
```

เพิ่มกฎนี้ใน `.gitignore`:

```gitignore
tracked-demo.txt
```

จากนั้นแก้ไฟล์:

```bash
echo "DEMO_VALUE=456" > tracked-demo.txt
git status
```

Git จะยังแสดง `modified: tracked-demo.txt` เพราะไฟล์นี้อยู่ในประวัติและ Index ของ Git แล้ว

---

## ทำให้ Git หยุด Track แต่เก็บไฟล์ไว้บนเครื่อง

ใช้คำสั่ง:

```bash
git rm --cached tracked-demo.txt
```

ความหมายของ `--cached` คือเอาไฟล์ออกจาก Index ของ Git แต่ไม่ลบไฟล์ใน Working Directory

จากนั้นตรวจสอบและ Commit การเปลี่ยนแปลง:

```bash
git status
git add .gitignore
git diff --staged
git commit -m "chore: stop tracking demo file"
```

> [!WARNING]
> ใน `git status` ไฟล์อาจแสดงเป็น `deleted` ในส่วนที่จะ Commit นี่หมายถึงไฟล์จะถูกนำออกจาก Repository ใน Commit ถัดไป ไม่ได้หมายความว่าไฟล์บนเครื่องถูกลบทันทีเมื่อใช้ `--cached`

### ตัวอย่างกับ `.env` ที่เคยถูก Track

เพิ่ม `.env` ลง `.gitignore` ก่อน แล้วรัน:

```bash
git rm --cached .env
git add .gitignore
git status
git diff --staged
git commit -m "chore: stop tracking env file"
```

หลัง Commit แล้ว `.env` ยังอยู่บนเครื่อง แต่ Git จะไม่ติดตามการเปลี่ยนแปลงของไฟล์นี้ต่อไป

### หยุด Track ไฟล์จำนวนมากตามกฎใหม่

บางครั้งโปรเจกต์มีไฟล์ที่ถูก Track แล้วจำนวนมาก วิธีที่ปลอดภัยกว่าคือระบุ Path ที่ต้องการให้ชัดเจน เช่น:

```bash
git rm -r --cached node_modules
```

ตรวจสอบ `git status` และ `git diff --staged` ทุกครั้งก่อน Commit

> [!CAUTION]
> หลีกเลี่ยงการคัดลอกคำสั่งที่ล้าง Index ทั้ง Repository โดยไม่เข้าใจผลกระทบ เพราะอาจ Stage การเปลี่ยนแปลงจำนวนมากที่ไม่เกี่ยวข้อง

---

## ถ้า Secret เคยถูก Push ขึ้น Remote แล้ว

> **ผู้เรียน:** ถ้าผมเคย Commit และ Push รหัสผ่านหรือ API Key ไปแล้ว การใช้ `git rm --cached` ทำให้ปลอดภัยหรือยัง?
>
> **ChatGPT:** ยังไม่ปลอดภัย เพราะ Secret อาจยังอยู่ใน Commit เก่า, Git History, Remote Repository, Fork หรือเครื่องของผู้ร่วมงาน

ให้ถือว่า Secret นั้นรั่วแล้ว และดำเนินการตามลำดับนี้:

1. **ยกเลิกหรือหมุนเวียน Secret ทันที** เช่น เปลี่ยนรหัสผ่าน, Revoke Token หรือ Rotate API Key
2. นำไฟล์ออกจากการ Track และเพิ่มกฎใน `.gitignore`
3. แจ้งผู้ดูแลระบบหรือทีม Security ตามกระบวนการขององค์กร
4. หากจำเป็น ให้ทีมวางแผนลบข้อมูลจาก Git History และประสานผู้ที่มี Clone หรือ Fork
5. ตรวจ Log การใช้งานเพื่อค้นหาการเข้าถึงที่ผิดปกติ

> [!CAUTION]
> การแก้ Git History เป็นงานที่กระทบผู้ร่วมงานและ Remote Repository ไม่ควรทำโดยลำพังใน Repository ที่ใช้ร่วมกัน และไม่สามารถทดแทนการ Rotate Secret ได้

---

## Workshop Challenge

### โจทย์

สร้างไฟล์สำหรับทดลอง:

```bash
echo "PORT=3000" > .env
echo "debug message" > debug.log
mkdir temp
echo "test" > temp/test.txt
echo "console.log('Hello');" > app.js
```

สร้าง `.gitignore` ให้ Ignore:

- `.env`
- ไฟล์ทุกไฟล์ที่ลงท้ายด้วย `.log`
- โฟลเดอร์ `temp/`

จากนั้น:

1. ตรวจสอบด้วย `git status`
2. ตรวจว่าแต่ละไฟล์ถูก Ignore เพราะกฎใด
3. ใช้ `git add .`
4. ตรวจสอบ Staging ก่อน Commit
5. Commit เฉพาะ `.gitignore` และ `app.js`

ลองทำด้วยตัวเองก่อนเปิดเฉลย

<details>
<summary><strong>ดูเฉลย</strong></summary>

สร้าง `.gitignore`:

```bash
echo ".env" > .gitignore
echo "*.log" >> .gitignore
echo "temp/" >> .gitignore
```

ตรวจสอบกฎ:

```bash
git status
git check-ignore -v .env debug.log temp/test.txt
```

เพิ่มไฟล์และตรวจสอบ Staging:

```bash
git add .
git status
git diff --staged
```

ใน Staging ควรมีเฉพาะ:

```text
.gitignore
app.js
```

เมื่อยืนยันว่าไม่มี `.env`, `debug.log` หรือ `temp/test.txt` จึง Commit:

```bash
git commit -m "feat: add application entry point"
```

</details>

---

## สรุปแบบ ChatGPT

> **ผู้เรียน:** ถ้าจะจำ Workshop นี้ให้ได้ใน 30 วินาที ควรจำอะไร?
>
> **ChatGPT:** จำ 4 เรื่องนี้ให้แม่น

### 1. `.gitignore` บอก Git ว่าไฟล์ใหม่ใดไม่ต้อง Track

```gitignore
.env
node_modules/
logs/
*.log
bin/
obj/
```

### 2. `.gitignore` ไม่ได้ลบไฟล์

ไฟล์ยังอยู่บนเครื่อง เพียงแต่ Git มองข้ามตามกฎที่กำหนด

### 3. `.gitignore` ไม่หยุด Track ไฟล์ที่เคย Track แล้ว

ถ้าต้องการเก็บไฟล์บนเครื่องแต่เอาออกจาก Git ใช้:

```bash
git rm --cached <file>
```

### 4. Secret ที่เคย Push ต้อง Rotate ทันที

การลบไฟล์หรือเพิ่ม `.gitignore` ไม่ได้ทำให้ Secret หายจาก Git History

Workflow ที่ควรฝึกให้เป็นนิสัย:

```text
สร้างโปรเจกต์
    ↓
สร้าง .gitignore
    ↓
git status
    ↓
git add เฉพาะสิ่งที่ต้องการ
    ↓
git diff --staged
    ↓
git commit
```

## Cheat Sheet

| ต้องการทำอะไร | วิธีใช้ |
|---|---|
| Ignore ไฟล์เฉพาะชื่อ | `.env` |
| Ignore ตามนามสกุล | `*.log` |
| Ignore โฟลเดอร์ | `node_modules/` |
| ยกเว้นไฟล์จากกฎ Ignore | `!logs/.gitkeep` |
| ตรวจว่าไฟล์ถูก Ignore เพราะกฎใด | `git check-ignore -v <file>` |
| หยุด Track แต่เก็บไฟล์บนเครื่อง | `git rm --cached <file>` |
| ตรวจสถานะ | `git status` |
| ตรวจสิ่งที่จะ Commit | `git diff --staged` |

> **Workshop ถัดไป:** Workshop 06 จะเปรียบเทียบ `restore`, `reset` และ `revert` ว่าแต่ละคำสั่งย้อนการเปลี่ยนแปลงอย่างไร และควรใช้เมื่อใดเพื่อไม่ให้ Git History เสียหาย
