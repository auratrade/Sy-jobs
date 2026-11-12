// job-filter/components/FilterBar.tsx
"use client";

import { useState, useEffect } from "react";
import type { JobFilters } from "@/lib/types";
import styles from "./FilterBar.module.css";

export default function FilterBar({ onFilterChange }: { onFilterChange: (f: JobFilters) => void }) {
  const [q, setQ] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [category, setCategory] = useState(""); // 👈 حالة التصنيف

  // كلما تغير أي فلتر، نرسل التحديث للصفحة الأم
  useEffect(() => {
    onFilterChange({ q, source, sort, category });
  }, [q, source, sort, category]);

  return (
    <div className={styles.bar}>
      {/* خانة البحث */}
      <input
        type="search"
        placeholder="ابحث بالعنوان أو الشركة..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className={styles.input}
      />

      {/* فلتر التصنيف (جديد) */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.select}
      >
        <option value="">كل التصنيفات</option>
        <option value="tech">💻 وظائف تقنية</option>
        <option value="engineering">📐 هندسة</option>
        <option value="video">🎬 مونتاج</option>
        <option value="design">🎨 تصميم وتصوير</option>
        <option value="other">📁 وظائف أخرى</option>
      </select>

      {/* فلتر المصدر */}
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className={styles.select}
      >
        <option value="">كل المصادر</option>
        <option value="telegram">تيليجرام</option>
        <option value="website">المواقع</option>
      </select>

      {/* فلتر الترتيب */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
        className={styles.select}
      >
        <option value="newest">الأحدث</option>
        <option value="oldest">الأقدم</option>
      </select>
    </div>
  );
}