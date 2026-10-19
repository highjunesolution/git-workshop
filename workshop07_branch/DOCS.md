# Workshop 07: Git Branch — แยกงานออกจาก `main` แล้วค่อยรวมกลับ

> เราจะพัฒนา Feature ใหม่อย่างไร โดยไม่ทำให้ Code หลักบน `main` ได้รับผลกระทบ?

คำตอบคือ **สร้าง Branch แยกสำหรับแต่ละงาน** เมื่อพัฒนาและตรวจสอบเรียบร้อยแล้วจึง Merge กลับเข้า `main`

```text
main
  │
  ├── feature/login
  │       ├── แก้ Code
  │       ├── ตรวจสอบ
  │       └── Commit
  │
  └── Merge กลับเข้า main
```

---

## TL;DR

Workflow พื้นฐานของบทนี้มีเพียง 5 ขั้นตอน:

```bash
git switch main
git switch -c feature/login

# แก้ไขไฟล์ จากนั้น Commit
git add workshop07_branch/login.ts
git commit -m "feat: add login function"

# กลับไปยัง Branch ที่จะรับงาน แล้ว Merge
git switch main
git merge feature/login

# ลบ Feature Branch หลัง Merge สำเร็จ
git branch -d feature/login
```

จำประโยคนี้ไว้:

> คำสั่ง `git merge feature/login` หมายถึง นำ `feature/login` เข้ามารวมกับ **Branch ที่เรากำลังยืนอยู่**

---

## เป้าหมายการเรียนรู้

เมื่อจบ Workshop นี้ คุณจะสามารถ:

1. อธิบายได้ว่า Branch คืออะไร
2. สร้างและสลับ Branch ด้วย `git switch`
3. พัฒนา Feature โดยไม่กระทบ `main`
4. ดู History ของทุก Branch พร้อมกัน
5. Merge Feature Branch กลับเข้า `main`
6. ลบ Branch อย่างปลอดภัยหลัง Merge

คำสั่งหลักที่จะใช้:

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `git branch` | แสดง Branch ทั้งหมดในเครื่อง |
| `git switch <branch>` | เปลี่ยนไปยัง Branch ที่มีอยู่ |
| `git switch -c <branch>` | สร้าง Branch ใหม่และสลับเข้าไปทันที |
| `git merge <branch>` | รวม Branch ที่ระบุเข้ากับ Branch ปัจจุบัน |
| `git branch -d <branch>` | ลบ Branch ที่ Merge แล้วอย่างปลอดภัย |

---

## 1. Branch คืออะไร?

สมมติ Repository มี Commit ดังนี้:

```text
A → B → C
        ↑
       main
```

`main` เปรียบเหมือนป้ายชื่อที่ชี้ไปยัง Commit ล่าสุดของ Branch นั้น

เมื่อสร้าง Branch ใหม่:

```bash
git switch -c feature/login
```

ช่วงแรก `main` และ `feature/login` จะชี้ไปยัง Commit เดียวกัน:

```text
A → B → C
        ↑
 main / feature/login
```

เมื่อเรา Commit งานใหม่บน `feature/login` Branch นี้จะเดินหน้าต่อ แต่ `main` ยังคงอยู่ตำแหน่งเดิม:

```text
        main
         ↓
A → B → C
         \
          D → E
              ↑
        feature/login
```

ดังนั้นเราจึงพัฒนา Feature, แก้ Bug หรือทดลองแนวคิดใหม่ได้ โดยยังไม่เปลี่ยน Code หลักบน `main`

---

## 2. เตรียม Repository

เปิด Terminal แล้วเข้า Repository:

```powershell
cd D:\skill\git\git-workshop
```

ตรวจสอบสถานะ:

```bash
git status
```

ก่อนเปลี่ยน Branch ควรเห็นข้อความ:

```text
nothing to commit, working tree clean
```

ตรวจสอบ Branch ปัจจุบัน:

```bash
git branch
```

ผลลัพธ์ตัวอย่าง:

```text
* main
```

เครื่องหมาย `*` หมายถึง Branch ที่กำลังใช้งานอยู่

> [!TIP]
> ใช้ `git status` ก่อนสลับ Branch เป็นนิสัย จะช่วยให้เรารู้ว่ามีงานที่ยังไม่ได้ Commit ค้างอยู่หรือไม่

---

## 3. สร้าง Feature Branch

สร้าง Branch สำหรับงาน Login:

```bash
git switch -c feature/login
```

คำสั่งนี้ทำสองอย่างพร้อมกัน:

1. สร้าง Branch ชื่อ `feature/login`
2. สลับจาก Branch ปัจจุบันไปยัง `feature/login`

ตรวจสอบผลลัพธ์:

```bash
git branch
```

```text
* feature/login
  main
```

### `switch -c` แปลว่าอะไร?

- `git switch` หมายถึง เปลี่ยน Branch
- `-c` ย่อมาจาก Create หรือสร้าง Branch ใหม่

คำสั่งแบบเก่าที่อาจพบใน Tutorial อื่นคือ:

```bash
git checkout -b feature/login
```

คำสั่งนี้ยังใช้ได้ แต่ Git รุ่นใหม่แยกหน้าที่ให้ชัดเจนขึ้น:

- `git switch` ใช้จัดการการสลับ Branch
- `git restore` ใช้คืนค่าการเปลี่ยนแปลงของไฟล์

Workshop นี้จึงเลือกใช้ `git switch`

---

## 4. ทำงานบน Feature Branch

สร้างหรือแก้ไขไฟล์ `workshop07_branch/login.ts` ให้มีเนื้อหาดังนี้:

```typescript
function login(username: string) {
  return `Welcome ${username}`;
}
```

ตรวจสอบไฟล์ที่เปลี่ยนแปลง:

```bash
git status
git diff
```

นำไฟล์เข้า Staging Area และตรวจสอบก่อน Commit:

```bash
git add workshop07_branch/login.ts
git diff --staged
```

Commit งาน:

```bash
git commit -m "feat: add login function"
```

ดู History ล่าสุด:

```bash
git log --oneline -5
```

---

## 5. เพิ่มงานอีกหนึ่ง Commit

เพิ่มการตรวจสอบกรณีที่ไม่ได้ส่ง Username:

```typescript
function login(username: string) {
  if (!username) {
    return "Username is required";
  }

  return `Welcome ${username}`;
}
```

ตรวจสอบและ Commit:

```bash
git diff
git add workshop07_branch/login.ts
git diff --staged
git commit -m "fix: validate empty username"
```

ตอนนี้ History จะมีลักษณะดังนี้:

```text
        main
         ↓
A → B → C
         \
          D → E
              ↑
        feature/login

D = feat: add login function
E = fix: validate empty username
```

---

## 6. สลับกลับไป `main`

```bash
git switch main
git branch
```

ผลลัพธ์:

```text
  feature/login
* main
```

ลองดู History และไฟล์:

```bash
git log --oneline -5
```

Commit ของ Login อาจยังไม่ปรากฏใน History ของ `main` และไฟล์ `login.ts` อาจไม่อยู่ใน Working Directory ของ Branch นี้

ไม่ต้องตกใจ—ไฟล์ไม่ได้สูญหาย แต่ยังอยู่ใน Snapshot ของ `feature/login`

```bash
git switch feature/login
# login.ts กลับมา

git switch main
# login.ts หายไปอีกครั้ง หาก main ยังไม่เคยมีไฟล์นี้
```

Working Directory จะเปลี่ยนตาม Snapshot ของ Branch ที่ Checkout อยู่ นี่คือพฤติกรรมปกติของ Git

---

## 7. ดูทุก Branch พร้อมกัน

ใช้คำสั่งนี้เพื่อดู History แบบกราฟ พร้อมชื่อ Branch:

```bash
git log --oneline --graph --decorate --all
```

ตัวอย่างผลลัพธ์:

```text
* 91a3812 (feature/login) fix: validate empty username
* 31fed61 feat: add login function
* c89ea31 (HEAD -> main) docs: add previous workshop
```

ความหมาย:

- `HEAD -> main` หมายถึง ตอนนี้เรากำลังอยู่บน `main`
- `feature/login` ชี้ไปยัง Commit ล่าสุดของ Feature
- `--all` ทำให้เห็น History จากทุก Branch ไม่ใช่เฉพาะ Branch ปัจจุบัน

---

## 8. Merge Feature กลับเข้า `main`

ก่อน Merge ต้องสลับไปยัง Branch ที่จะ **รับงานเข้ามา** ก่อน:

```bash
git switch main
git merge feature/login
```

คิดเป็นประโยคว่า:

> ฉันกำลังยืนอยู่บน `main` และต้องการนำ `feature/login` มารวมกับฉัน

```text
feature/login ──merge──> main
```

ตรวจสอบผลลัพธ์:

```bash
git status
git log --oneline --graph --decorate --all
```

ถ้า Merge สำเร็จ ทั้งสอง Branch อาจชี้ไปยัง Commit เดียวกัน:

```text
A → B → C → D → E
                  ↑
         main / feature/login
```

> [!IMPORTANT]
> `git merge feature/login` ไม่ได้หมายถึงนำ `main` ไปใส่ `feature/login` แต่หมายถึงนำ `feature/login` เข้าสู่ Branch ปัจจุบัน

---

## 9. Fast-forward Merge คืออะไร?

Git อาจแสดงข้อความ:

```text
Fast-forward
```

เหตุผลคือ หลังจากแตก `feature/login` ออกจาก `main` แล้ว `main` ไม่มี Commit ใหม่เพิ่มขึ้น:

```text
A → B → C → D → E
        ↑         ↑
       main    feature/login
```

Git จึงไม่จำเป็นต้องสร้าง Merge Commit เพียงเลื่อนป้าย `main` จาก `C` ไปยัง `E`:

```text
A → B → C → D → E
                  ↑
         main / feature/login
```

นี่เรียกว่า **Fast-forward Merge**

ถ้า `main` และ Feature ต่างมี Commit ใหม่แยกจากกัน Git อาจต้องสร้าง Merge Commit หรืออาจเกิด Merge Conflict ซึ่งจะเรียนใน Workshop ถัดไป

---

## 10. ลบ Branch หลัง Merge

เมื่อ Feature ถูก Merge แล้ว สามารถลบ Branch ที่ไม่ต้องใช้ได้:

```bash
git branch -d feature/login
```

ตรวจสอบ:

```bash
git branch
```

ควรเหลือ:

```text
* main
```

### `-d` กับ `-D` ต่างกันอย่างไร?

| Option | พฤติกรรม |
|---|---|
| `-d` | Safe delete — Git ปฏิเสธหาก Branch ยังไม่ได้ Merge |
| `-D` | Force delete — ลบแม้ Branch ยังไม่ได้ Merge |

> [!CAUTION]
> เริ่มต้นด้วย `git branch -d` เสมอ ใช้ `-D` เฉพาะเมื่อเข้าใจว่า Commit ใดอาจสูญเสียการอ้างอิงหลังลบ Branch

---

## Workflow ที่ใช้ในงานจริง

สมมติได้รับงาน **เพิ่ม Employee Search**:

```bash
# เริ่มจาก main ที่เป็นปัจจุบันและไม่มีงานค้าง
git switch main
git status

# สร้าง Branch สำหรับงานนี้
git switch -c feature/employee-search

# แก้ Code แล้วตรวจสอบ
git status
git diff

# Stage และ Commit
git add workshop07_branch/employee-search.ts
git diff --staged
git commit -m "feat: add employee search"

# Merge กลับเข้า main
git switch main
git merge feature/employee-search

# ลบ Branch ที่ Merge แล้ว
git branch -d feature/employee-search
```

ระหว่างที่พัฒนา `feature/employee-search`, `main` ยังคงเป็น Version เดิมที่ Stable อยู่

---

## แนวทางตั้งชื่อ Branch

ชื่อที่ไม่สื่อความหมาย เช่น `test`, `new`, `branch1` หรือ `abc` ทำให้ทีมไม่รู้ว่า Branch นั้นใช้ทำอะไร

ควรตั้งชื่อตามประเภทและขอบเขตของงาน:

| ประเภทงาน | ตัวอย่าง |
|---|---|
| Feature | `feature/login`, `feature/employee-search` |
| Bug Fix | `bugfix/login-validation`, `bugfix/session-timeout` |
| Hotfix | `hotfix/payment-error` |
| Refactor | `refactor/employee-service` |

หลักง่าย ๆ คือ **อ่านชื่อแล้วควรเดาได้ทันทีว่า Branch นี้กำลังแก้อะไร**

---

## ถ้ามี Bug ด่วนระหว่างทำ Feature ล่ะ?

สมมติ `feature/afternoon-shift` กำลังทำอยู่ แต่ Production มี Login Bug ที่ต้องแก้ทันที

หลังจากเก็บงาน Feature ให้อยู่ในสถานะปลอดภัยแล้ว สามารถแยก Hotfix ได้:

```bash
git switch main
git switch -c hotfix/login-error

# แก้ Bug
git add .
git diff --staged
git commit -m "hotfix: fix login error"

# Merge Hotfix
git switch main
git merge hotfix/login-error
git branch -d hotfix/login-error

# กลับไปทำ Feature ต่อ
git switch feature/afternoon-shift
```

Branch ทำให้งานแต่ละชิ้นมีพื้นที่และ History แยกจากกัน

---

## ถ้ามีไฟล์แก้ค้างอยู่ตอน Switch?

หากมีไฟล์ที่ยังไม่ได้ Commit แล้วสั่ง:

```bash
git switch main
```

Git อาจยอมให้สลับ หากการเปลี่ยนแปลงนำไปยังอีก Branch ได้โดยไม่ชนกัน หรืออาจปฏิเสธพร้อมข้อความ:

```text
Your local changes would be overwritten by checkout
```

Git ปฏิเสธเพื่อป้องกันงานสูญหาย ดังนั้นให้ตรวจสอบก่อนเสมอ:

```bash
git status
```

ถ้างานเสร็จเป็นก้อนแล้ว ให้ Stage และ Commit ก่อนเปลี่ยน Branch ส่วนงานที่ยังไม่พร้อม Commit สามารถพักไว้ชั่วคราวด้วย `git stash` ซึ่งจะเรียนใน Workshop 09

---

## Challenge: Employee Search

ลองทำเองก่อนเปิดดูเฉลย

### Requirement

1. เริ่มจาก `main`
2. สร้าง Branch ชื่อ `feature/employee-search`
3. สร้างไฟล์ `workshop07_branch/employee-search.ts`
4. Commit ด้วยข้อความ `feat: add employee search`
5. กลับไป `main` และตรวจว่าไฟล์ยังไม่อยู่บน `main`
6. Merge Feature เข้าสู่ `main`
7. ตรวจสอบ History ของทุก Branch
8. ลบ Feature Branch อย่างปลอดภัย

เนื้อหาไฟล์:

```typescript
const searchEmployee = (employeeCode: string) =>
  `Searching employee: ${employeeCode}`;
```

<details>
<summary>ดูเฉลย</summary>

```bash
git switch main
git status

git switch -c feature/employee-search

# สร้าง workshop07_branch/employee-search.ts

git status
git diff
git add workshop07_branch/employee-search.ts
git diff --staged
git commit -m "feat: add employee search"

git switch main
git merge feature/employee-search

git log --oneline --graph --decorate --all
git branch -d feature/employee-search
```

</details>

---

## Troubleshooting

### `fatal: a branch named 'feature/login' already exists`

Branch นี้มีอยู่แล้ว ให้สลับเข้าไปแทน:

```bash
git switch feature/login
```

### `pathspec 'main' did not match`

Repository อาจใช้ชื่อ Branch หลักเป็น `master` หรือชื่ออื่น ตรวจสอบด้วย:

```bash
git branch
```

แล้วใช้ชื่อ Branch ที่แสดงจริงแทน `main`

### ลบ Branch ไม่ได้เพราะกำลังใช้งานอยู่

สลับไป Branch อื่นก่อน:

```bash
git switch main
git branch -d feature/login
```

### Git เตือนว่า Branch ยังไม่ได้ Merge

อย่ารีบใช้ `-D` ให้ตรวจสอบ Commit ก่อน:

```bash
git log --oneline --graph --decorate --all
```

หากยังต้องการงานใน Branch ให้ Merge หรือสำรอง Commit ก่อนลบ

---

## สรุปคำสั่งสำคัญ

```bash
# ดู Branch
git branch

# เปลี่ยน Branch
git switch main

# สร้างและเปลี่ยนเข้า Branch ใหม่
git switch -c feature/login

# ดู History ทุก Branch
git log --oneline --graph --decorate --all

# รวม Branch ที่ระบุเข้ากับ Branch ปัจจุบัน
git merge feature/login

# ลบ Branch ที่ Merge แล้ว
git branch -d feature/login
```

## ภาพจำสุดท้าย

```text
1. เริ่มต้น

A → B → C
        ↑
       main

2. สร้างและพัฒนา Feature

        main
         ↓
A → B → C
         \
          D → E
              ↑
           feature

3. Merge กลับเข้า main

A → B → C → D → E
                  ↑
                 main
```

หลักสำคัญของ Workshop 07 คือ:

> **Branch คือพื้นที่แยกสำหรับพัฒนางาน แต่ละ Branch มีเส้นทาง History ของตัวเอง และสามารถ Merge กลับเข้าสู่ Code หลักภายหลังได้**

Workshop 08 จะต่อด้วย **Merge Conflict** โดยให้ `main` และ Feature แก้บรรทัดเดียวกันคนละแบบ แล้วเรียนรู้ว่า `<<<<<<< HEAD` คืออะไร รวมถึงวิธีแก้ Conflict อย่างถูกต้อง
