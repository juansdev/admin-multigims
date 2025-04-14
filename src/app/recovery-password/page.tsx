"use client"

import React from "react";
import {RecoveryPasswordForm} from "@/components/recovery-password-form";

export default function ForgetPassword() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RecoveryPasswordForm/>
            </div>
        </div>
    );
}