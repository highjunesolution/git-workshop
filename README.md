# Git Roadmap Workshop

<p align="center">
  <strong>เรียนรู้ Git จากการลงมือทำ ตั้งแต่ First Commit ไปจนถึง workflow สำหรับการทำงานร่วมกับทีม</strong>
</p>

<p align="center">
  <img alt="Git" src="https://img.shields.io/badge/Git-Workshop-F05032?logo=git&logoColor=white">
  <img alt="Hands-on" src="https://img.shields.io/badge/Learning-Hands--on-2563EB">
  <img alt="Available workshops" src="https://img.shields.io/badge/Workshops-9%20of%2025-16A34A">
  <img alt="Available phases" src="https://img.shields.io/badge/Phases-3%20of%208-7C3AED">
</p>

---

## เกี่ยวกับโปรเจกต์

Repository นี้เป็นหลักสูตร Git แบบลงมือปฏิบัติสำหรับผู้เริ่มต้น วางแผนเนื้อหาไว้ทั้งหมด **25 Workshop ใน 8 Phase** ตั้งแต่พื้นฐาน Git ไปจนถึง GitHub, การทำงานร่วมกับทีม, Release และหัวข้อระดับ Professional

ปัจจุบันมีบทเรียนพร้อมใช้งานถึง **Workshop 09** ครอบคลุม 3 Phase แรกและพื้นฐานการใช้ Git บน Local Repository ได้แก่ Commit, Diff, Staging, Undo, Branch, Merge Conflict และ Stash ส่วนเนื้อหา Remote Repository และ workflow ขั้นสูงอยู่ในแผนพัฒนาลำดับถัดไป

ดูขอบเขตหลักสูตรทั้งหมดได้ที่ [Git Roadmap](context.md)

## สถานะหลักสูตร

| Phase | Workshop | เนื้อหา | สถานะ |
|:--:|:--:|---|:--:|
| 1 | 01–03 | พื้นฐาน Git, Diff และ Commit ที่มีคุณภาพ | **พร้อมเรียน** |
| 2 | 04–06 | Staging, `.gitignore` และการย้อนการเปลี่ยนแปลง | **พร้อมเรียน** |
| 3 | 07–09 | Branch, Merge Conflict และ Stash | **พร้อมเรียน** |
| 4 | 10–12 | GitHub, Remote Repository และ Pull Request | ตาม Roadmap |
| 5 | 13–16 | Git กับ Node.js, Prisma, ASP.NET และ Legacy Project | ตาม Roadmap |
| 6 | 17–19 | Team Workflow, Tag, Release และ Hotfix | ตาม Roadmap |
| 7 | 20–22 | การแก้ข้อผิดพลาด Git ที่พบบ่อย | ตาม Roadmap |
| 8 | 23–25 | History, Rebase และ GitHub Actions | ตาม Roadmap |

> **Current milestone:** เรียนรู้ workflow ฝั่ง Local Git ครบตั้งแต่การสร้าง Commit ไปจนถึงการพักงานชั่วคราวด้วย Stash

## ผลลัพธ์จากบทเรียนปัจจุบัน

- เข้าใจ Working Directory, Staging Area และ Repository
- ตรวจสอบการเปลี่ยนแปลงก่อน Commit ด้วย `git diff`
- เขียน Commit Message ให้สื่อความหมายและเป็นระเบียบ
- ยกเลิกการเปลี่ยนแปลงอย่างเหมาะสมด้วย `restore`, `reset` และ `revert`
- แยกงานด้วย Branch และรวมงานกลับด้วย Merge
- วิเคราะห์และแก้ไข Merge Conflict
- พักงานชั่วคราวและนำกลับมาทำต่อด้วย Git Stash
- ฝึก Local Git workflow ที่เป็นพื้นฐานของการทำงานในโปรเจกต์จริง

## บทเรียนที่พร้อมใช้งาน

| บท | หัวข้อ | แนวคิดสำคัญ |
|:--:|---|---|
| 01 | [Git Basic และ First Commit](workshop01_basic/DOCS.md) | `init`, `status`, `add`, `commit`, `log` |
| 02 | [ทำความเข้าใจ Git Diff](workshop02_git_diff/DOCS.md) | `diff`, `diff --staged` และการตรวจงานก่อน Commit |
| 03 | [เขียน Commit ให้เป็นระเบียบ](workshop03_commit_message/DOCS.md) | Commit ที่มีขอบเขตชัดเจนและ Conventional Commits |
| 04 | [นำไฟล์ออกจาก Staging โดยไม่ทำงานหาย](workshop04_restore/DOCS.md) | `restore --staged` และการจัดการไฟล์ที่ Add ผิด |
| 05 | [ป้องกันไฟล์ที่ไม่ควรเข้า Git](workshop05_gitignore/DOCS.md) | `.gitignore`, Secret และไฟล์ที่สร้างจากระบบ |
| 06 | [ย้อนการเปลี่ยนแปลงอย่างปลอดภัย](workshop06_restore_reset_revert/DOCS.md) | ความแตกต่างระหว่าง `restore`, `reset` และ `revert` |
| 07 | [แยกงานด้วย Git Branch](workshop07_branch/DOCS.md) | `branch`, `switch`, `merge` และ Feature Branch Workflow |
| 08 | [แก้ไข Merge Conflict](workshop08_merge_conflict/DOCS.md) | อ่าน Conflict Marker, แก้ไฟล์ และยืนยันผลลัพธ์ |
| 09 | [พักงานชั่วคราวด้วย Git Stash](workshop09_stash/DOCS.md) | `stash`, `list`, `apply`, `pop` และการสลับงานด่วน |

## ความต้องการเบื้องต้น

- [Git](https://git-scm.com/downloads) เวอร์ชัน 2.23 ขึ้นไป
- Terminal เช่น PowerShell, Command Prompt, Terminal หรือ Git Bash
- Text editor ที่ถนัด เช่น [Visual Studio Code](https://code.visualstudio.com/)
- ความรู้พื้นฐานเกี่ยวกับการใช้คำสั่งใน Terminal เล็กน้อย

ตรวจสอบว่า Git พร้อมใช้งานด้วยคำสั่ง:

```bash
git --version
```

## เริ่มต้นใช้งาน

1. Clone หรือดาวน์โหลด Repository นี้มาไว้ในเครื่อง

   ```bash
   git clone https://github.com/highjunesolution/git-workshop.git
   cd git-workshop
   ```

2. เริ่มจากเอกสารของ [Workshop 01](workshop01_basic/DOCS.md)

3. อ่านเป้าหมายและทำแบบฝึกหัดตามลำดับในแต่ละบท

4. ตรวจสอบสถานะก่อนและหลังใช้คำสั่งเสมอ

   ```bash
   git status
   ```

> [!IMPORTANT]
> Workshop หลายบทจะสร้าง Commit, Branch หรือเปลี่ยนแปลงประวัติ Git ควรฝึกใน Repository ที่ Clone หรือสำเนาส่วนตัว และไม่ควรทดลองกับโปรเจกต์งานจริงโดยตรง

## แนวทางการเรียนที่แนะนำ

```text
อ่านแนวคิด → ทดลองคำสั่ง → ตรวจสอบผลลัพธ์ → ทำ Challenge → สรุปสิ่งที่เรียนรู้
```

- เรียนตามลำดับ เพราะแต่ละบทต่อยอดจากความรู้ก่อนหน้า
- พิมพ์คำสั่งด้วยตนเองแทนการคัดลอกทั้งหมด เพื่อให้คุ้นเคยกับรูปแบบคำสั่ง
- ใช้ `git status`, `git diff` และ `git log --oneline` ตรวจสอบผลลัพธ์เป็นระยะ
- หากผลลัพธ์ไม่ตรงกับเอกสาร ให้หยุดตรวจสอบสถานะก่อนใช้คำสั่งถัดไป

## โครงสร้าง Repository

```text
git-workshop/
├── workshop01_basic/
├── workshop02_git_diff/
├── workshop03_commit_message/
├── workshop04_restore/
├── workshop05_gitignore/
├── workshop06_restore_reset_revert/
├── workshop07_branch/
├── workshop08_merge_conflict/
└── workshop09_stash/
```

แต่ละโฟลเดอร์มีเอกสาร `DOCS.md` และไฟล์ตัวอย่างสำหรับใช้ทดลองใน Workshop นั้น ๆ

## Quick Reference

| งานที่ต้องการทำ | คำสั่งหลัก |
|---|---|
| ตรวจสอบสถานะ | `git status` |
| ดูการเปลี่ยนแปลง | `git diff` |
| เพิ่มไฟล์เข้า Staging Area | `git add <file>` |
| บันทึกการเปลี่ยนแปลง | `git commit -m "message"` |
| ดูประวัติแบบย่อ | `git log --oneline --graph --all` |
| สร้างและสลับไป Branch ใหม่ | `git switch -c <branch>` |
| รวม Branch | `git merge <branch>` |
| พักงานชั่วคราว | `git stash push -u -m "message"` |

---

<p align="center">
  <strong>เข้าใจ Git ให้ชัด แล้วการทำงานร่วมกับทีมจะง่ายขึ้น</strong>
</p>
