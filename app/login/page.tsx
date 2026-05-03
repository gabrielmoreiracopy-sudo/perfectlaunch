import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/projects");
  }

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
