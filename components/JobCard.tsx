import Link from "next/link";
import type { Job } from "@/lib/types";
import styles from "./JobCard.module.css";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ar-SY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.title}>
          <Link href={`/jobs/${job.id}`}>{job.title}</Link>
        </h2>
        <span className={styles.date}>{formatDate(job.postedAt)}</span>
      </header>

      {job.company && <p className={styles.company}>{job.company}</p>}

      <p className={styles.excerpt}>
        {job.description.slice(0, 180)}
        {job.description.length > 180 ? "…" : ""}
      </p>

      <footer className={styles.foot}>
        <span className={styles.source}>{job.source}</span>
        <Link href={`/jobs/${job.id}`} className={styles.more}>
          التفاصيل ←
        </Link>
      </footer>
    </article>
  );
}