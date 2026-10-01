# Workshop 01: Git Basic และ First Commit

Workshop นี้จะพาเรียนรู้ขั้นตอนพื้นฐานของ Git ตั้งแต่การสร้าง Repository ไปจนถึงการบันทึกและดูประวัติ Commit

```text
แก้ไฟล์ → git add → git commit
```

หลังจบบทนี้ คุณจะสามารถใช้คำสั่งหลักต่อไปนี้ได้:

- `git init`
- `git status`
- `git add`
- `git commit`
- `git log`

---

## Step 0: ตรวจสอบว่าเครื่องมี Git แล้ว

เปิด Terminal หรือ PowerShell แล้วรัน:

```bash
git --version
```

ถ้าติดตั้ง Git เรียบร้อยแล้ว จะเห็นผลลัพธ์ประมาณนี้:

```text
git version 2.xx.x
```

---

## Step 1: สร้างโฟลเดอร์สำหรับ Workshop

สร้างโฟลเดอร์และเข้าไปยังโฟลเดอร์นั้น:

```bash
mkdir git-workshop
cd git-workshop
```

ตรวจสอบตำแหน่งปัจจุบัน:

```bash
pwd
```

บน Windows อาจเห็นผลลัพธ์ประมาณนี้:

```text
C:\Users\YourName\git-workshop
```

---

## Step 2: สร้าง Git Repository

ตอนนี้ `git-workshop` ยังเป็นเพียงโฟลเดอร์ธรรมดา ให้เริ่มต้นระบบ Git ด้วยคำสั่ง:

```bash
git init
```

หากสำเร็จ จะเห็นข้อความประมาณนี้:

```text
Initialized empty Git repository in ...
```

ลองตรวจสอบสถานะ:

```bash
git status
```

ผลลัพธ์จะมีลักษณะประมาณนี้:

```text
On branch main

No commits yet

nothing to commit
```

> ชื่อ Branch เริ่มต้นอาจเป็น `main` หรือ `master` ขึ้นอยู่กับการตั้งค่าของ Git ในเครื่อง

ข้อความนี้หมายความว่า:

- Git เริ่มทำงานในโฟลเดอร์นี้แล้ว
- ยังไม่มีไฟล์ให้บันทึก
- ยังไม่มี Commit แรก

---

## Step 3: สร้างไฟล์ `README.md`

สร้างไฟล์ด้วยคำสั่ง:

```bash
echo "# Git Workshop" > README.md
```

จากนั้นตรวจสอบสถานะ:

```bash
git status
```

ควรเห็นผลลัพธ์ประมาณนี้:

```text
Untracked files:
  README.md
```

คำว่า **Untracked** หมายความว่า Git เห็นไฟล์นี้แล้ว แต่ยังไม่ได้เริ่มติดตาม

ตอนนี้ `README.md` อยู่ใน Working Directory แต่ยังไม่ได้เข้า Staging Area

---

## Step 4: นำไฟล์เข้า Staging Area

ใช้คำสั่ง:

```bash
git add README.md
```

แล้วตรวจสอบสถานะอีกครั้ง:

```bash
git status
```

ควรเห็นผลลัพธ์ประมาณนี้:

```text
Changes to be committed:
  new file: README.md
```

หมายความว่าไฟล์ `README.md` พร้อมสำหรับการ Commit แล้ว

```text
Working Directory → Staging Area
```

---

## Step 5: สร้าง Commit แรก

บันทึกความเปลี่ยนแปลงด้วยคำสั่ง:

```bash
git commit -m "docs: add README"
```

ถ้าสำเร็จ จะเห็นผลลัพธ์ประมาณนี้:

```text
[main xxxxxxx] docs: add README
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

Git ได้สร้างจุดบันทึกประวัติเรียบร้อยแล้ว

> Commit เปรียบเสมือน Checkpoint ของโปรเจกต์ ซึ่งช่วยให้เราย้อนดูสิ่งที่เกิดขึ้นในแต่ละช่วงเวลาได้

---

## Step 6: ดูประวัติ Commit

ใช้คำสั่ง:

```bash
git log
```

จะเห็นรายละเอียดประมาณนี้:

```text
commit abc123...
Author: Your Name
Date: ...

    docs: add README
```

หากต้องการดูแบบสั้น ให้ใช้:

```bash
git log --oneline
```

ตัวอย่างผลลัพธ์:

```text
abc1234 docs: add README
```

---

## Step 7: แก้ไขไฟล์และ Commit รอบที่สอง

เพิ่มข้อความใหม่ลงใน `README.md`:

```bash
echo "This is my first Git workshop." >> README.md
```

ตรวจสอบสถานะ:

```bash
git status
```

จะเห็นข้อความประมาณนี้:

```text
modified: README.md
```

คำว่า **Modified** หมายความว่า Git ติดตามไฟล์นี้อยู่แล้ว และตรวจพบการแก้ไขใหม่

นำไฟล์เข้า Staging Area:

```bash
git add README.md
```

สร้าง Commit รอบที่สอง:

```bash
git commit -m "docs: update workshop description"
```

ดูประวัติแบบย่อ:

```bash
git log --oneline
```

ควรเห็นทั้งหมดสอง Commits:

```text
xxxxxxx docs: update workshop description
xxxxxxx docs: add README
```

---

## สรุปคำสั่งสำคัญ

| คำสั่ง | ความหมาย |
| --- | --- |
| `git init` | เริ่มต้นระบบ Git ในโฟลเดอร์ปัจจุบัน |
| `git status` | ตรวจสอบสถานะของไฟล์ |
| `git add <file>` | เตรียมไฟล์เข้า Staging Area |
| `git commit -m "message"` | บันทึกความเปลี่ยนแปลงลงในประวัติ |
| `git log` | ดูประวัติ Commit แบบละเอียด |
| `git log --oneline` | ดูประวัติ Commit แบบย่อ |

---

## คำสั่งทั้งหมดของ Workshop 01

```bash
mkdir git-workshop
cd git-workshop

git init
git status

echo "# Git Workshop" > README.md
git status

git add README.md
git status

git commit -m "docs: add README"

git log --oneline

echo "This is my first Git workshop." >> README.md
git status

git add README.md
git commit -m "docs: update workshop description"

git log --oneline
```

---

## ภาพรวมการทำงานของ Git

```text
Working Directory
ไฟล์ที่สร้างหรือแก้ไข
        │
        │  git add <file>
        ▼
Staging Area
ไฟล์ที่เตรียมจะบันทึก
        │
        │  git commit -m "message"
        ▼
Repository
ประวัติที่บันทึกแล้ว
```

---

## แบบฝึกหัดท้าย Workshop 01

ลองสร้าง Commit เพิ่มด้วยตัวเองอีกหนึ่งครั้ง:

```bash
echo "Learning Git step by step." >> README.md
git status
git add README.md
git commit -m "docs: add learning note"
git log --oneline
```

ผลลัพธ์ที่ควรได้คือมีทั้งหมดสาม Commits:

```text
xxxxxxx docs: add learning note
xxxxxxx docs: update workshop description
xxxxxxx docs: add README
```

หากทำถึงจุดนี้ได้ แสดงว่าคุณเข้าใจ Flow พื้นฐานที่สำคัญของ Git แล้ว:

```text
แก้ไฟล์ → git add → git commit → ดูประวัติ
```

บทถัดไปคือ **Workshop 02: `git diff`** ซึ่งจะสอนวิธีตรวจสอบว่าเราแก้ไขอะไรไปบ้างก่อน Commit และเป็นขั้นตอนสำคัญก่อน Push งานจริง
