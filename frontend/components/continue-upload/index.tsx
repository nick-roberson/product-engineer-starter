"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDashboard } from "@/context/dashboard-context";

// Import the client and models
import getAPIClient from "@/components/get_client";
import { CreateCaseResponse } from "@/api";

export default function ContinueUpload() {
    // Router
    const router = useRouter();

    // Context
    const [apiClient] = useState(getAPIClient());
    const { guidelinesFile, medicalRecord } = useDashboard();

    // Handlers
    const handleContinue = () => {
        // Create a new case on "Continue" button click, and redirect to the case page
        apiClient.createCaseCasesPost().then((new_case: CreateCaseResponse) => {
            let caseId = new_case.caseId;
            console.log("Created Case with ID: ", caseId);
            router.push(`/dashboard/case/${caseId}`);
        });
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
