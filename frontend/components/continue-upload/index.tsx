"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDashboard } from "@/context/dashboard-context";

import classNames from "classnames";
import { FaCheck } from "react-icons/fa";

export default function ContinueUpload() {
    // Router
    const router = useRouter();

    // Context
    const { caseId, guidelinesFile, medicalRecord } = useDashboard();

    // Handlers
    const handleContinue = () => {
        router.push(`/dashboard/case/${caseId}`);
    };

    // Render
    return (
        <div>
            {guidelinesFile && medicalRecord ? (
                <button
                    className="bg-green-600 font-medium text-white py-2 px-4 rounded"
                    onClick={handleContinue}
                >
                    Continue
                </button>
            ) : (
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">
                        Upload Guidelines and Medical Record to continue
                    </p>
                </div>
            )}
        </div>
    );
}
