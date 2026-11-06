# Workshop 08: Merge Conflict

> แก้กรณีที่ Git ไม่สามารถรวมโค้ดให้เราได้อัตโนมัติ

บทนี้สำคัญมาก เพราะเมื่อเริ่มทำงานด้วย branch จริง เราจะต้องเจอ **Merge Conflict** อย่างแน่นอน

Merge Conflict ไม่ได้แปลว่า Git พัง แต่หมายความว่า Git พบการแก้ไขที่ชนกันและไม่สามารถตัดสินใจแทนเราได้อย่างปลอดภัย

## เป้าหมายของ Workshop

เมื่อจบบทนี้ คุณจะสามารถ:

- อธิบายได้ว่า conflict เกิดขึ้นตอนไหน
- เข้าใจความหมายของ `HEAD`
- อ่านเครื่องหมาย `<<<<<<<`, `=======` และ `>>>>>>>`
- แยก Current Change และ Incoming Change
- แก้ conflict และสร้าง merge commit ได้อย่างปลอดภัย
- ยกเลิกการ merge ด้วย `git merge --abort`

---

## Merge Conflict คืออะไร?

จาก Workshop 07 เราได้เรียนรู้ flow นี้แล้ว:

```text
main
  \
   feature/login
```

จากนั้นจึงนำ feature กลับมารวมกับ `main`:

```bash
git switch main
git merge feature/login
```

ถ้าแต่ละ branch แก้คนละไฟล์หรือคนละส่วน Git มัก merge ให้เองได้ แต่ถ้าทั้งสอง branch แก้ไข **จุดเดียวกัน** Git จะไม่รู้ว่าควรเลือกฝั่งใด นี่คือสิ่งที่เรียกว่า **Conflict**

---

## Step 1: เตรียม Repository

เข้า repository เดิมและตรวจสอบสถานะ:

```bash
cd git-workshop
git status
```

ควรเห็น:

```text
nothing to commit, working tree clean
```

สลับไปที่ `main` แล้วตรวจสอบ branch ปัจจุบัน:

```bash
git switch main
git branch
```

```text
* main
```

---

## Step 2: สร้างไฟล์สำหรับทดลอง Conflict

สร้างไฟล์ `employee.js`:

```javascript
function getEmployeeName() {
    return "Tony";
}

console.log(getEmployeeName());
```

เพิ่มไฟล์เข้า staging area แล้ว commit:

```bash
git add employee.js
git commit -m "feat: add employee name function"
```

ตอนนี้ commit history จะมีลักษณะดังนี้:

```text
A → B → C
        ↑
       main
```

โดย `C` คือ commit ที่เพิ่มไฟล์ `employee.js`

---

## Step 3: สร้าง Feature Branch

```bash
git switch -c feature/employee-name
```

ตอนนี้ทั้งสอง branch ชี้ไปยัง commit เดียวกัน:

```text
A → B → C
        ↑
 main / feature/employee-name
```

---

## Step 4: แก้ไฟล์บน Feature Branch

แก้ `employee.js` ให้เป็น:

```javascript
function getEmployeeName() {
    return "Jirayu";
}

console.log(getEmployeeName());
```

ตรวจสอบความเปลี่ยนแปลง แล้ว commit:

```bash
git diff
git add employee.js
git commit -m "feat: update employee display name"
```

```text
          main
           ↓
A → B → C
         \
          D
          ↑
feature/employee-name
```

---

## Step 5: กลับ Main แล้วแก้บรรทัดเดียวกัน

กลับไปที่ `main`:

```bash
git switch main
```

ไฟล์ `employee.js` จะกลับมาใช้ชื่อ `Tony` เพราะ `main` ยังไม่มี commit จาก feature branch

แก้บรรทัดเดียวกันให้เป็น:

```javascript
function getEmployeeName() {
    return "Tony Developer";
}

console.log(getEmployeeName());
```

จากนั้น commit:

```bash
git add employee.js
git commit -m "feat: update employee name on main"
```

ตอนนี้ branch ทั้งสองแยกออกจากกัน:

```text
          D  ← feature/employee-name
         /
A → B → C
         \
          E  ← main
```

| Branch | การเปลี่ยนแปลง |
| --- | --- |
| `feature/employee-name` | `"Tony"` → `"Jirayu"` |
| `main` | `"Tony"` → `"Tony Developer"` |

ทั้งสอง branch แก้บรรทัดเดียวกัน Git จึงไม่สามารถเลือกผลลัพธ์สุดท้ายให้เราได้

---

## Step 6: Merge เพื่อทำให้ Conflict เกิดขึ้น

ตรวจสอบว่าเรากำลังอยู่ที่ `main`:

```bash
git branch
```

```text
  feature/employee-name
* main
```

ลอง merge feature branch:

```bash
git merge feature/employee-name
```

Git จะแสดงข้อความประมาณนี้:

```text
Auto-merging employee.js
CONFLICT (content): Merge conflict in employee.js
Automatic merge failed; fix conflicts and then commit the result.
```

นี่คือ **Merge Conflict**

---

## Step 7: ตรวจสอบสถานะ

```bash
git status
```

ผลลัพธ์จะมีข้อความประมาณนี้:

```text
You have unmerged paths.

Unmerged paths:
  both modified: employee.js
```

`both modified` หมายความว่า branch ทั้งสองฝั่งแก้ไขไฟล์เดียวกัน และ Git ต้องการให้เราจัดการ conflict ก่อน

---

## Step 8: อ่านไฟล์ที่เกิด Conflict

เปิดไฟล์ด้วย VS Code:

```bash
code employee.js
```

เนื้อหาจะมีลักษณะดังนี้:

```javascript
function getEmployeeName() {
<<<<<<< HEAD
    return "Tony Developer";
=======
    return "Jirayu";
>>>>>>> feature/employee-name
}

console.log(getEmployeeName());
```

### ความหมายของ Conflict Markers

```text
<<<<<<< HEAD
Current Change
=======
Incoming Change
>>>>>>> branch-name
```

| Marker | ความหมาย |
| --- | --- |
| `<<<<<<< HEAD` | จุดเริ่มต้นของโค้ดจาก branch ปัจจุบัน |
| `=======` | เส้นแบ่งระหว่างการเปลี่ยนแปลงสองฝั่ง |
| `>>>>>>> branch-name` | จุดสิ้นสุดของโค้ดจาก branch ที่ merge เข้ามา |

ในตัวอย่างนี้:

```text
HEAD / Current Change = main
Incoming Change       = feature/employee-name
```

ดังนั้น Current Change คือ:

```javascript
return "Tony Developer";
```

ส่วน Incoming Change คือ:

```javascript
return "Jirayu";
```

Git กำลังบอกว่า ทั้งสองฝั่งแก้จุดเดียวกันและ Git ไม่รู้ว่า business requirement ต้องการแบบใด เราจึงต้องตัดสินใจเอง

---

## Step 9: แก้ Conflict

เรามีทางเลือกหลัก 3 แบบ

### ทางเลือกที่ 1: ใช้โค้ดจาก Main

```javascript
function getEmployeeName() {
    return "Tony Developer";
}

console.log(getEmployeeName());
```

### ทางเลือกที่ 2: ใช้โค้ดจาก Feature

```javascript
function getEmployeeName() {
    return "Jirayu";
}

console.log(getEmployeeName());
```

### ทางเลือกที่ 3: รวมแนวคิดจากทั้งสองฝั่ง

```javascript
function getEmployeeName() {
    return "Jirayu (Tony Developer)";
}

console.log(getEmployeeName());
```

> **ข้อควรจำ:** การแก้ conflict ไม่ได้หมายความว่าต้องเลือก A หรือ B เสมอไป เราสามารถเขียน solution ใหม่ที่ถูกต้องกว่าทั้งสองฝั่งได้

---

## Step 10: ลบ Conflict Markers

หลังจากตัดสินใจแล้ว ต้องลบ marker เหล่านี้ออกทั้งหมด:

```text
<<<<<<<
=======
>>>>>>>
```

ไฟล์ต้องกลับมาเป็นโค้ดปกติ เช่น:

```javascript
function getEmployeeName() {
    return "Jirayu";
}

console.log(getEmployeeName());
```

---

## Step 11: แจ้ง Git ว่าแก้ Conflict แล้ว

การ save ไฟล์อย่างเดียวยังไม่พอ ให้เพิ่มไฟล์เข้า staging area:

```bash
git add employee.js
```

ในสถานการณ์นี้ `git add` หมายความว่า:

> ฉันแก้ conflict ของไฟล์นี้เรียบร้อยแล้ว และยืนยันผลลัพธ์สุดท้ายนี้

ตรวจสอบอีกครั้ง:

```bash
git status
```

ควรเห็นข้อความประมาณนี้:

```text
All conflicts fixed but you are still merging.
```

---

## Step 12: Commit การ Merge

สร้าง merge commit:

```bash
git commit
```

Git จะเปิด editor พร้อมข้อความประมาณนี้:

```text
Merge branch 'feature/employee-name'
```

สามารถใช้ข้อความนี้ได้เลย หรือกำหนดข้อความเอง:

```bash
git commit -m "merge: resolve employee name conflict"
```

ตรวจสอบ commit graph:

```bash
git log --oneline --graph --decorate --all
```

ตัวอย่างผลลัพธ์:

```text
*   f8c1234 (HEAD -> main) merge: resolve employee name conflict
|\
| * a81d392 (feature/employee-name) feat: update employee display name
* | b73a902 feat: update employee name on main
|/
*   ...
```

### ทำไมครั้งนี้ต้องมี Merge Commit?

ใน Workshop 07 `main` ไม่ได้เดินต่อระหว่างที่ feature ทำงาน จึงสามารถ Fast-forward ได้:

```text
A → B → C → D
```

แต่ใน Workshop นี้ ทั้งสอง branch มี commit ใหม่ของตัวเอง:

```text
       D
      /
A → B
      \
       E
```

เมื่อรวมกัน Git จึงต้องสร้าง commit ใหม่ `F`:

```text
       D
      / \
A → B   F
      \ /
       E
```

`F` คือ Merge Commit ที่เชื่อมประวัติของทั้งสอง branch เข้าด้วยกัน

---

## Step 13: ลบ Feature Branch

เมื่อ merge เรียบร้อยแล้ว สามารถลบ feature branch ได้:

```bash
git branch -d feature/employee-name
git branch
```

ควรเหลือ:

```text
* main
```

---

## การแก้ Conflict ด้วย VS Code

เมื่อเกิด conflict VS Code มักแสดงตัวเลือกดังนี้:

| ตัวเลือก | ความหมาย |
| --- | --- |
| Accept Current Change | ใช้โค้ดจาก branch ปัจจุบัน หรือ `HEAD` |
| Accept Incoming Change | ใช้โค้ดจาก branch ที่กำลัง merge เข้ามา |
| Accept Both Changes | เก็บโค้ดจากทั้งสองฝั่ง |
| Compare Changes | เปรียบเทียบโค้ดทั้งสองฝั่ง |

ตัวอย่าง หากเราอยู่ที่ `main` แล้วสั่ง:

```bash
git merge feature/login
```

ความหมายจะเป็น:

```text
Current  = main
Incoming = feature/login
```

### อย่ากด Accept Both โดยไม่ตรวจสอบ

สมมติ conflict เป็นดังนี้:

```javascript
<<<<<<< HEAD
const port = 5000;
=======
const port = 8000;
>>>>>>> feature/config
```

ถ้ากด Accept Both อาจได้ผลลัพธ์นี้:

```javascript
const port = 5000;
const port = 8000;
```

โค้ดนี้ประกาศตัวแปรซ้ำและอาจทำให้โปรแกรมพัง Conflict Resolver เป็นเพียงเครื่องมือช่วย ส่วนผู้ตัดสินใจสุดท้ายคือ developer

---

## Conflict ไม่ได้เกิดเฉพาะตอน Merge

เราสามารถพบ conflict ได้จากหลายคำสั่ง:

```bash
git merge
git pull
git rebase
git stash pop
git cherry-pick
```

แนวคิดเหมือนกันทั้งหมด: Git มีโค้ดหลาย version และไม่รู้ว่าควรรวมเข้าด้วยกันอย่างไรโดยไม่ทำให้ความหมายเปลี่ยน

---

## ยกเลิกการ Merge

ถ้า merge แล้วพบ conflict จำนวนมาก และยังไม่พร้อมจัดการ สามารถยกเลิกได้:

```bash
git merge --abort
git status
```

Git จะพยายามนำ repository กลับไปยังสถานะก่อนเริ่ม merge

> **คำเตือน:** อย่าใช้ `git reset --hard` เพื่อแก้ conflict โดยที่ยังไม่เข้าใจ เพราะอาจทำให้งานที่ยังไม่ได้ commit สูญหาย หากต้องการยกเลิก merge ให้ใช้ `git merge --abort`

---

## ตัวอย่างจากงานจริง

### Scenario: ASP.NET Core

Developer A แก้ route เป็น:

```csharp
return RedirectToAction("Dashboard", "Home");
```

Developer B แก้บรรทัดเดียวกันเป็น:

```csharp
return RedirectToAction("Index", "Employee");
```

Git จึงสร้าง conflict:

```csharp
<<<<<<< HEAD
return RedirectToAction("Dashboard", "Home");
=======
return RedirectToAction("Index", "Employee");
>>>>>>> feature/employee-login
```

Git ไม่มีทางรู้ว่า route ใดตรงกับ business requirement Developer ต้องตรวจสอบ requirement แล้วเลือกหรือเขียนผลลัพธ์ที่ถูกต้อง

### Scenario: SQL

ฝั่งหนึ่งเพิ่มคอลัมน์ `Department` ส่วนอีกฝั่งเพิ่มการเรียงลำดับ ผลลัพธ์ที่ถูกต้องอาจเป็นการรวมแนวคิดจากทั้งสองฝั่ง:

```sql
SELECT EmployeeCode, FullName, Department
FROM Employees
WHERE IsActive = 1
ORDER BY FullName;
```

นี่คือตัวอย่างของการยอมรับทั้งสองแนวคิด แล้วเขียนโค้ดสุดท้ายใหม่ด้วยตัวเอง

---

## Workflow แก้ Conflict ที่ควรจำ

1. อย่าตกใจ
2. ใช้ `git status` เพื่อดูไฟล์ที่มีปัญหา
3. เปิดไฟล์ที่เกิด conflict
4. แยก Current Change และ Incoming Change
5. ตัดสินใจว่าโค้ดสุดท้ายที่ถูกต้องควรเป็นอย่างไร
6. ลบ conflict markers ให้หมด
7. ทดสอบโค้ด
8. ใช้ `git add <file>` เพื่อยืนยันว่าแก้แล้ว
9. ตรวจสอบด้วย `git status`
10. สร้าง merge commit ด้วย `git commit`

คำสั่งหลัก:

```bash
git merge feature/login
git status

# แก้ไฟล์และทดสอบโค้ด

git add employee.js
git status
git commit
```

---

## Workshop Challenge

คราวนี้ให้ลองสร้าง conflict ด้วยตัวเอง

### 1. เตรียมไฟล์บน Main

```bash
git switch main
```

สร้าง `config.js`:

```javascript
const appName = "Employee System";
```

```bash
git add config.js
git commit -m "feat: add application config"
```

### 2. แก้ไขบน Feature Branch

```bash
git switch -c feature/app-name
```

เปลี่ยนเป็น:

```javascript
const appName = "Employee Management System";
```

```bash
git add config.js
git commit -m "feat: update application name"
```

### 3. แก้ไขบรรทัดเดียวกันบน Main

```bash
git switch main
```

เปลี่ยนเป็น:

```javascript
const appName = "Internal Employee System";
```

```bash
git add config.js
git commit -m "feat: rename internal application"
```

### 4. ทำให้ Conflict เกิดขึ้น

```bash
git merge feature/app-name
```

อย่ารีบกด Accept ให้ลองอ่าน conflict markers แล้วกำหนดผลลัพธ์สุดท้ายเอง เช่น:

```javascript
const appName = "Internal Employee Management System";
```

### 5. ยืนยันผลลัพธ์และ Commit

```bash
git add config.js
git commit -m "merge: resolve application name conflict"
git log --oneline --graph --decorate --all
git branch -d feature/app-name
```

---

## Bonus Challenge: ยกเลิก Merge

สร้าง conflict ใหม่อีกครั้ง แต่คราวนี้เมื่อ conflict เกิด ให้ใช้:

```bash
git status
git merge --abort
git status
```

ตรวจสอบว่า repository กลับไปยังสถานะก่อน merge หรือไม่ แบบฝึกหัดนี้มีประโยชน์มากเมื่อทำงานจริง

---

## สรุป Workshop 08

Conflict เกิดขึ้นเมื่อ branch หลายฝั่งแก้ไขส่วนเดียวกัน และ Git ไม่สามารถตัดสินใจได้อย่างปลอดภัย

```text
<<<<<<< HEAD
Current Change
=======
Incoming Change
>>>>>>> branch-name
```

| คำศัพท์/คำสั่ง | ความหมาย |
| --- | --- |
| `HEAD` / Current | branch ที่เรายืนอยู่ |
| Incoming | branch ที่เรา merge เข้ามา |
| `git add <file>` | ยืนยันว่าแก้ conflict ของไฟล์แล้ว |
| `git commit` | บันทึกผลลัพธ์การ merge |
| `git merge --abort` | ยกเลิกการ merge และกลับไปก่อนเริ่ม merge |

> Git ไม่ได้ถามว่า “คุณชอบโค้ดฝั่งไหน” แต่กำลังขอให้คุณเลือกโค้ดที่ถูกต้องตาม requirement แล้วทดสอบให้มั่นใจ

## บทถัดไป

Workshop 09 จะเรียนเรื่อง `git stash` ซึ่งใช้ในสถานการณ์ที่กำลังเขียน feature ค้างอยู่และยังไม่พร้อม commit แต่ต้องเปลี่ยน branch ไปแก้ bug ด่วน
