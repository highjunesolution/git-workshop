# Workshop 06: ย้อนการเปลี่ยนแปลงด้วย `restore`, `reset` และ `revert`

Git ไม่มีคำสั่ง **Undo** เพียงคำสั่งเดียว เพราะการย้อนแต่ละระดับส่งผลไม่เหมือนกัน บทนี้จะช่วยให้คุณเลือกคำสั่งได้ถูกต้องและไม่ทำให้งานหายโดยไม่ตั้งใจ

## เป้าหมายของ Workshop

เมื่อจบบทนี้ คุณจะเลือกใช้คำสั่งได้ตามสถานการณ์:

| สถานการณ์ | คำสั่งที่เหมาะสม |
|---|---|
| แก้ไฟล์แล้ว แต่ยังไม่ได้ `commit` | `git restore` |
| `git add` แล้ว แต่อยากเอาออกจาก Staging Area | `git restore --staged` |
| `commit` แล้ว แต่ยังไม่ได้ `push` | `git reset` |
| `commit` และ `push` หรือแชร์ให้ทีมแล้ว | `git revert` |

> **ภาพจำสั้น ๆ:** `restore` จัดการไฟล์, `reset` ย้อนประวัติส่วนตัว และ `revert` ย้อนงานที่แชร์กับทีมแล้ว

---

## เตรียมตัวก่อนเริ่ม

เข้าไปยัง repository ของ Workshop และตรวจสอบสถานะ:

```bash
cd git-workshop
git status
```

หากมีงานค้างจาก Workshop ก่อนหน้า ให้ตรวจสอบก่อนเริ่มทดลอง เพื่อป้องกันการย้อนหรือลบงานโดยไม่ตั้งใจ

---

## Part 1: ยกเลิกการแก้ไขไฟล์ด้วย `git restore`

ใช้เมื่อแก้ไขไฟล์ไปแล้ว แต่ยังไม่ได้ `commit` และต้องการทิ้งการแก้ไขนั้น

ลองเพิ่มข้อความที่ไม่ต้องการลงใน `README.md`:

```bash
echo "Wrong change" >> README.md
git diff
```

หากตัดสินใจว่าไม่ต้องการการแก้ไขนี้แล้ว:

```bash
git restore README.md
git status
```

ไฟล์จะกลับไปอยู่ในสถานะเดิมก่อนการแก้ไข

> ⚠️ **ระวัง:** การเปลี่ยนแปลงที่ยังไม่ได้ `commit` อาจหายไปจริงเมื่อใช้ `git restore` ควรตรวจสอบด้วย `git diff` ก่อนเสมอ

### จำแบบง่าย

```bash
git restore README.md
```

หมายถึง “ทิ้งการแก้ไขของ `README.md` ใน Working Directory”

---

## Part 2: เอาไฟล์ออกจาก Staging Area ด้วย `git restore --staged`

สมมติว่าเราแก้ไขไฟล์และเพิ่มเข้า Staging Area แล้ว:

```bash
echo "New line" >> README.md
git add README.md
```

หากยังไม่ต้องการนำไฟล์นี้ไป `commit` แต่ต้องการเก็บสิ่งที่แก้ไขไว้:

```bash
git restore --staged README.md
```

ผลลัพธ์คือ:

- การแก้ไขยังอยู่ใน Working Directory
- ไฟล์ถูกนำออกจาก Staging Area
- งานที่แก้ไว้ไม่หาย

### เปรียบเทียบสองคำสั่ง

| คำสั่ง | ผลลัพธ์ |
|---|---|
| `git restore --staged README.md` | Unstage ไฟล์ แต่เก็บการแก้ไขไว้ |
| `git restore README.md` | ทิ้งการแก้ไขใน Working Directory |

---

## Part 3: ย้อน Commit ด้วย `git reset`

`git reset` ใช้จัดการ commit และ history เหมาะกับ commit ที่ยังไม่ได้ `push` หรือยังไม่ได้แชร์ให้ผู้อื่น

เริ่มจากสร้าง commit สำหรับทดลอง:

```bash
echo "Temporary feature" >> README.md
git add README.md
git commit -m "feat: add temporary feature"
git log --oneline
```

ตัวอย่างผลลัพธ์:

```text
f3a91cd feat: add temporary feature
a2b18f1 chore: add gitignore
```

หาก commit ล่าสุดยังไม่พร้อม แต่ยังไม่ได้ `push` เราสามารถเลือก reset ได้ 3 รูปแบบ

### 1. `git reset --soft`

```bash
git reset --soft HEAD~1
```

คำสั่งนี้จะ:

- ย้อน commit ล่าสุดออกจาก history
- เก็บการแก้ไขไว้
- เก็บไฟล์ไว้ใน Staging Area

ตรวจสอบด้วย `git status` แล้วควรเห็นไฟล์อยู่ใต้หัวข้อ `Changes to be committed`

เหมาะกับกรณีที่เขียน commit message ผิด, commit เร็วเกินไป หรือต้องการเพิ่มไฟล์ก่อน commit ใหม่

### `HEAD~1` คืออะไร?

`HEAD` คือ commit ปัจจุบัน ส่วน `~1` หมายถึงย้อนกลับไปหนึ่ง commit

```text
A ← B ← C
        ↑
       HEAD

HEAD   = C
HEAD~1 = B
HEAD~2 = A
```

ดังนั้น `git reset --soft HEAD~1` จึงหมายถึง “ย้ายกลับไปยัง commit ก่อนหน้าหนึ่งตำแหน่ง”

หลัง reset แล้ว สามารถสร้าง commit ใหม่ได้ทันที:

```bash
git commit -m "docs: add temporary feature note"
git log --oneline
```

### 2. `git reset --mixed`

`--mixed` เป็นค่าเริ่มต้นของ `git reset` ดังนั้นสองคำสั่งนี้ให้ผลเหมือนกัน:

```bash
git reset HEAD~1
git reset --mixed HEAD~1
```

คำสั่งนี้จะย้อน commit, นำไฟล์ออกจาก Staging Area แต่ยังเก็บการแก้ไขไว้ใน Working Directory

เมื่อรัน `git status` จะเห็นไฟล์อยู่ใต้หัวข้อ `Changes not staged for commit`

### 3. `git reset --hard`

```bash
git reset --hard HEAD~1
```

คำสั่งนี้จะย้อน commit, นำไฟล์ออกจาก Staging Area และทิ้งการเปลี่ยนแปลงใน Working Directory

```text
# ก่อน reset
A → B → C (HEAD)

# หลัง git reset --hard HEAD~1
A → B (HEAD)
```

> 🚨 **คำเตือน:** หากไม่แน่ใจ อย่าเพิ่งใช้ `--hard` เพราะอาจทำให้งานที่ยังไม่ได้สำรองสูญหาย

### ตารางสรุป `git reset`

| รูปแบบ | Commit | Staging Area | การแก้ไขในไฟล์ |
|---|---|---|---|
| `git reset --soft` | ย้อน | เก็บไว้ | เก็บไว้ |
| `git reset --mixed` | ย้อน | นำออก | เก็บไว้ |
| `git reset --hard` | ย้อน | นำออก | ทิ้ง |

จำง่าย ๆ:

- `soft` — งานยังอยู่และยัง staged
- `mixed` — งานยังอยู่ แต่ต้อง `git add` ใหม่
- `hard` — ย้อนทั้งหมดและทิ้งงาน ต้องใช้อย่างระมัดระวัง

---

## Part 4: ย้อน Commit ที่แชร์แล้วด้วย `git revert`

`git revert` เหมาะกับการทำงานเป็นทีม โดยเฉพาะเมื่อ commit ถูก `push` ขึ้น remote แล้ว

สมมติว่า history เป็นแบบนี้:

```text
A → B → C
```

commit `C` มี bug และถูก `push` ไปแล้ว การใช้ `reset` แล้ว force push อาจทำให้ history ของคนในทีมไม่ตรงกัน ทางเลือกที่ปลอดภัยกว่าคือ:

```bash
git revert <commit-id>
```

### ทดลองใช้ `revert`

สร้าง commit ที่ตั้งใจให้ผิด:

```bash
echo "Bad feature" >> README.md
git add README.md
git commit -m "feat: add bad feature"
git log --oneline
```

สมมติว่า commit ID คือ `81bd213` ให้ย้อนด้วย:

```bash
git revert 81bd213
```

Git จะสร้าง commit ใหม่เพื่อหักล้างการเปลี่ยนแปลงของ commit เดิม:

```text
9c4f821 Revert "feat: add bad feature"
81bd213 feat: add bad feature
```

commit เดิมยังอยู่ครบ เพียงแต่มี commit ใหม่มาทำผลลัพธ์ตรงกันข้าม

### `reset` ต่างจาก `revert` อย่างไร?

| คำสั่ง | วิธีทำงาน | เหมาะกับ |
|---|---|---|
| `reset` | ย้ายตำแหน่ง history และทำให้ commit หายจากเส้นปัจจุบัน | งานส่วนตัวที่ยังไม่ได้ `push` |
| `revert` | สร้าง commit ใหม่เพื่อย้อนผลของ commit เก่า | งานที่ `push` หรือแชร์กับทีมแล้ว |

```text
# ก่อนย้อน
A → B → C

# reset กลับไป B
A → B

# revert commit C
A → B → C → D
            D = ย้อนสิ่งที่ C ทำ
```

---

## เลือกคำสั่งจากสถานการณ์จริง

### แก้ไฟล์ผิด แต่ยังไม่ได้ `git add`

```bash
git restore README.md
```

### `git add` แล้ว แต่ยังไม่อยาก commit

```bash
git restore --staged README.md
```

### Commit ล่าสุดผิด แต่ยังไม่ได้ push

หากต้องการให้ไฟล์ยังอยู่ใน Staging Area:

```bash
git reset --soft HEAD~1
```

หากต้องการนำไฟล์กลับมาแก้ใน Working Directory:

```bash
git reset HEAD~1
```

### Commit ถูก push หรือแชร์ให้ทีมแล้ว

```bash
git revert <commit-id>
```

---

## ตัวอย่างจากงานจริง

สมมติว่ากำลังพัฒนา Node.js API และพบว่า validation ใน commit ล่าสุดไม่ถูกต้อง

### กรณียังไม่ได้ push

```bash
git reset --soft HEAD~1
# แก้ไขโค้ดให้ถูกต้อง
git add .
git commit -m "fix: validate employee code correctly"
```

### กรณี push แล้ว

```bash
git log --oneline
git revert 7fd82e1
git push
```

วิธีนี้ช่วยรักษา history ให้ต่อเนื่องและปลอดภัยกว่าสำหรับทีม

---

## Bonus: แก้ Commit ล่าสุดด้วย `git commit --amend`

หากเพิ่ง commit และพบว่าเขียนข้อความผิด สามารถแก้ได้โดยไม่ต้อง reset:

```bash
git commit --amend -m "feat: add user service"
```

หากลืมเพิ่มไฟล์ `login.test.js` เข้า commit ล่าสุด:

```bash
git add login.test.js
git commit --amend --no-edit
```

`--no-edit` หมายถึงใช้ commit message เดิม

> **ข้อควรจำ:** `amend` จะเปลี่ยน commit hash จึงไม่ควรใช้กับ commit ที่ push หรือแชร์ให้ผู้อื่นแล้วโดยไม่ประสานงานกับทีม

---

## Workshop Challenge

### ขั้นที่ 1: สร้าง Commit

```bash
echo "Feature A" >> README.md
git add README.md
git commit -m "feat: add feature A"
git log --oneline
```

### ขั้นที่ 2: Reset แบบ Soft

```bash
git reset --soft HEAD~1
git status
```

จุดสังเกต: `README.md` ควรยังอยู่ใน Staging Area จากนั้นสร้าง commit ใหม่:

```bash
git commit -m "docs: add feature A note"
```

### ขั้นที่ 3: สร้าง Commit ที่ตั้งใจให้ผิด

```bash
echo "THIS IS WRONG" >> README.md
git add README.md
git commit -m "feat: add broken content"
git log --oneline
```

### ขั้นที่ 4: ย้อนด้วย Revert

สมมติ commit ID ที่ได้คือ `123abcd`:

```bash
git revert 123abcd
git log --oneline
```

ผลลัพธ์ควรมีลักษณะดังนี้:

```text
xxxxxxx Revert "feat: add broken content"
123abcd feat: add broken content
xxxxxxx docs: add feature A note
```

สังเกตว่า commit ที่ผิดยังอยู่ใน history แต่มี commit ใหม่มาหักล้างการเปลี่ยนแปลงของมัน

---

## สรุป Workshop 06

ใช้คำถามนี้ช่วยตัดสินใจ:

```text
ทำพลาดตรงไหน?
│
├─ ยังไม่ได้ commit
│  ├─ ยังไม่ได้ add → git restore <file>
│  └─ add แล้ว แค่อยาก unstage → git restore --staged <file>
│
├─ commit แล้ว แต่ยังไม่ได้ push
│  ├─ ต้องการให้ไฟล์ยัง staged → git reset --soft HEAD~1
│  └─ ต้องการกลับไปแก้ไฟล์ → git reset HEAD~1
│
└─ push หรือแชร์กับทีมแล้ว → git revert <commit-id>
```

คำสั่งที่ต้องระวังที่สุดคือ `git reset --hard` เพราะสามารถทิ้งทั้ง commit และการเปลี่ยนแปลงใน Working Directory ได้

ตอนนี้เราได้เรียนรู้พื้นฐาน Git ฝั่ง local ค่อนข้างครบแล้ว ได้แก่ `init`, `status`, `add`, `commit`, `diff`, `.gitignore`, `restore`, `reset` และ `revert`

ใน **Workshop 07** เราจะเข้าสู่หัวใจสำคัญของ Git คือ **Branch** โดยสร้าง `feature/login` แยกออกจาก `main` ทำงานโดยไม่กระทบ branch หลัก และค่อย merge กลับเข้ามา
