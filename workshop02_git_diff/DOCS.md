# Workshop 02: ทำความเข้าใจ `git diff`

ก่อนใช้ `git add` หรือ `git commit` เราควรตรวจสอบให้ได้ว่า:

- แก้ไขไฟล์อะไรไปบ้าง?
- แก้ไขบรรทัดไหน?
- ไฟล์ที่ `git add` แล้ว ต่างจากไฟล์ที่ยังไม่ได้ `git add` อย่างไร?

> เป้าหมายของบทนี้คือการตรวจสอบความเปลี่ยนแปลงให้มั่นใจก่อนบันทึกลงในประวัติ Git

---

## เริ่มต้น

จาก Workshop 01 ให้เปิด Terminal และเข้าไปยังโฟลเดอร์โปรเจกต์:

```bash
cd git-workshop
```

เช็กสถานะของ Repository:

```bash
git status
```

ถ้าไม่มีงานค้างอยู่ จะเห็นข้อความประมาณนี้:

```text
nothing to commit, working tree clean
```

ข้อความนี้หมายความว่า Repository สะอาด และไม่มีไฟล์ที่ถูกแก้ไขค้างอยู่

---

## Step 1: แก้ไขไฟล์ `README.md`

เพิ่มข้อความใหม่เข้าไปในไฟล์:

```bash
echo "Workshop 02 is about git diff." >> README.md
```

จากนั้นเช็กสถานะอีกครั้ง:

```bash
git status
```

ควรเห็นข้อความประมาณนี้:

```text
modified: README.md
```

หมายความว่า Git ตรวจพบว่าไฟล์ `README.md` ถูกแก้ไขแล้ว

---

## Step 2: ดูความเปลี่ยนแปลงด้วย `git diff`

ใช้คำสั่ง:

```bash
git diff
```

ผลลัพธ์จะมีลักษณะประมาณนี้:

```diff
diff --git a/README.md b/README.md
index xxxxxxx..yyyyyyy 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
 # Git Workshop
 This is my first Git workshop.
 Learning Git step by step.
+Workshop 02 is about git diff.
```

ให้สังเกตบรรทัดนี้:

```diff
+Workshop 02 is about git diff.
```

- เครื่องหมาย `+` หมายถึงบรรทัดที่ถูกเพิ่มเข้ามา
- เครื่องหมาย `-` หมายถึงบรรทัดที่ถูกลบออก

ตอนนี้ `README.md` ถูกแก้ไขแล้ว แต่ยังไม่ได้ `git add` ดังนั้น `git diff` จึงมองเห็นความเปลี่ยนแปลงนี้

> จำง่าย ๆ: `git diff` ใช้ดูสิ่งที่แก้แล้ว แต่ยังไม่ได้ `git add`

---

## Step 3: นำไฟล์เข้า Staging Area

เพิ่มไฟล์เข้า Staging Area:

```bash
git add README.md
```

ลองใช้ `git diff` อีกครั้ง:

```bash
git diff
```

คราวนี้คำสั่งอาจไม่แสดงอะไร เพราะ `git diff` ปกติจะแสดงเฉพาะความเปลี่ยนแปลงที่ยังไม่ได้ `git add` เท่านั้น เมื่อเราเพิ่มไฟล์แล้ว ความเปลี่ยนแปลงจะย้ายเข้าไปอยู่ใน Staging Area

---

## Step 4: ดู Diff ของไฟล์ที่ Add แล้ว

หากต้องการดูว่าไฟล์ที่เตรียมจะ Commit มีอะไรเปลี่ยนแปลงบ้าง ให้ใช้:

```bash
git diff --staged
```

หรือใช้คำสั่งที่มีความหมายเดียวกัน:

```bash
git diff --cached
```

ผลลัพธ์จะแสดงบรรทัดที่เพิ่มเข้ามาอีกครั้ง:

```diff
+Workshop 02 is about git diff.
```

### เปรียบเทียบสองคำสั่ง

| คำสั่ง | ใช้ดูอะไร |
| --- | --- |
| `git diff` | ความเปลี่ยนแปลงที่ยังไม่ได้ `git add` |
| `git diff --staged` | ความเปลี่ยนแปลงที่ `git add` แล้ว และกำลังจะ Commit |

---

## Step 5: Commit งาน

เมื่อเช็กแล้วว่าความเปลี่ยนแปลงถูกต้อง ให้ Commit:

```bash
git commit -m "docs: add git diff note"
```

จากนั้นดูประวัติ Commit:

```bash
git log --oneline
```

ควรเห็น Commit ใหม่อยู่ด้านบน:

```text
xxxxxxx docs: add git diff note
xxxxxxx docs: add learning note
xxxxxxx docs: update workshop description
xxxxxxx docs: add README
```

---

## Step 6: ทดลองลบบรรทัด

ลองแก้ไฟล์ด้วยการลบบรรทัด เพื่อดูว่าเครื่องหมาย `-` แสดงผลอย่างไร

เปิดไฟล์ `README.md` ด้วย VS Code:

```bash
code README.md
```

ลบบรรทัดต่อไปนี้แล้วบันทึกไฟล์:

```text
Workshop 02 is about git diff.
```

กลับมาที่ Terminal แล้วรัน:

```bash
git diff
```

จะเห็นผลลัพธ์ประมาณนี้:

```diff
-Workshop 02 is about git diff.
```

เครื่องหมาย `-` หมายความว่าบรรทัดนี้ถูกลบออก

---

## Step 7: ย้อนการแก้ไขไฟล์

ถ้าดู Diff แล้วตัดสินใจว่าไม่ต้องการลบบรรทัดนั้น ให้ใช้:

```bash
git restore README.md
```

จากนั้นเช็กสถานะ:

```bash
git status
```

ควรกลับมาเป็น:

```text
nothing to commit, working tree clean
```

หมายความว่า Git ย้อน `README.md` กลับไปเป็นสถานะเดียวกับ Commit ล่าสุดแล้ว

> **ระวัง:** `git restore` จะยกเลิกการแก้ไขที่ยังไม่ได้ Commit ควรตรวจสอบด้วย `git diff` ก่อนใช้เสมอ

---

## สรุปคำสั่งใน Workshop 02

```bash
git status

echo "Workshop 02 is about git diff." >> README.md

git status
git diff

git add README.md

git diff
git diff --staged

git commit -m "docs: add git diff note"

git log --oneline
```

คำสั่งสำหรับทดลองลบบรรทัดและย้อนการแก้ไข:

```bash
code README.md

git diff
git restore README.md
git status
```

### สรุปจำง่าย

| คำสั่ง | ความหมาย |
| --- | --- |
| `git status` | บอกว่าไฟล์ใดมีการเปลี่ยนแปลง |
| `git diff` | บอกว่าเปลี่ยนอะไร ก่อน `git add` |
| `git diff --staged` | บอกว่าเปลี่ยนอะไร หลัง `git add` |
| `git restore <file>` | ยกเลิกการแก้ไขไฟล์ให้กลับไปเหมือน Commit ล่าสุด |

---

## ภาพรวมการทำงานของ Git

```text
Working Directory
ไฟล์ที่เราเพิ่งแก้
        │
        │  git diff ดูความเปลี่ยนแปลงตรงนี้
        ▼
Staging Area
ไฟล์ที่ git add แล้ว
        │
        │  git diff --staged ดูความเปลี่ยนแปลงตรงนี้
        ▼
Repository
ไฟล์ที่ commit แล้ว
```

---

## แบบฝึกหัดท้าย Workshop 02

ลองทำด้วยตัวเองอีกหนึ่งรอบ:

```bash
echo "I should check diff before commit." >> README.md

git diff

git add README.md

git diff --staged

git commit -m "docs: add diff reminder"

git log --oneline
```

หลังจบบทนี้ คุณจะทำงานได้ปลอดภัยขึ้น เพราะสามารถตรวจสอบก่อน Commit ได้ว่าเผลอแก้ไขอะไรผิดไปหรือไม่

บทถัดไปคือ **Workshop 03: การเขียน Commit Message และการ Commit แบบใช้งานจริง** ซึ่งจะช่วยจัดระเบียบประวัติ Git ให้ดูเป็นมืออาชีพมากขึ้น
