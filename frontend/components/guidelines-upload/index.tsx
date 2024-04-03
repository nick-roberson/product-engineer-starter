"use client";

import { useState } from "react";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";

// Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI
import CircularProgress from "@mui/material/CircularProgress";

export default function GuidelinesUpload() {
    // Context
    const {
        guidelinesFile,
        setGuidelinesFile,
        guidelinesFileSubmitting,
        setGuidelinesFileSubmitting,
        medicalRecord
    } = useDashboard();

    // Handle Upload
    const handleClick = () => {
        // Check if medical record is null, if so show user a toast
        if (medicalRecord === null) {
            toast.error("Please upload a medical record first before uploading guidelines.");
            return;
        }

        // Set submitting
        setGuidelinesFileSubmitting(true);

        // Sleep for 3 seconds, then set the guidelines file, and set submitting to false
        setTimeout(() => {
            setGuidelinesFile({ url: "/assets/guidelines.pdf" });
            setGuidelinesFileSubmitting(false);
        }, 3000);
    };

    // Render Guidelines File
    function renderGuidelinesUpload() {
        return (
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    guidelinesFile === null
                        ? "bg-orange-500 border-orange-500"
                        : "border-transparent text-green-600"
                )}
                onClick={handleClick}
                disabled={guidelinesFile !== null || guidelinesFileSubmitting}
            >
                {guidelinesFile === null && !guidelinesFileSubmitting && (
                    <span>Simulate Guidelines Upload</span>
                )}

                {guidelinesFile === null && guidelinesFileSubmitting && (
                    <span>
                        <CircularProgress size={20} />
                        <span className="ml-2">Uploading...</span>
                    </span>
                )}

                {guidelinesFile !== null && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Guidelines File Uploaded</span>
                    </span>
                )}
            </button>
        );
    }

    // Render
    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <ToastContainer />
            {renderGuidelinesUpload()}
        </div>
    );
}
