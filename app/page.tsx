// job-filter/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import FilterBar from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import type { Job, JobFilters } from "@/lib/types";
import styles from "./page.module.css";

// دالة لجلب البيانات من الـ API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomePage() {
  // حالة الفلاتر (البحث، المصدر، الترتيب)
  const [filters, setFilters] = useState<JobFilters>({
    q: "",
    source: "",
    sort: "newest",
    category: "",
  });

  // جلب البيانات باستخدام SWR (تحديث تلقائي كل 5 ثواني)
  const { data: jobs, error, isLoading } = useSWR<Job[]>("/api/jobs/ingest", fetcher, {
    refreshInterval: 5000,
  });

    // فلترة وترتيب الوظائف بناءً على الفلاتر
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    let result = [...jobs];

    // 1. فلترة حسب التصنيف (جديد)
    if (filters.category) {
      result = result.filter((job) => job.category === filters.category);
    }

    // 2. فلترة حسب المصدر
    if (filters.source) {
      result = result.filter((job) => job.source.startsWith(filters.source as string));
    }

    // 3. فلترة حسب البحث
    if (filters.q) {
      const query = filters.q.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
      );
    }

    // 4. الترتيب
    result.sort((a, b) => {
      const dateA = new Date(a.postedAt).getTime();
      const dateB = new Date(b.postedAt).getTime();
      return filters.sort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [jobs, filters]);

  // دالة تستقبل التغييرات من شريط البحث
  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className={styles.headerArea}>
        <h1 className={styles.heading}>آخر الوظائف </h1>
        <span className={styles.liveBadge}>
          <span className={styles.dot}></span> مباشر
        </span>
      </div>
      <p className={styles.sub}>تحديث تلقائي وسلس</p>

      {/* شريط البحث والفلترة */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* حالات التحميل والأخطاء */}
      {isLoading && !jobs && (
        <div className={styles.loading}>جاري تحميل الوظائف...</div>
      )}

      {error && (
        <div className={styles.error}>حدث خطأ في جلب البيانات</div>
      )}

      {/* حالة عدم وجود نتائج */}
      {jobs && filteredJobs.length === 0 && (
        <p className={styles.empty}>لا توجد وظائف مطابقة لبحثك.</p>
      )}

      {/* عرض البطاقات */}
      {filteredJobs.length > 0 && (
        <section className={styles.list}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      )}
    </>
  );
}