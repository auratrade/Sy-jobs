// job-filter/app/jobs/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Job } from "@/lib/types";
import styles from "./page.module.css";

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // جلب الوظيفة من الـ API
    async function fetchJob() {
      try {
        const res = await fetch("/api/jobs/ingest", { cache: "no-store" });
        if (res.ok) {
          const jobs: Job[] = await res.json();
          // البحث عن الوظيفة المطابقة للـ ID
          const foundJob = jobs.find((j) => j.id === params.id);
          if (foundJob) {
            setJob(foundJob);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [params.id]);

  if (loading) return <div className={styles.loading}>جاري التحميل...</div>;
  if (error || !job) return <div className={styles.error}>الوظيفة غير موجودة.</div>;

  // استخراج اسم المصدر (القناة أو الموقع)
  const sourceName = job.source.replace("telegram:", "").replace("website:", "");
  const isTelegram = job.source.includes("telegram");

  return (
    <article className={styles.article}>
      <Link href="/" className={styles.back}>
        ← رجوع للرئيسية
      </Link>

      <h1 className={styles.title}>{job.title}</h1>

      <div className={styles.meta}>
        {/* عرض المصدر بشكل أنيق */}
        <span className={styles.sourceBadge}>
          {isTelegram ? "📡 قناة تيليجرام: " : "🌐 موقع: "}
          <strong>{sourceName}</strong>
        </span>
        
        <span className={styles.date}>
          🕒 {new Date(job.postedAt).toLocaleString("ar-SY")}
        </span>
      </div>

      {/* الوصف الكامل */}
      <div className={styles.body}>
        {job.description.split("\n").map((line, i) =>
          line.trim() ? <p key={i}>{line}</p> : <br key={i} />
        )}
      </div>

      {/* زر التقديم */}
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.applyBtn}
      >
        التقديم على الوظيفة / فتح الرابط الأصلي ←
      </a>
    </article>
  );
}