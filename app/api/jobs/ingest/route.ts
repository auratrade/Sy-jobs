// job-filter/app/api/jobs/ingest/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// مسار حفظ الملف (داخل مجلد المشروع)
const dataFilePath = path.join(process.cwd(), "data.json");

// دالة مساعدة لقراءة البيانات من الملف
function readJobs() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// دالة مساعدة لحفظ البيانات في الملف
function saveJobs(jobs: any[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(jobs, null, 2), "utf-8");
  } catch (error) {
    console.error("فشل حفظ الملف:", error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jobs = readJobs();
    
    // منع التكرار
    const exists = jobs.some((j: any) => j.url === body.url);
    if (exists) {
      return NextResponse.json({ message: "موجود مسبقاً" }, { status: 200 });
    }
    
    const newJob = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    jobs.push(newJob);
    saveJobs(jobs); // حفظ في الملف
    
    console.log(`📥 [Next.js] تم استقبال وحفظ وظيفة: ${newJob.title}`);
    return NextResponse.json(newJob, { status: 201 });
  } catch (err) {
    console.error("خطأ في الاستقبال:", err);
    return NextResponse.json({ error: "فشل الاستقبال" }, { status: 500 });
  }
}

export async function GET() {
  const jobs = readJobs();
  // ترتيب من الأحدث للأقدم
  const sortedJobs = jobs.sort(
    (a: any, b: any) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
  return NextResponse.json(sortedJobs);
}