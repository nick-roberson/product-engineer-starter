"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface IUploadedFile {
    url: string;
}

interface IDashboardContext {
    // Case ID
    caseId: string;
    setCaseId: (caseId: string) => void;

    // Medical record context
    medicalRecord: IUploadedFile | null;
    setMedicalRecord: (file: IUploadedFile | null) => void;
    guidelinesFileSubmitting: boolean;
    setGuidelinesFileSubmitting: (submitted: boolean) => void;

    // Guidelines file context
    guidelinesFile: IUploadedFile | null;
    setGuidelinesFile: (file: IUploadedFile | null) => void;
    medicalRecordSubmitting: boolean;
    setMedicalRecordSubmitting: (submitted: boolean) => void;
}

const INITIAL_STATE: IDashboardContext = {
    // Case ID
    caseId: "",
    setCaseId: () => {},

    // Medical record context
    medicalRecord: null,
    setMedicalRecord: () => {},
    medicalRecordSubmitting: false,
    setMedicalRecordSubmitting: () => {},

    // Guidelines file context
    guidelinesFile: null,
    setGuidelinesFile: () => {},
    guidelinesFileSubmitting: false,
    setGuidelinesFileSubmitting: () => {}
};

export const DashboardContext = createContext(INITIAL_STATE);

export function DashboardProvider({ children }: { children: ReactNode }) {
    // Case ID
    const [caseId, setCaseId] = useState<string>("case_891a_6fbl_87d1_4326");

    // Medical record context
    const [medicalRecord, setMedicalRecord] = useState<IUploadedFile | null>(null);
    const [medicalRecordSubmitting, setMedicalRecordSubmitting] = useState<boolean>(false);

    // Guidelines file context
    const [guidelinesFile, setGuidelinesFile] = useState<IUploadedFile | null>(null);
    const [guidelinesFileSubmitting, setGuidelinesFileSubmitting] = useState<boolean>(false);

    const value = {
        caseId,
        setCaseId,
        medicalRecord,
        setMedicalRecord,
        guidelinesFile,
        setGuidelinesFile,
        medicalRecordSubmitting,
        setMedicalRecordSubmitting,
        guidelinesFileSubmitting,
        setGuidelinesFileSubmitting
    };

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    return context;
}
