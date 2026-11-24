# Workshop 09: Git Stash

> เก็บงานที่ยังไม่พร้อม commit ไว้ชั่วคราว เพื่อสลับไปทำงานอื่น แล้วค่อยกลับมาทำต่อ

บทนี้นำไปใช้จริงบ่อยมาก โดยเฉพาะสถานการณ์แบบนี้:

```text
กำลังทำ Feature อยู่
        ↓
แก้ไฟล์ไปหลายจุด
        ↓
ยังไม่พร้อม Commit
        ↓
แต่ต้องสลับ Branch ไปแก้ Bug ด่วน
```

ถ้า commit งานที่ยังไม่เสร็จเพียงเพื่อเปลี่ยน branch ประวัติของโปรเจกต์ก็อาจไม่เรียบร้อย ตรงนี้ `git stash` ช่วยได้

---

## แนวคิดหลัก

```text
Working Directory มีงานค้างอยู่
              ↓
          git stash
              ↓
      เก็บงานไว้ชั่วคราว
              ↓
Working Directory กลับมาสะอาด
```

จากนั้นเราไปทำอย่างอื่นได้ เมื่อกลับมาก็เรียกงานเดิมคืนด้วย:

```bash
git stash pop
```

---

## Step 1: เตรียม Repository

เข้า repository เดิม:

```bash
cd git-workshop
```

ตรวจสอบสถานะ:

```bash
git status
```

ควรพยายามให้ Working Directory สะอาด:

```text
nothing to commit, working tree clean
```

จากนั้นตรวจสอบ branch ปัจจุบัน:

```bash
git branch
```

---

## Step 2: สร้าง Feature Branch

เราจะจำลองว่ากำลังพัฒนาหน้า Employee Report:

```bash
git switch -c feature/employee-report
```

สร้างไฟล์ `employee-report.js` แล้วใส่โค้ด:

```javascript
function generateEmployeeReport() {
    return "Generating employee report...";
}
```

ตอนนี้ยังไม่ต้อง commit ให้ตรวจสอบสถานะก่อน:

```bash
git status
```

จะเห็นไฟล์ใหม่ที่ Git ยังไม่ได้ track:

```text
Untracked files:
  employee-report.js
```

---

## Step 3: ทดลองใช้ `git stash`

ลอง stash งานแล้วตรวจสอบสถานะ:

```bash
git stash
git status
```

อาจสงสัยว่า **ทำไม `employee-report.js` ยังอยู่?**

เพราะโดยค่าเริ่มต้น `git stash` จะเก็บการแก้ไขของไฟล์ที่ Git track อยู่แล้ว แต่จะไม่เก็บไฟล์ที่เป็น untracked

ไฟล์นี้เพิ่งถูกสร้าง จึงยังมีสถานะเป็น untracked

---

## Step 4: Stash รวม Untracked Files

ใช้ option `-u` เพื่อรวมไฟล์ untracked:

```bash
git stash -u
```

`-u` ย่อมาจาก `--include-untracked`

ตรวจสอบสถานะอีกครั้ง:

```bash
git status
```

คราวนี้ควรเห็น:

```text
nothing to commit, working tree clean
```

ไฟล์ `employee-report.js` จะหายไปจาก Working Directory ชั่วคราว

> [!NOTE]
> ไม่ต้องตกใจ ไฟล์ไม่ได้ถูกลบถาวร แต่ถูกเก็บไว้ใน stash

---

## Step 5: ดูรายการ Stash

ใช้คำสั่ง:

```bash
git stash list
```

ตัวอย่างผลลัพธ์:

```text
stash@{0}: WIP on feature/employee-report: ...
```

`stash@{0}` คือ stash ล่าสุด หากมีหลายรายการอาจเห็นแบบนี้:

```text
stash@{0}: WIP on feature/employee-report
stash@{1}: WIP on feature/login
stash@{2}: WIP on feature/search
```

> เลขยิ่งน้อย รายการยิ่งใหม่

---

## Step 6: ไปแก้ Bug ด่วน

สมมติได้รับแจ้งว่า Login มี bug ตอนนี้ Working Directory สะอาดแล้ว จึงเปลี่ยน branch ได้:

```bash
git switch main
git switch -c hotfix/login-error
```

สมมติว่าแก้ไฟล์ `login.js` แล้ว ให้ commit งาน:

```bash
git add login.js
git commit -m "hotfix: fix login error"
```

รวม hotfix กลับเข้า `main`:

```bash
git switch main
git merge hotfix/login-error
```

ลบ branch ที่ใช้งานเสร็จแล้ว:

```bash
git branch -d hotfix/login-error
```

งานด่วนเสร็จเรียบร้อย

---

## Step 7: กลับไปทำ Feature เดิม

กลับไปยัง feature branch:

```bash
git switch feature/employee-report
git status
```

Working Directory ยังสะอาด เพราะงานที่ค้างถูก stash ไว้ ตรวจสอบได้ด้วย:

```bash
git stash list
```

stash เดิมควรยังอยู่

---

## Step 8: นำงานกลับด้วย `git stash pop`

เรียกงานเดิมกลับมา:

```bash
git stash pop
```

ตอนนี้ `employee-report.js` จะกลับมา ตรวจสอบด้วย:

```bash
git status
```

ควรเห็น:

```text
Untracked files:
  employee-report.js
```

เมื่อเปิดไฟล์ก็จะพบโค้ดเดิม

### `stash pop` ทำอะไรบ้าง?

`git stash pop` ทำงานสองอย่าง:

1. นำงานจาก stash กลับมา
2. หากสำเร็จ ให้ลบ stash รายการนั้นออก

ลองตรวจสอบรายการอีกครั้ง:

```bash
git stash list
```

stash ที่ pop สำเร็จแล้วจะหายไป

### `git stash apply` ต่างจาก `pop` อย่างไร?

| คำสั่ง | นำงานกลับ | ลบ stash เมื่อสำเร็จ |
|---|:---:|:---:|
| `git stash apply` | ✅ | ❌ |
| `git stash pop` | ✅ | ✅ |

หากยังไม่มั่นใจ แนะนำให้ใช้:

```bash
git stash apply
```

ตรวจสอบงานให้เรียบร้อย แล้วค่อยลบ stash ด้วย:

```bash
git stash drop
```

วิธีนี้ปลอดภัยกว่าเล็กน้อย เพราะ stash จะยังอยู่จนกว่าเราจะสั่งลบเอง

---

## Step 9: Stash แบบมีชื่อ

แทนที่จะใช้เพียง:

```bash
git stash
```

สามารถตั้งชื่อให้ stash ได้:

```bash
git stash push -m "employee report in progress"
```

หากมีไฟล์ untracked ให้เพิ่ม `-u`:

```bash
git stash push -u -m "employee report in progress"
```

ตรวจสอบรายการ:

```bash
git stash list
```

ผลลัพธ์จะอ่านง่ายขึ้น:

```text
stash@{0}: On feature/employee-report: employee report in progress
```

เหมาะมากเมื่อมีหลาย stash และต้องการจำว่าแต่ละรายการเก็บงานอะไรไว้

---

## Step 10: Stash เฉพาะไฟล์ที่ Track แล้ว

สมมติ `README.md` ถูก track อยู่แล้ว ให้แก้ไขไฟล์:

```bash
echo "Employee report is under development." >> README.md
```

ตรวจสอบสถานะ:

```bash
git status
```

จะเห็น:

```text
modified: README.md
```

ใช้คำสั่ง:

```bash
git stash
```

ครั้งนี้ Git เก็บการแก้ไขได้ทันที เพราะ `README.md` เป็น tracked file จากนั้นตรวจสอบอีกครั้ง:

```bash
git status
```

Working Directory ควรกลับมาสะอาด

### ควรใช้ `git stash -u` ตอนไหน?

สมมติมีสถานะแบบนี้:

```text
modified: README.md
untracked: employee-report.js
```

หากใช้ `git stash` Git จะ stash การแก้ไขของ `README.md` แต่ `employee-report.js` อาจยังอยู่

หากต้องการเก็บทั้งสองไฟล์ ให้ใช้:

```bash
git stash -u
```

จำง่าย ๆ:

> มีไฟล์ใหม่ที่ยังเป็น untracked → ใช้ `git stash -u`

### แล้วไฟล์ใน `.gitignore` ล่ะ?

โดยปกติ `git stash -u` จะยังไม่รวม ignored files เช่น:

```text
.env
node_modules/
*.log
```

หากต้องการรวม ignored files ด้วยจริง ๆ ให้ใช้:

```bash
git stash -a
```

`-a` ย่อมาจาก `--all`

> [!WARNING]
> งานทั่วไปไม่ค่อยจำเป็นต้อง stash ignored files โดยเฉพาะ `node_modules/`, `bin/` และ `obj/` เพราะอาจมีขนาดใหญ่และไม่ควรถูกเก็บโดยไม่จำเป็น

---

## Step 11: ดูว่า Stash แก้อะไรไว้

สมมติมี `stash@{0}` สามารถดูสรุปการเปลี่ยนแปลงได้ด้วย:

```bash
git stash show
```

หากต้องการดู diff แบบละเอียด:

```bash
git stash show -p
```

หรือระบุ stash ที่ต้องการ:

```bash
git stash show -p stash@{0}
```

มีประโยชน์เมื่อมีหลาย stash และจำไม่ได้ว่าแต่ละรายการเก็บอะไรไว้

---

## Step 12: Apply Stash ที่ไม่ใช่รายการล่าสุด

สมมติมีรายการดังนี้:

```text
stash@{0}: feature/report
stash@{1}: feature/login
stash@{2}: feature/search
```

หากต้องการรายการที่ 1 ให้ใช้:

```bash
git stash apply stash@{1}
```

หรือหากต้องการนำงานกลับพร้อมลบ stash เมื่อสำเร็จ:

```bash
git stash pop stash@{1}
```

> [!TIP]
> ใน PowerShell อาจครอบ stash reference ด้วยเครื่องหมายคำพูด เช่น `git stash apply "stash@{1}"` เพื่อป้องกัน shell ตีความอักขระพิเศษ

---

## Step 13: ลบ Stash

ลบเฉพาะรายการที่เลือก:

```bash
git stash drop stash@{0}
```

ลบ stash ทั้งหมด:

```bash
git stash clear
```

> [!CAUTION]
> `git stash clear` จะลบ stash ทั้งหมด ควรตรวจสอบให้แน่ใจก่อนใช้งาน

---

## Scenario ที่ใช้จริงบ่อยที่สุด

สมมติว่ากำลังทำ branch:

```text
feature/employee-search
```

และแก้ไฟล์เหล่านี้อยู่:

- `EmployeeController.cs`
- `EmployeeService.cs`
- `EmployeeSearch.cshtml`

งานยังไม่เสร็จ แต่มีคนแจ้งว่า:

> ระบบ production login ไม่ได้ ช่วยแก้ด่วน

เริ่มจากตรวจสอบงานที่ค้าง:

```bash
git status
```

ไม่ควรสร้าง commit ชื่อ `WIP`, `test` หรือ `ยังไม่เสร็จ` เพียงเพื่อเปลี่ยน branch ให้ stash งานพร้อมตั้งชื่อแทน:

```bash
git stash push -u -m "employee search WIP"
```

จากนั้นสร้าง hotfix branch:

```bash
git switch main
git switch -c hotfix/login-error
```

แก้ bug แล้ว commit:

```bash
git add .
git commit -m "hotfix: fix login error"
```

รวม hotfix กลับเข้า `main`:

```bash
git switch main
git merge hotfix/login-error
```

กลับไปทำ feature ต่อ:

```bash
git switch feature/employee-search
git stash pop
```

นี่คือ use case หลักของ stash

---

## Stash ไม่ใช่ที่เก็บงานระยะยาว

อย่ามอง stash เป็นที่เก็บ feature เป็นเวลาหลายสัปดาห์ เพราะไม่มีโครงสร้างและประวัติที่ชัดเจนเท่า commit

ควรใช้ stash สำหรับ:

- เก็บงานชั่วคราว
- สลับ branch
- ทดลองบางอย่าง
- ทำ hotfix
- เตรียม pull หรือ rebase
- กลับมาทำงานเดิมต่อ

ถ้างานอยู่ในจุดที่สมเหตุสมผลที่จะ commit แล้ว ก็ควร commit

---

## ถ้า `git stash pop` แล้วเกิด Conflict

Conflict สามารถเกิดขึ้นได้ ตัวอย่างเช่น ตอน stash มีโค้ด:

```javascript
const appName = "Employee System";
```

ระหว่างนั้น branch ถูกแก้เป็น:

```javascript
const appName = "Internal System";
```

แต่ stash พยายามนำค่าต่อไปนี้กลับมา:

```javascript
const appName = "Employee Management System";
```

Git อาจรวมการเปลี่ยนแปลงให้อัตโนมัติไม่ได้ เมื่อใช้:

```bash
git stash pop
```

จึงเกิด conflict และเห็น marker คล้าย Workshop 08:

```text
<<<<<<< Updated upstream
...
=======
...
>>>>>>> Stashed changes
```

หลักการแก้เหมือนเดิม:

1. ใช้ `git status` ตรวจสอบไฟล์ที่ conflict
2. เปิดไฟล์ที่มีปัญหา
3. เลือกหรือรวมโค้ดที่ถูกต้อง
4. ลบ conflict markers
5. ใช้ `git add` ระบุว่าแก้ conflict แล้ว

ดังนั้น Workshop 08 และ Workshop 09 จึงเชื่อมโยงกันโดยตรง

---

## จุดสำคัญที่ควรเข้าใจ

`git stash` ไม่ใช่ commit ปกติใน branch เมื่อใช้:

```bash
git stash
```

Git จะไม่สร้าง commit ที่เราเห็นจาก:

```bash
git log --oneline
```

stash จะเก็บ snapshot ไว้ในพื้นที่แยกต่างหาก

| สิ่งที่ใช้ | จุดประสงค์ |
|---|---|
| **commit** | ประวัติจริงของงาน |
| **stash** | ที่พักงานชั่วคราว |

---

## Workshop Challenge

ลองทำตามสถานการณ์ต่อไปนี้ด้วยตัวเอง

### 1. สร้าง Feature Branch

```bash
git switch main
git switch -c feature/department-report
```

### 2. สร้างไฟล์

สร้าง `department-report.js` แล้วใส่โค้ด:

```javascript
function generateDepartmentReport() {
    return "Department report";
}
```

ยังไม่ต้อง commit

### 3. ตรวจสอบสถานะ

```bash
git status
```

### 4. Stash งานพร้อมตั้งชื่อ

ลองเติมคำสั่งด้วยตัวเองก่อน:

```bash
git stash push ___ -m "department report WIP"
```

<details>
<summary><strong>คำใบ้</strong></summary>

ไฟล์นี้ยังเป็น untracked จึงต้องใช้ option สำหรับรวม untracked files

</details>

<details>
<summary><strong>ดูเฉลย</strong></summary>

```bash
git stash push -u -m "department report WIP"
```

</details>

### 5. ตรวจสอบผลลัพธ์

```bash
git status
git stash list
```

Working Directory ควรสะอาด

### 6. เปลี่ยนไป Main

```bash
git switch main
```

สร้างไฟล์ `hotfix.txt` แล้วใส่ข้อความ:

```text
Urgent production fix
```

จากนั้น commit:

```bash
git add hotfix.txt
git commit -m "hotfix: add urgent production fix"
```

### 7. กลับ Feature Branch

```bash
git switch feature/department-report
git status
```

Working Directory ควรยังสะอาด

### 8. นำงานกลับ

```bash
git stash pop
git status
```

ควรเห็น `department-report.js` กลับมาแล้ว

### 9. Commit งาน Feature

```bash
git add department-report.js
git commit -m "feat: add department report"
git status
```

Working Directory ควรสะอาด

---

## สรุป Workshop 09

คำสั่งหลักที่ควรจำ:

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `git stash` | เก็บการแก้ไขของ tracked files ชั่วคราว |
| `git stash -u` | เก็บรวม untracked files |
| `git stash push -u -m "message"` | เก็บงานพร้อมตั้งชื่อ เหมาะกับการใช้งานจริง |
| `git stash list` | ดู stash ทั้งหมด |
| `git stash show -p` | ดู diff ที่อยู่ใน stash |
| `git stash apply` | นำงานกลับ แต่ยังเก็บ stash ไว้ |
| `git stash pop` | นำงานกลับ และลบ stash เมื่อสำเร็จ |
| `git stash drop stash@{0}` | ลบ stash ที่เลือก |
| `git stash clear` | ลบ stash ทั้งหมด |

### ภาพจำสุดท้าย

```text
กำลังทำ Feature
        ↓
งานยังไม่พร้อม Commit
        ↓
มี Bug ด่วนเข้ามา
        ↓
git stash -u
        ↓
ไปแก้ Bug / เปลี่ยน Branch
        ↓
กลับ Feature
        ↓
git stash pop
        ↓
ทำงานต่อ
```

ตอนนี้เราเรียนฝั่ง Git Local ไปค่อนข้างครบแล้ว ตั้งแต่ commit, undo, branch, conflict จนถึง stash

Workshop 10 จะเริ่มเข้าสู่ GitHub และ Remote Repository ได้แก่ `origin` คืออะไร, `git remote`, `git push -u origin main`, `clone`, ความแตกต่างระหว่าง local กับ remote และเหตุผลที่ต้องใช้ `-u origin <branch>` เมื่อ push branch ใหม่
