# Workshop 03: เขียน Commit ให้เป็นระเบียบ

จาก Workshop 02 เราเรียนรู้ Workflow พื้นฐานนี้แล้ว:

```text
แก้ไฟล์
   ↓
git diff
   ↓
git add
   ↓
git diff --staged
   ↓
git commit
```

Workshop นี้จะเพิ่มแนวคิดสำคัญอีกหนึ่งอย่าง:

> **1 Commit = 1 เรื่อง**

เราไม่ควรรวมงานหลายเรื่องที่ไม่เกี่ยวข้องกันไว้ใน Commit เดียว เช่น:

- แก้ระบบ Login
- แก้ CSS
- เพิ่ม Employee
- แก้ README
- ลบไฟล์ Log

หาก Commit ทุกอย่างพร้อมกัน ประวัติจะอ่านยากและย้อนแก้ไขได้ลำบาก

---

## Step 1: ตรวจสอบ Repository ก่อนเริ่ม

เข้าไปยังโปรเจกต์เดิม:

```bash
cd git-workshop
```

ตรวจสอบสถานะ:

```bash
git status
```

ก่อนเริ่ม Workshop ควรเห็นข้อความประมาณนี้:

```text
nothing to commit, working tree clean
```

จากนั้นดูประวัติ Commit:

```bash
git log --oneline
```

ตัวอย่างผลลัพธ์:

```text
c82ab34 docs: add diff reminder
36b1ec2 docs: add git diff note
762d81f docs: add learning note
aa71fd3 docs: update workshop description
65c71be docs: add README
```

ข้อความด้านหน้าแต่ละรายการ เช่น `c82ab34` คือ **Commit Hash** ซึ่งเปรียบเสมือน ID ของ Commit นั้น

---

## Step 2: ทำไม Commit Message จึงสำคัญ

ลองดูประวัติที่ใช้ข้อความกว้างเกินไป:

```text
a31d44a update
5a72e11 fix
f91a821 edit
ab7121e test
```

เมื่อเวลาผ่านไป เราแทบจะไม่รู้เลยว่าแต่ละ Commit เปลี่ยนแปลงอะไร

เปรียบเทียบกับประวัติต่อไปนี้:

```text
a31d44a feat: add employee search
5a72e11 fix: validate duplicate employee code
f91a821 refactor: simplify employee service
ab7121e docs: update installation guide
```

แบบที่สองช่วยให้เข้าใจสิ่งที่เกิดขึ้นได้ทันทีจาก `git log` โดยไม่ต้องเปิดดูรายละเอียดทุก Commit

---

## Step 3: รู้จัก Conventional Commits เบื้องต้น

รูปแบบ Commit Message ที่นิยมใช้คือ:

```text
type: description
```

ตัวอย่าง:

```text
feat: add employee search
fix: resolve login redirect issue
docs: update README
refactor: simplify booking service
chore: update dependencies
```

### Type ที่ควรรู้

| Type | ใช้เมื่อ |
| --- | --- |
| `feat` | เพิ่ม Feature ใหม่ |
| `fix` | แก้ไข Bug |
| `docs` | แก้ไขเอกสารหรือ README |
| `refactor` | ปรับโครงสร้าง Code โดย Behavior หลักยังเหมือนเดิม |
| `chore` | งานประกอบ เช่น Config, Dependency หรือ Tooling |

> หลักจำง่าย ๆ: เขียน `type` ตามด้วยคำอธิบายสั้น ๆ ว่าทำอะไร

---

## Step 4: ทดลองสร้าง Feature

สร้างไฟล์ `employee.js`:

```bash
echo "console.log('Employee service');" > employee.js
```

ตรวจสอบสถานะ:

```bash
git status
```

จะเห็นไฟล์ใหม่ในกลุ่ม Untracked:

```text
Untracked files:
  employee.js
```

ลองดูความเปลี่ยนแปลง:

```bash
git diff
```

คำสั่งนี้อาจยังไม่แสดงเนื้อหาของ `employee.js` เพราะ `git diff` ปกติไม่แสดงเนื้อหาของไฟล์ Untracked

เพิ่มไฟล์เข้า Staging Area:

```bash
git add employee.js
```

ตรวจสอบสิ่งที่เตรียมจะ Commit:

```bash
git diff --staged
```

คราวนี้ Git จะแสดงว่า `employee.js` เป็นไฟล์ใหม่ จากนั้นให้สร้าง Commit:

```bash
git commit -m "feat: add employee service"
```

---

## Step 5: จำลองการแก้ Bug

แก้เนื้อหาใน `employee.js` เป็น:

```javascript
function getEmployee() {
    return "Employee found";
}

console.log(getEmployee());
```

ตรวจสอบสิ่งที่แก้ไข:

```bash
git diff
```

นำไฟล์เข้า Staging Area และตรวจสอบอีกครั้ง:

```bash
git add employee.js
git diff --staged
```

จากนั้นสร้าง Commit:

```bash
git commit -m "fix: return employee result"
```

ลองดูประวัติ:

```bash
git log --oneline
```

จะเห็นผลลัพธ์ประมาณนี้:

```text
bd821af fix: return employee result
a712be2 feat: add employee service
...
```

Git History เริ่มกลายเป็น Timeline ที่อธิบายพัฒนาการของโปรเจกต์ได้ชัดเจน

---

## Step 6: เพิ่ม Documentation

เพิ่มข้อความลงใน `README.md`:

```bash
echo "Employee service added." >> README.md
```

ตรวจสอบความเปลี่ยนแปลง:

```bash
git diff
```

จากนั้นเพิ่มไฟล์และสร้าง Commit:

```bash
git add README.md
git commit -m "docs: document employee service"
```

ตอนนี้เรามีสาม Commits ที่แยกตามเรื่องอย่างชัดเจน:

```text
docs: document employee service
fix: return employee result
feat: add employee service
```

รูปแบบนี้มีประโยชน์กว่า Commit เดียวที่เขียนเพียงว่า `update project`

---

## Step 7: ทำไมต้องแยก Commit

สมมติว่า Commit ต่อไปนี้มีปัญหา:

```text
742ad91 fix: return employee result
```

เราสามารถดูรายละเอียดของ Commit นั้นได้โดยตรง:

```bash
git show 742ad91
```

เมื่อหนึ่ง Commit มีเพียงหนึ่งการเปลี่ยนแปลงเชิงตรรกะ เราจะตรวจสอบ ย้อนกลับ หรือแก้ปัญหาเฉพาะส่วนนั้นได้ง่ายขึ้น

> **1 Commit = 1 Logical Change**

---

## Step 8: Commit หลายไฟล์อย่างถูกวิธี

สร้างไฟล์ `department.js`:

```bash
echo "console.log('Department service');" > department.js
```

เพิ่มข้อความลงใน `README.md`:

```bash
echo "Department module coming soon." >> README.md
```

ตรวจสอบสถานะ:

```bash
git status
```

ตอนนี้มีความเปลี่ยนแปลงสองเรื่อง:

- `department.js` เป็น Feature ใหม่
- `README.md` เป็นการแก้ Documentation

เราไม่จำเป็นต้องใช้ `git add .` ทุกครั้ง หากต้องการ Commit Feature ก่อน ให้เลือกเพิ่มเฉพาะไฟล์:

```bash
git add department.js
git commit -m "feat: add department service"
```

ตรวจสอบสถานะอีกครั้ง:

```bash
git status
```

จะพบว่าความเปลี่ยนแปลงใน `README.md` ยังเหลืออยู่ จากนั้นจึงสร้าง Commit แยกสำหรับเอกสาร:

```bash
git add README.md
git commit -m "docs: add department note"
```

นี่คือการสร้าง Commit ที่สะอาดและแยกเรื่องชัดเจน

### ใช้ `git add .` ผิดไหม?

ไม่ผิด คำสั่งนี้สามารถใช้ได้ตามปกติ:

```bash
git add .
```

แต่คำสั่งนี้จะนำทุกความเปลี่ยนแปลงภายใต้โฟลเดอร์ปัจจุบันเข้า Staging Area หากไม่ตรวจสอบก่อน อาจเผลอเพิ่มไฟล์ที่ไม่ควร Commit เช่น:

- `.env`
- ไฟล์ Log
- ไฟล์ Debug
- Config ส่วนตัว
- งานที่ยังทำไม่เสร็จ

Workflow ที่ควรฝึกให้เป็นนิสัยคือ:

```bash
git status
git diff

git add <file>

git diff --staged

git commit -m "type: description"
```

---

## Step 9: Commit Message ที่ควรหลีกเลี่ยง

หลีกเลี่ยงข้อความที่กว้างและไม่อธิบายสิ่งที่ทำ เช่น:

```text
update
fix
test
edit
final
final2
new
done
แก้
ล่าสุด
```

ตัวอย่างการปรับให้ชัดเจนขึ้น:

| หลีกเลี่ยง | ควรใช้ |
| --- | --- |
| `fix` | `fix: validate empty employee code` |
| `update` | `feat: add employee search` |
| `edit README` | `docs: add installation instructions` |

---

## Step 10: Commit Message ไม่จำเป็นต้องยาว

ไม่จำเป็นต้องเขียนยาวแบบนี้:

```text
feat: I have added a new function that will allow users to search employees using employee ID
```

เขียนให้สั้นและตรงประเด็นได้ว่า:

```text
feat: add employee search
```

หลักง่าย ๆ คือ:

```text
type + สิ่งที่ทำ
```

---

## Workshop Challenge

### 1. สร้าง Login Feature

สร้างไฟล์ `login.js` และเพิ่ม Code ต่อไปนี้:

```javascript
function login(username) {
    return `Welcome ${username}`;
}
```

เพิ่มไฟล์และสร้าง Commit:

```bash
git add login.js
git commit -m "feat: add login function"
```

### 2. เพิ่มการตรวจสอบ Username

แก้ `login.js` เป็น:

```javascript
function login(username) {
    if (!username) {
        return "Username is required";
    }

    return `Welcome ${username}`;
}
```

ตรวจสอบความเปลี่ยนแปลง:

```bash
git diff
```

จากนั้นเพิ่มไฟล์และสร้าง Commit:

```bash
git add login.js
git commit -m "fix: validate empty username"
```

### 3. เพิ่ม Documentation

เพิ่มข้อความลงใน `README.md`:

```bash
echo "Login function supports username validation." >> README.md
```

สร้าง Commit แยกสำหรับเอกสาร:

```bash
git add README.md
git commit -m "docs: document login validation"
```

สุดท้ายให้ดูประวัติ:

```bash
git log --oneline
```

ควรเห็นผลลัพธ์ประมาณนี้:

```text
9a82b12 docs: document login validation
123daf1 fix: validate empty username
721bc82 feat: add login function
...
```

นี่คือ Git History ที่เริ่มมีคุณภาพ เพราะแต่ละ Commit บอกได้อย่างชัดเจนว่าเกิดอะไรขึ้น

---

## สรุป Workshop 03

`git commit` ไม่ใช่เพียงการกด Save แต่คือการสร้างประวัติของโปรเจกต์

ตัวอย่าง Commit Message ที่ดี:

```text
feat: add employee API
fix: prevent duplicate employee
docs: update API documentation
refactor: simplify employee query
```

ก่อน Commit ควรทำตาม Workflow นี้:

```bash
git status
git diff
git add <file>
git diff --staged
git commit -m "type: description"
```

แนวคิดสำคัญที่สุดของบทนี้คือ:

> **1 Commit = 1 เรื่อง**

บทถัดไปคือ **Workshop 04: การนำไฟล์ออกจาก Staging Area** เราจะเรียนรู้วิธีแก้สถานการณ์ที่ใช้ `git add .` แล้วพบว่ามีบางไฟล์ไม่ควรอยู่ใน Commit โดยใช้ `git restore --staged` โดยไม่ทำให้ไฟล์งานหาย
