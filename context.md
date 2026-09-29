# Git Roadmap Workshop

Roadmap สำหรับฝึกใช้ Git ตั้งแต่พื้นฐาน ไปจนถึงการทำงานร่วมกับทีมและใช้งานกับโปรเจกต์จริง

> **เป้าหมาย:** เมื่อเรียนจบ Roadmap นี้ คุณควรใช้ Git กับงานจริงได้อย่างมั่นใจ ตั้งแต่การสร้าง commit, ทำ branch, แก้ conflict, เปิด Pull Request ไปจนถึงการทำ release

---

## Phase 1: พื้นฐาน Git ให้เข้าใจจริง

### Workshop 01: Git คืออะไร และไฟล์อยู่ตรงไหนบ้าง

**เป้าหมาย:** เข้าใจ 3 พื้นที่หลักของ Git

```text
Working Directory → Staging Area → Repository
```

**คำสั่งที่ต้องใช้ได้**

```bash
git init
git status
git add
git commit
git log
```

**Lab**

1. สร้างโฟลเดอร์ `my-git-workshop`
2. สร้างไฟล์ `app.js`
3. แก้ไขไฟล์
4. เพิ่มไฟล์เข้า staging area
5. Commit การเปลี่ยนแปลง
6. ดูประวัติด้วย `git log`

### Workshop 02: แก้ไฟล์แล้วดูความเปลี่ยนแปลง

**เป้าหมาย:** รู้ว่าแก้อะไรไปก่อน commit

**คำสั่งที่ต้องใช้ได้**

```bash
git diff
git diff --staged
git status
```

**Lab**

1. แก้ไข `app.js`
2. ตรวจดูว่าเปลี่ยนบรรทัดใดบ้าง
3. เพิ่มไฟล์เข้า staging area แล้วดู staged diff
4. Commit การเปลี่ยนแปลง

### Workshop 03: Commit ให้ดีแบบใช้งานจริง

**เป้าหมาย:** เขียน commit message ให้สื่อความหมาย ไม่ commit แบบกำกวม

**ตัวอย่าง commit ที่ดี**

```bash
git commit -m "feat: add login page"
git commit -m "fix: validate employee code"
git commit -m "refactor: clean booking query"
```

**ประเภทของ commit**

| ประเภท | ใช้เมื่อ |
| --- | --- |
| `feat` | เพิ่ม feature ใหม่ |
| `fix` | แก้ bug |
| `refactor` | ปรับโค้ดโดยไม่เปลี่ยน logic เดิม |
| `docs` | แก้ไขเอกสาร |
| `chore` | งานทั่วไปหรือการดูแลโปรเจกต์ |

**Lab — สร้าง 3 commits**

1. `feat: add employee page`
2. `fix: validate employee code`
3. `docs: update readme`

---

## Phase 2: ใช้ Git แบบไม่พัง

### Workshop 04: เอาไฟล์ออกจาก staging

**สถานการณ์ที่พบบ่อย:** ใช้ `git add .` แล้วเผลอเพิ่ม log หรือไฟล์ที่ไม่ต้องการเข้า staging area

**คำสั่งที่ต้องใช้ได้**

```bash
git restore --staged logs/app.log
git restore --staged .
```

**Lab**

1. สร้างไฟล์ `app.js`
2. สร้างไฟล์ `logs/error.log`
3. รัน `git add .`
4. เอาโฟลเดอร์ `logs` ออกจาก staging area
5. Commit เฉพาะ `app.js`

### Workshop 05: `.gitignore` ใช้อย่างไร

**เป้าหมาย:** ป้องกันไม่ให้ไฟล์ที่ไม่ควรเก็บใน Git ถูก track

**ตัวอย่าง `.gitignore`**

```gitignore
node_modules/
.env
logs/
bin/
obj/
.vs/
dist/
*.log
```

> **สำคัญ:** ห้ามนำข้อมูลลับ เช่น password, connection string หรือไฟล์ `.env` ขึ้น Git

**ไฟล์ที่มักไม่ควรเก็บใน Git**

- `.env`
- Password และ connection string
- `node_modules/`
- ไฟล์ publish หรือ build output
- Log files
- Temporary files

**Lab**

1. สร้าง `.env`
2. สร้าง `logs/error.log`
3. สร้าง `.gitignore`
4. ตรวจสอบว่า Git ไม่ track ไฟล์เหล่านี้แล้ว

### Workshop 06: ย้อนไฟล์และย้อน commit แบบปลอดภัย

**คำสั่งที่ต้องแยกให้ออก**

| คำสั่ง | ใช้เมื่อ |
| --- | --- |
| `git restore <file>` | ย้อนไฟล์ที่ยังไม่ได้ commit |
| `git reset` | ย้อน commit โดยแก้ไข history |
| `git revert` | สร้าง commit ใหม่เพื่อย้อนการเปลี่ยนแปลง เหมาะกับงานทีม |

**จำง่าย ๆ**

- แก้ไฟล์ผิด → `restore`
- Commit ผิดและยังไม่ push → `reset`
- Commit ถูก push หรือแชร์ให้คนอื่นแล้ว → `revert`

**Lab**

1. แก้ไฟล์ผิด แล้วใช้ `restore`
2. Commit ผิด แล้วใช้ `revert`
3. ย้อน commit ล่าสุดที่ยังไม่ push ด้วย `reset`

---

## Phase 3: ใช้ Branch ทำงานจริง

### Workshop 07: Branch คืออะไร

**เป้าหมาย:** แยกงานออกจาก `main` และหลีกเลี่ยงการแก้ `main` โดยตรง

**คำสั่งหลัก**

```bash
git branch
git switch -c feature/login
git switch main
git merge feature/login
```

**Workflow**

```text
main
└── feature/login
```

**Lab**

1. สร้าง branch `feature/employee-crud`
2. แก้ไขไฟล์
3. Commit งาน
4. กลับไปที่ `main`
5. Merge feature branch

### Workshop 08: แก้ Conflict

Conflict เป็นเรื่องที่ต้องเจอเมื่อหลายคนแก้ไขโค้ดส่วนเดียวกัน

**หน้าตาของ conflict**

```text
<<<<<<< HEAD
code จาก branch ปัจจุบัน
=======
code จาก branch ที่ merge เข้ามา
>>>>>>> feature/login
```

**คำสั่งที่ต้องใช้ได้**

```bash
git status
git add .
git commit
```

**Lab**

1. แก้บรรทัดเดียวกันบน `main`
2. แก้บรรทัดเดียวกันบน feature branch
3. Merge branch
4. แก้ conflict ด้วยตนเอง

### Workshop 09: Stash งานไว้ก่อน

**สถานการณ์ที่พบบ่อย:** กำลังแก้งานอยู่ แต่ต้อง pull, เปลี่ยน branch หรือไปแก้ bug ด่วน

**คำสั่งหลัก**

```bash
git stash
git stash list
git stash pop
```

**Lab**

1. แก้ไขไฟล์โดยยังไม่ commit
2. เก็บงานชั่วคราวด้วย `git stash`
3. เปลี่ยน branch
4. กลับมาแล้วนำงานคืนด้วย `git stash pop`

---

## Phase 4: ใช้งาน GitHub จริง

### Workshop 10: เชื่อม GitHub

**คำสั่งที่ต้องใช้ได้**

```bash
git remote add origin <repo-url>
git push -u origin main
git pull
git clone <repo-url>
```

**แนวคิดสำคัญ**

- **Local repository:** Repository ที่อยู่ในเครื่องของเรา
- **Remote repository:** Repository ที่อยู่บน GitHub, GitLab หรือ Azure DevOps

**Lab**

1. สร้าง repository บน GitHub
2. Push โปรเจกต์ขึ้น GitHub
3. Clone ลงมาอีกโฟลเดอร์
4. แก้ไขงาน แล้วฝึก push และ pull

### Workshop 11: Pull, Fetch และ Push ต่างกันอย่างไร

| คำสั่ง | ความหมาย |
| --- | --- |
| `git fetch` | ตรวจดูข้อมูลใหม่บน remote แต่ยังไม่รวมเข้ากับ branch ปัจจุบัน |
| `git pull` | ดึงข้อมูลและรวมเข้ากับ branch ปัจจุบัน (`fetch` + `merge`) |
| `git push` | ส่ง commit จากเครื่องของเราขึ้น remote |

**คำสั่งที่ต้องใช้ได้**

```bash
git fetch
git pull
git push
```

**Lab — จำลองการทำงานด้วย 2 โฟลเดอร์**

1. Folder A: push การเปลี่ยนแปลง
2. Folder B: pull การเปลี่ยนแปลง
3. Folder B: แก้ไขงานแล้ว push
4. Folder A: pull งานล่าสุดกลับมา

### Workshop 12: Pull Request / Merge Request

**เป้าหมาย:** ฝึก workflow ที่ใช้ในการทำงานแบบบริษัท

**Workflow จริง**

1. สร้าง branch
2. แก้โค้ด
3. Commit
4. Push branch
5. เปิด Pull Request
6. Review
7. Merge เข้า `main`

**ตัวอย่างการตั้งชื่อ branch**

```text
feature/transport-booking
bugfix/login-session-timeout
hotfix/remove-resigned-employee-booking
refactor/employee-default-route-query
```

**Lab**

1. สร้าง feature branch
2. Push branch ขึ้น GitHub
3. เปิด Pull Request
4. Merge เข้า `main`

---

## Phase 5: ใช้กับโปรเจกต์จริง

### Workshop 13: Git กับ Node.js / Express

| ควร commit | ไม่ควร commit |
| --- | --- |
| `src/` | `node_modules/` |
| `package.json` | `.env` |
| `package-lock.json` | `logs/` |
| `prisma/schema.prisma` | `dist/` |
| `README.md` | |

**Lab**

1. สร้าง Express project
2. ทำ `.gitignore`
3. Commit โปรเจกต์เริ่มต้น
4. เพิ่ม API `/employees`
5. Commit แล้ว push ขึ้น GitHub

### Workshop 14: Git กับ Prisma / Database Migration

**สิ่งที่ต้องเข้าใจ**

- `schema.prisma` ควร commit
- Migration files ควร commit
- `.env` ไม่ควร commit
- ฐานข้อมูลจริงไม่ควรอยู่ใน Git

**ตัวอย่าง**

```bash
npx prisma migrate dev --name add_employee_table
git add prisma/
git commit -m "feat: add employee table migration"
```

**Lab**

1. เพิ่ม model `Employee`
2. สร้าง migration
3. Commit migration
4. Clone project ใหม่
5. รัน migration

### Workshop 15: Git กับ ASP.NET Core MVC

| ควร commit | ไม่ควร commit |
| --- | --- |
| `Controllers/` | `bin/` |
| `Models/` | `obj/` |
| `Views/` | `.vs/` |
| `appsettings.json` | `appsettings.Development.json` ที่มี password |
| `.csproj` | Publish output |
| `Program.cs` | |
| `Migrations/` | |

**Lab**

1. สร้าง Employee CRUD
2. Commit แยกแต่ละ feature
3. ทำ migration
4. Push ขึ้น GitHub
5. Clone แล้วทดลอง run ใหม่

### Workshop 16: Git กับ Classic ASP / Legacy Project

หัวข้อนี้เหมาะกับการดูแลระบบเก่าหรือโปรเจกต์ Classic ASP โดยเฉพาะ

**สิ่งที่ควรระวัง**

- `connect.asp` อาจมี connection string
- ไฟล์ upload อาจมี path ของระบบจริง
- Log files ไม่ควร commit
- Backup files เช่น `.bak` และ `.old` ควรถูก ignore

**ตัวอย่าง `.gitignore`**

```gitignore
connect.local.asp
*.bak
*.old
logs/
uploads/
temp/
```

**Lab**

1. สร้างโปรเจกต์ Classic ASP
2. แยก `connect.example.asp` ออกจาก `connect.local.asp`
3. Commit เฉพาะไฟล์ตัวอย่าง
4. ป้องกันไฟล์จริงด้วย `.gitignore`

---

## Phase 6: ใช้ Git แบบทีมและบริษัทจริง

### Workshop 17: Git Workflow แบบบริษัท

**รูปแบบที่เรียบง่ายและใช้งานได้จริง**

| Branch | หน้าที่ |
| --- | --- |
| `main` | โค้ด production |
| `develop` | โค้ดรวมสำหรับทดสอบ |
| `feature/*` | งานหรือความสามารถใหม่ |
| `bugfix/*` | แก้ bug ทั่วไป |
| `hotfix/*` | แก้ปัญหาเร่งด่วนบน production |

**ตัวอย่างโครงสร้าง branch**

```text
main
└── develop
    ├── feature/booking-history
    ├── feature/employee-default-route
    └── bugfix/session-timeout
```

**Lab**

1. สร้าง `develop`
2. สร้าง feature branch
3. Merge เข้า `develop`
4. ทดสอบ
5. Merge เข้า `main`
6. สร้าง release tag

### Workshop 18: Tag / Release

ใช้ tag เพื่อระบุเวอร์ชันที่นำไป deploy

```bash
git tag v1.0.0
git push origin v1.0.0
```

**ตัวอย่างเวอร์ชัน**

- `v1.0.0` — เวอร์ชันแรก
- `v1.0.1` — แก้ hotfix
- `v1.1.0` — เพิ่ม feature ใหม่

**Lab**

1. สร้าง release `v1.0.0`
2. แก้ bug
3. สร้าง release `v1.0.1`

### Workshop 19: Hotfix งานด่วน

**สถานการณ์:** Production มีปัญหาและต้องแก้ไขทันที

**Flow**

```bash
git switch main
git pull
git switch -c hotfix/login-error

# แก้ไขโค้ด
git add .
git commit -m "hotfix: fix login error"
git push origin hotfix/login-error
```

**Lab**

1. จำลอง bug บน `main`
2. สร้าง hotfix branch
3. แก้ไข bug
4. Merge เข้า `main`
5. Tag เป็น `v1.0.1`

---

## Phase 7: Git สำหรับแก้ข้อผิดพลาดที่พบบ่อย

### Workshop 20: Commit ผิด Branch

**สถานการณ์:** ตั้งใจแก้งานใน feature branch แต่เผลอ commit บน `main`

```bash
git branch feature/my-work
git reset --hard HEAD~1
git switch feature/my-work
```

> **คำเตือน:** `git reset --hard` สามารถลบการเปลี่ยนแปลงที่ยังไม่ได้บันทึกได้ ควรตรวจสอบ `git status` และ commit เป้าหมายให้แน่ใจก่อนใช้งาน

### Workshop 21: Push ผิด หรือ Commit ขึ้น Remote แล้ว

เมื่อ commit ถูก push และมีผู้อื่นใช้งานร่วมกันแล้ว ให้ใช้ `revert` เพื่อไม่แก้ไขประวัติเดิม

```bash
git revert <commit-id>
```

### Workshop 22: เอาไฟล์ออกจาก Git แต่เก็บไว้ในเครื่อง

ตัวอย่างเช่น `.env` เคยถูก track ไปแล้ว

```bash
git rm --cached .env
git commit -m "chore: remove env from git tracking"
```

จากนั้นเพิ่มไฟล์ลงใน `.gitignore`

```gitignore
.env
```

> **หมายเหตุ:** การเอา `.env` ออกจาก commit ล่าสุดไม่ได้ลบข้อมูลลับออกจากประวัติ Git หากเคย push ขึ้น remote แล้ว ควรเปลี่ยน secret ทันทีและลบออกจาก history ด้วยขั้นตอนที่เหมาะสม

---

## Phase 8: Professional Git

### Workshop 23: อ่าน History ให้เป็น

**คำสั่งที่ต้องใช้ได้**

```bash
git log --oneline
git log --graph --oneline --all
git show <commit-id>
git blame <file>
```

คำสั่งเหล่านี้ช่วยตรวจสอบว่า:

- ใครแก้ไขโค้ด
- แก้ไขเมื่อใด
- Commit ใดอาจทำให้เกิด bug

### Workshop 24: Rebase เบื้องต้น

ใช้ rebase เพื่อจัด history ให้เป็นระเบียบ

```bash
git pull --rebase
git rebase main
```

**ข้อควรจำ**

- หากยังไม่ชำนาญ ให้เริ่มจาก `merge` ก่อน
- เมื่อเข้าใจ history ดีแล้วจึงค่อยใช้ `rebase`
- หลีกเลี่ยงการ rebase branch ที่แชร์กับผู้อื่น เพราะเป็นการแก้ไข history

### Workshop 25: GitHub Actions เบื้องต้น

**เป้าหมาย:** เมื่อ push โค้ดแล้ว ให้ระบบตรวจสอบ code, build และ test โดยอัตโนมัติ

```text
Push → Install dependencies → Build → Test
```

**นำไปใช้กับ**

- Node.js
- ASP.NET Core
- React

**Lab**

1. สร้าง GitHub Actions workflow สำหรับ Node.js
2. Push โค้ด
3. ตรวจสอบว่า build ผ่านหรือไม่

---

## สรุป Roadmap แบบสั้น

| Level | เนื้อหา |
| --- | --- |
| 1 | `init` / `add` / `commit` / `status` / `log` |
| 2 | `diff` / `restore` / `reset` / `revert` |
| 3 | `.gitignore` / staging / tracked files |
| 4 | Branch / merge / conflict / stash |
| 5 | GitHub push / pull / clone / remote |
| 6 | Pull Request / Code Review |
| 7 | Node.js / Prisma / ASP.NET / Classic ASP workflow |
| 8 | Git Flow / tag / release / hotfix |
| 9 | History / blame / rebase / GitHub Actions |

## แผนการเรียนที่แนะนำ

หากเรียนอย่างจริงจัง สามารถแบ่งเนื้อหาออกเป็น 10 วันได้ดังนี้:

| วัน | เนื้อหา |
| --- | --- |
| Day 1 | Git basics และ commit |
| Day 2 | `.gitignore`, restore, reset และ revert |
| Day 3 | Branch, merge และ conflict |
| Day 4 | GitHub push, pull และ clone |
| Day 5 | Pull Request workflow |
| Day 6 | ใช้กับ Node.js และ Prisma |
| Day 7 | ใช้กับ ASP.NET Core และ Classic ASP |
| Day 8 | Hotfix, tag และ release |
| Day 9 | แก้ปัญหาจริงที่พบบ่อย |
| Day 10 | GitHub Actions เบื้องต้น |

## โปรเจกต์สำหรับใช้ฝึก

ชื่อโปรเจกต์ที่แนะนำ: `employee-git-workshop`

**โครงสร้างไฟล์ตัวอย่าง**

```text
employee-git-workshop/
├── README.md
├── app.js
├── employees.json
├── .env
├── .gitignore
├── logs/
└── src/
    ├── employeeService.js
    └── departmentService.js
```

**สิ่งที่จะได้ฝึกกับโปรเจกต์นี้**

- เพิ่ม employee
- แก้ bug
- สร้าง branch
- Merge งาน
- แก้ conflict
- เอา `.env` ออกจาก Git
- Push ขึ้น GitHub
- เปิด Pull Request
- สร้าง release

## เป้าหมายสุดท้าย

เมื่อจบ Roadmap นี้ คุณควรทำสิ่งต่อไปนี้ได้จริง:

- Clone โปรเจกต์ของผู้อื่นมาทำงานต่อ
- สร้าง branch สำหรับงานของตนเอง
- เขียน commit ที่สื่อความหมาย
- Push งานขึ้น GitHub
- Pull โค้ดล่าสุด
- แก้ conflict
- ป้องกัน `.env`, logs และ publish files ไม่ให้ขึ้น Git
- ย้อน commit ที่ผิด
- เปิด Pull Request
- ใช้ Git กับโปรเจกต์จริง
