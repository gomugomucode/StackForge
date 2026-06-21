"use client";

import React from "react";
import { RegisterForm } from "./RegisterForm";

/**
 * Thin wrapper so /signup renders the same real signup experience as the
 * in-page AuthPage tabs. The previous version was a pure mock that only
 * `console.log`-ed the inputs.
 */
export function SignupForm() {
  return <RegisterForm />;
}
