"use client";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";

// MUI
import CircularProgress from "@mui/material/CircularProgress";

export default function MedicalRecordUpload() {
    // Context
    const { medicalRecord, setMedicalRecord, medicalRecordSubmitting, setMedicalRecordSubmitting } =
        useDashboard();

    // Handlers
    const handleClick = () => {
        // Set submitting
        setMedicalRecordSubmitting(true);
        // Sleep for 3 seconds, then set the medical records file, and set submitting to false
        setTimeout(() => {
            setMedicalRecord({ url: "/assets/medical-record.pdf" });
            setMedicalRecordSubmitting(false);
        }, 3000);
    };

    // Render Upload Button
    function renderMedicalUpload() {
        return (
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    medicalRecord === null
                        ? "bg-blue-500 border-blue-500"
                        : "border-transparent text-green-600"
                )}
                onClick={handleClick}
                disabled={medicalRecord !== null || medicalRecordSubmitting}
            >
                {medicalRecord === null && !medicalRecordSubmitting && (
                    <span>Simulate Medical Record Upload</span>
                )}

                {medicalRecord === null && medicalRecordSubmitting && (
                    <span>
                        <CircularProgress size={20} />
                        <span className="ml-2">Uploading...</span>
                    </span>
                )}

                {medicalRecord !== null && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Medical Record Uploaded</span>
                    </span>
                )}
            </button>
        );
    }

    // Render
    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            {renderMedicalUpload()}
        </div>
    );
}
