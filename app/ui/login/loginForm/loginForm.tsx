"use client";

// import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [err, setErr] = useState("");

  const authenticate = async (formData: FormData) => {
    setErr("");
    const { username, password } = Object.fromEntries(formData);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.url === null) {
        return setErr("Wrong credential");
      }
    } catch (error) {
      return "Wrong Credentials!";
    }
    //can't be inside try catch block
    redirect("/dashboard");
  };

  return (
    <form action={authenticate} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {err && err}
    </form>
  );
};

export default LoginForm;
