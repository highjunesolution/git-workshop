# Workshop 10: Remote Repository + GitHub

> เชื่อม Local Git กับ GitHub และทำความเข้าใจ `origin`, `remote`, `push`, `clone`, `-u` และ upstream branch

ตั้งแต่ Workshop 01–09 เราทำงานอยู่ใน **Local Repository** บนเครื่องตัวเองเกือบทั้งหมด บทนี้จะเริ่มเชื่อม repository ไปยัง GitHub และทดลองส่ง commit รวมถึง branch ขึ้น remote

---

## Local vs Remote

ก่อนเริ่ม ให้แยกสองอย่างนี้ออกจากกัน:

| ประเภท | ความหมาย | ตัวอย่าง |
|---|---|---|
| **Local Repository** | Git repository ที่อยู่ในเครื่องเรา | โปรเจกต์ `git-workshop` บนเครื่อง |
| **Remote Repository** | Git repository ที่อยู่บน server | Repository บน GitHub |

```text
เครื่องเรา                       GitHub
─────────                       ──────
main                            main
feature/login                   feature/login

      ─────── push ───────►
      ◄────── pull ────────
```

> [!IMPORTANT]
> Branch ที่ชื่อเหมือนกันใน Local กับ GitHub ไม่ได้ sync กันอัตโนมัติ ต้องใช้คำสั่งอย่าง `push`, `fetch` หรือ `pull` เพื่อแลกเปลี่ยนข้อมูล

---

## Step 1: เช็ก Repository เดิม

เข้า repository เดิม แล้วตรวจสอบสถานะและ branch:

```bash
cd git-workshop
git status
git branch
```

ควรอยู่ที่ branch ประมาณนี้:

```text
* main
```

---

## Step 2: สร้าง Repository บน GitHub

บน GitHub สร้าง repository ใหม่ เช่น `git-workshop`

สำหรับ Workshop นี้ หาก local มีไฟล์และ commit history อยู่แล้ว ตอนสร้าง GitHub repository ให้เว้นตัวเลือกเหล่านี้ไว้:

- ไม่ต้องเลือก **Add README**
- ไม่ต้องเลือก **.gitignore**
- ไม่ต้องเลือก **License**

เพราะ local ของเรามี history อยู่แล้ว หาก GitHub สร้าง commit เริ่มต้นขึ้นมาอีก ฝั่ง local กับ remote จะมี history คนละสายตั้งแต่แรก

---

## Step 3: ดู Remote ของ Local Repository

กลับมาที่ Terminal แล้วลอง:

```bash
git remote
```

หากยังไม่เคยเชื่อม remote อาจไม่มีอะไรแสดงออกมา ลองดูรายละเอียดด้วย:

```bash
git remote -v
```

ผลลัพธ์อาจว่างเช่นกัน เพราะ repository นี้ยังไม่รู้จัก GitHub ของเรา

---

## Step 4: เชื่อม GitHub เข้ากับ Local

GitHub จะมี URL ของ repository เช่น:

```text
https://github.com/username/git-workshop.git
```

เพิ่ม remote แล้วตรวจสอบ:

```bash
git remote add origin https://github.com/username/git-workshop.git
git remote -v
```

ตัวอย่างผลลัพธ์:

```text
origin  https://github.com/username/git-workshop.git (fetch)
origin  https://github.com/username/git-workshop.git (push)
```

### `origin` คืออะไร?

แยกคำสั่งนี้ออกเป็นส่วน ๆ:

```bash
git remote add origin <url>
```

| ส่วนของคำสั่ง | ความหมาย |
|---|---|
| `git remote add` | เพิ่ม remote repository |
| `origin` | ชื่อเล่นหรือ alias ที่เราตั้งให้ remote |
| `<url>` | ที่อยู่จริงของ repository |

> [!NOTE]
> `origin` เป็นชื่อเล่นของ remote ไม่ใช่ชื่อพิเศษของ GitHub โดย convention ทั่วไปจะใช้ชื่อนี้กับ remote หลัก

เราตั้งชื่ออื่นก็ได้ เช่น:

```bash
git remote add company https://github.com/company/git-workshop.git
git push company main
```

ดังนั้น เมื่อเห็นคำสั่ง:

```bash
git push origin main
```

ให้อ่านว่า **ส่ง branch `main` ของฉันไปยัง remote ที่ชื่อ `origin`**

---

## Step 5: Push Main ครั้งแรก

ตอนนี้ local มี branch `main` แต่ GitHub ยังไม่มี commit ของเรา ให้ใช้:

```bash
git push -u origin main
```

นี่เป็นคำสั่งสำคัญของบทนี้:

| ส่วนของคำสั่ง | ความหมาย |
|---|---|
| `git push` | ส่ง commit ไป remote |
| `origin` | Remote ที่จะส่งไป |
| `main` | Branch ที่ต้องการส่ง |
| `-u` | ตั้ง upstream tracking |

### `-u` คืออะไร?

`-u` ย่อมาจาก `--set-upstream` เป็นการบอก Git ให้ local branch `main` ติดตาม `origin/main`

```text
Local branch                  Upstream

main ───────────────────────► origin/main
          tracking
```

เมื่อตั้งค่าแล้ว ครั้งต่อไปไม่ต้องระบุ `git push origin main` ทุกครั้ง ใช้เพียง:

```bash
git push
```

Git ก็รู้ว่า local `main` ต้องส่งไปไหน

---

## Step 6: เช็ก Tracking Branch

ใช้คำสั่ง:

```bash
git branch -vv
```

ตัวอย่างผลลัพธ์:

```text
* main abc1234 [origin/main] docs: update README
```

ส่วน `[origin/main]` แสดงว่า local `main` ตั้ง upstream เป็น `origin/main`

### `main` กับ `origin/main` ต่างกันอย่างไร?

| ชื่อ | ประเภท | ความหมาย |
|---|---|---|
| `main` | Local branch | Branch ที่เราทำงานอยู่ในเครื่อง |
| `origin/main` | Remote-tracking branch | ข้อมูลใน local Git ว่าครั้งล่าสุดที่รู้สถานะของ remote `origin` นั้น branch `main` อยู่ตรงไหน |

**สองชื่อนี้ไม่ใช่ branch เดียวกัน** และ `origin/main` เป็นข้อมูลที่เก็บอยู่ใน local Git ของเรา

---

## Step 7: ทดลองสร้าง Commit แล้ว Push

แก้ไฟล์ `README.md` โดยเพิ่มข้อความ:

```text
Workshop 10: Git Remote
```

ตรวจสอบการเปลี่ยนแปลง แล้ว commit:

```bash
git status
git diff
git add README.md
git commit -m "docs: add remote workshop note"
```

ตอนนี้ local เดินไปข้างหน้าแล้ว แต่ยังไม่ได้ส่ง commit ใหม่ไป remote:

```text
Local main
A → B → C → D
            ↑
           main

สถานะ remote ที่ local รู้ล่าสุด
A → B → C
        ↑
    origin/main
```

ลองตรวจสอบ:

```bash
git status
```

Git อาจแสดง:

```text
Your branch is ahead of 'origin/main' by 1 commit.
```

แปลว่า local มี commit นำหน้า `origin/main` อยู่ 1 commit ส่งขึ้น remote ด้วย:

```bash
git push
```

หลังจาก push สำเร็จ:

```text
A → B → C → D
            ↑
      main / origin/main
```

---

## Step 8: Push Branch ใหม่

นี่เป็นสถานการณ์ที่เจอบ่อยมาก เริ่มจากสร้าง branch:

```bash
git switch -c feature/user-profile
```

สร้างไฟล์ `user-profile.js` แล้วใส่โค้ด:

```javascript
function getUserProfile() {
    return "User Profile";
}
```

จากนั้น commit:

```bash
git add user-profile.js
git commit -m "feat: add user profile"
```

ตอนนี้ local มี `main` และ `feature/user-profile` แต่ GitHub ยังไม่มี branch `feature/user-profile`

ลองใช้:

```bash
git push
```

Git อาจแจ้งว่า branch นี้ยังไม่มี upstream พร้อมเสนอคำสั่ง:

```bash
git push --set-upstream origin feature/user-profile
```

ใช้รูปแบบสั้นได้เช่นกัน:

```bash
git push -u origin feature/user-profile
```

เมื่อสำเร็จ จะมี branch ใหม่บน remote และตั้ง tracking ให้ local branch:

```text
Local branch                         Upstream

feature/user-profile ──────────────► origin/feature/user-profile
```

หลังจากนี้ใช้เพียง `git push` ได้

### ทำไมชื่อ Local กับ Remote เหมือนกัน?

เมื่อใช้ `git push -u origin feature/user-profile` Git จะสร้าง branch ชื่อเดียวกันฝั่ง remote และตั้ง tracking relationship ให้

**ชื่อเหมือนกันไม่ได้หมายความว่าจะ sync อัตโนมัติ** หาก local มี commit ใหม่แต่ยังไม่ push สถานะอาจเป็นแบบนี้:

```text
Local:  feature/user-profile
A → B → C

Remote: feature/user-profile
A → B
```

ทั้งคู่ชื่อเดียวกัน แต่เนื้อหาและ commit ยังไม่เท่ากัน

---

## Step 9: ดู Remote Branch

ดู remote-tracking branches:

```bash
git branch -r
```

ตัวอย่างผลลัพธ์:

```text
origin/main
origin/feature/user-profile
```

หากต้องการดูทั้ง local และ remote-tracking branches:

```bash
git branch -a
```

ตัวอย่างผลลัพธ์:

```text
* feature/user-profile
  main
  remotes/origin/main
  remotes/origin/feature/user-profile
```

---

## Step 10: `git clone`

หากมี repository อยู่บน GitHub แล้ว และต้องการนำลงเครื่องใหม่ ให้ใช้ `git clone`:

```bash
git clone <repository-url>
```

ตัวอย่าง:

```bash
git clone https://github.com/username/git-workshop.git
```

Git จะทำสิ่งเหล่านี้ให้:

1. ดาวน์โหลดไฟล์
2. ดาวน์โหลด commit history
3. สร้าง `.git`
4. ตั้ง `origin` ให้อัตโนมัติ
5. Checkout default branch

เมื่อเข้า repository ที่ clone มาแล้วตรวจสอบด้วย `git remote -v` จะเห็น `origin` อยู่แล้ว จึงไม่ต้องใช้ `git remote add origin ...` อีก

### `git init` กับ `git clone` ต่างกันอย่างไร?

| สถานการณ์ | คำสั่ง | ตัวอย่าง |
|---|---|---|
| เริ่มโปรเจกต์ใหม่ในเครื่อง | `git init` | กำลังเขียน ASP.NET project ใหม่ และยังไม่มี GitHub repository |
| Repository มีอยู่แล้ว | `git clone <url>` | บริษัทมีโปรเจกต์บน GitHub และเราเพิ่งเข้าทีม จึงต้องโหลดมาทำงาน |

---

## Step 11: เปลี่ยน URL ของ Origin

หากตั้ง remote ผิด ให้ตรวจสอบ URL ปัจจุบัน:

```bash
git remote -v
```

สมมติเห็น URL เดิม:

```text
origin https://github.com/old/repo.git
```

เปลี่ยนเป็น URL ใหม่ แล้วตรวจสอบอีกครั้ง:

```bash
git remote set-url origin https://github.com/new/repo.git
git remote -v
```

---

## Step 12: ลบ Remote

หากต้องการเอา remote ออกจาก local repository:

```bash
git remote remove origin
```

> [!NOTE]
> คำสั่งนี้ลบการเชื่อมต่อจาก local repository เท่านั้น ไม่ได้ลบ repository บน GitHub

---

## Scenario งานจริง

### 1. Project ใหม่จากเครื่องเรา

สมมติสร้าง ASP.NET Core project:

```bash
dotnet new mvc -n EmployeeSystem
cd EmployeeSystem
```

เริ่มใช้ Git และสร้าง commit:

```bash
git init
git add .
git commit -m "chore: initialize ASP.NET Core project"
```

สร้าง repository บน GitHub แล้วเชื่อม remote และ push branch `main`:

```bash
git remote add origin <url>
git push -u origin main
```

ภาพรวมขั้นตอน:

```text
Project Local
      ↓
   git init
      ↓
    commit
      ↓
สร้าง GitHub Repo
      ↓
git remote add origin <url>
      ↓
git push -u origin main
```

### 2. Project ของบริษัทมีอยู่แล้ว

เพื่อนส่ง URL `https://github.com/company/intranet.git` มาให้ เริ่มจาก clone แล้วสร้าง feature branch:

```bash
git clone https://github.com/company/intranet.git
cd intranet
git switch -c feature/employee-search
```

ทำงานให้เรียบร้อย จากนั้น commit และ push:

```bash
git add .
git commit -m "feat: add employee search"
git push -u origin feature/employee-search
```

จากนั้นนำ branch นี้ไปเปิด **Pull Request** ซึ่งจะเริ่มเรียนใน Workshop 12

### 3. Local มี Branch แต่ Remote ไม่มี

สมมติมี branch ดังนี้:

| Local | GitHub |
|---|---|
| `main` | `main` |
| `feature/login` | ยังไม่มี |

หากต้องการนำ `feature/login` ขึ้น GitHub:

```bash
git switch feature/login
git push -u origin feature/login
```

GitHub จึงจะมี branch ใหม่นี้

---

## จุดที่มักเข้าใจผิด

### 1. `git commit` ไม่ได้ส่งขึ้น GitHub

`git commit` ทำงานใน local เท่านั้น ต้องใช้ `git push` เพื่อส่ง commit ขึ้น remote

```text
แก้ไฟล์
   ↓
git add
   ↓
git commit
   ↓
Local Repository
   ↓
git push
   ↓
GitHub
```

### 2. Push ไม่ได้หมายถึง Merge

สมมติอยู่ที่ branch `feature/login` และตั้ง upstream ไว้แล้ว เมื่อใช้ `git push` จะส่ง commit ไปยัง branch ที่ติดตาม:

```text
feature/login → remote feature/login
```

**ไม่ได้หมายความว่า GitHub จะ merge เข้า `main`**

### 3. Branch ชื่อเดียวกันไม่ได้ Auto Sync

Local `main` และ remote `main` ต้องใช้คำสั่งเพื่อแลกเปลี่ยน commit เช่น:

```bash
git push
```

หรือ:

```bash
git pull
```

---

## Workshop Challenge

ลองทำ flow นี้ด้วยตัวเอง เพื่อฝึกเชื่อม remote และ push branch ใหม่

### 1. เช็ก Remote

```bash
git remote -v
```

หากยังไม่มี ให้เชื่อม GitHub repository:

```bash
git remote add origin <url>
```

### 2. Push Main

```bash
git switch main
git push -u origin main
```

### 3. สร้าง Branch ใหม่

```bash
git switch -c feature/department
```

สร้างไฟล์ `department.js` แล้วใส่โค้ด:

```javascript
function getDepartment() {
    return "IT";
}
```

### 4. Commit

```bash
git add department.js
git commit -m "feat: add department function"
```

### 5. ตรวจสอบก่อน Push

```bash
git branch -vv
```

สังเกตว่า `feature/department` อาจยังไม่มี upstream

### 6. Push ครั้งแรก

```bash
git push -u origin feature/department
```

### 7. ตรวจสอบ Tracking อีกครั้ง

```bash
git branch -vv
```

ควรเห็นข้อมูลประมาณนี้ โดย commit hash และข้อความอาจต่างกัน:

```text
* feature/department abc1234 [origin/feature/department] feat: add department function
```

### 8. แก้ไฟล์เพิ่ม แล้ว Push อีกครั้ง

แก้ฟังก์ชันเดิมใน `department.js` เป็น:

```javascript
function getDepartment() {
    return "IT Department";
}
```

Commit แล้ว push:

```bash
git add department.js
git commit -m "feat: update department name"
git push
```

ครั้งนี้ใช้แค่ `git push` ได้ เพราะตั้ง upstream ไว้แล้ว

---

## สรุป Workshop 10

คำสั่งหลักที่ควรจำ:

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `git remote -v` | ดู remote และ URL |
| `git remote add origin <url>` | เชื่อม local repository กับ remote |
| `git push -u origin main` | Push ครั้งแรก พร้อมตั้ง upstream tracking |
| `git push` | Push ครั้งต่อไปหลังตั้ง upstream แล้ว |
| `git branch -vv` | ดูว่า local branch ตั้ง upstream เป็น branch ไหน |
| `git branch -r` | ดู remote-tracking branches |
| `git branch -a` | ดูทั้ง local และ remote-tracking branches |
| `git clone <url>` | โหลด repository ที่มีอยู่แล้วลงเครื่อง |
| `git remote set-url origin <url>` | เปลี่ยน URL ของ remote |
| `git remote remove origin` | ลบการเชื่อมต่อ remote ออกจาก local |

### ภาพจำที่สำคัญที่สุด

```text
Working Directory
        ↓
     git add
        ↓
      Staging
        ↓
    git commit
        ↓
Local Repository
        ↓
     git push
        ↓
Remote Repository / GitHub
```

> **จำไว้:** `origin` คือชื่อเล่นของ Remote Repository และ `git push` ไม่ได้แปลว่า merge เข้า `main`

Workshop 11 จะต่อเรื่อง `fetch`, `pull`, `push` และความแตกต่างระหว่าง `main` กับ `origin/main` ให้ลึกขึ้น
