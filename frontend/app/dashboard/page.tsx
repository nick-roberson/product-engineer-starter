"use client";

// Medical and Guidelines Upload Components
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import ContinueUpload from "@/components/continue-upload";

export const revalidate = 0;

export default async function DashboardRoot() {
    // Render
    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            {/* Upload Components */}
            <div className="w-full flex flex-row gap-2 items-center">
                <MedicalRecordUpload />
                <GuidelinesUpload />
            </div>

            {/* Continue Upload Components */}
            <div className="w-full py-4 flex flex-row justify-center">
                <ContinueUpload />
            </div>
        </div>
    );
}
