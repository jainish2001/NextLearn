import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading courses...</div>}>
      <CoursesClient />
    </Suspense>
  );
}
