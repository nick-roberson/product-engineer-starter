"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

// Assuming these imports work correctly
import getAPIClient from "@/components/get_client";
import { Case, EvidenceItem } from "@/api";
import { DefaultApi } from "@/api";

// Fetch Data Return Case
async function fetchData(client: DefaultApi, case_id: string): Promise<Case> {
    return client.getCaseCasesCaseIdGet({ caseId: case_id }); // Assuming this returns a Promise<Case>
}

function displayBasicCaseData(caseData: Case) {
    return (
        <div>
            <h1>
                <b>Case ID:</b> {caseData.caseId}
            </h1>
            <p>
                <b>Created At:</b> {caseData.createdAt}
            </p>
            <p>
                <b>Updated At:</b> {caseData.updatedAt}
            </p>
            <p>
                <b>Time Since Last Update:</b> {caseData.timeSinceUpdated}
            </p>
            <p>
                <b>Status:</b> {caseData.status}
            </p>
            <p>
                <b>Procedure Name:</b>{" "}
                {caseData.procedureName
                    ? (caseData.procedureName as string)
                    : "No procedure name available."}
            </p>
            <p>
                <b>CPT Codes:</b>
            </p>
            <ul>
                {caseData.cptCodes && caseData.cptCodes.length > 0 ? (
                    caseData.cptCodes.map((code, index) => <li key={index}>{code}</li>)
                ) : (
                    <li>No CPT codes available.</li>
                )}
            </ul>
            <p>
                <b>Summary:</b>{" "}
                {caseData.summary ? (caseData.summary as string) : "No summary available."}
            </p>
            <p>
                <b>Met Criteria:</b> {caseData.isMet ? "Yes" : "No"}
            </p>
            <p>
                <b>Is Complete:</b> {caseData.isComplete ? "Yes" : "No"}
            </p>
        </div>
    );
}

function displaySteps(caseData: Case) {
    // Pull out evidence and steps into their own lists

    let steps = caseData.steps;
    if (!steps) {
        return <p>No steps data available.</p>;
    }

    let stepData = steps.map((step, index) => {
        // Pull out and cast EvidenceItem array
        let evidence = step.evidence as Array<EvidenceItem>;
        if (!evidence) {
            evidence = [];
        }

        return (
            <div key={index}>
                <h3>
                    <b>Step:</b> {step.question}
                </h3>
                <li key={index}>
                    <div>
                        <p>
                            <b>Reasoning:</b> {step.reasoning}
                        </p>
                        <p>
                            <b>Decision:</b> {step.decision}
                        </p>
                        <p>
                            <b>Next Step:</b> {step.nextStep}
                        </p>
                        <p>
                            <b>Is Met:</b> {step.isMet ? "Yes" : "No"}
                        </p>
                        <p>
                            <b>Is Final:</b> {step.isFinal ? "Yes" : "No"}
                        </p>
                    </div>
                </li>
                <h3>
                    <b>Evidence:</b>
                </h3>
                <ul>
                    {evidence && evidence.length > 0 ? (
                        evidence.map((evidence, index) => (
                            <li key={index}>
                                <div>
                                    <p>
                                        <b>Source:</b> {evidence.pdfName}
                                    </p>
                                    <p>
                                        <b>Value:</b> {evidence.content}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No evidence available.</li>
                    )}
                </ul>
            </div>
        );
    });

    return (
        <div>
            <p>
                <b>Steps:</b>
            </p>
            <ul>{stepData}</ul>
        </div>
    );
}

export default function CaseResult() {
    const [caseData, setCaseData] = useState<Case | null>(null);

    useEffect(() => {
        // Execute only on the client side
        const apiClient = getAPIClient();
        const urlSegments = window.location.href.split("/");
        const caseId = urlSegments[urlSegments.length - 1];

        // Log for debugging
        console.log("URL Segments: ", window.location.href);
        console.log("Case ID: ", caseId);

        // Set the case data
        if (caseId) {
            fetchData(apiClient, caseId)
                .then((data) => {
                    console.log(data);
                    setCaseData(data);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error fetching case data, for more information see the console.");
                });
        }
    }, []);

    return (
        <div>
            {caseData ? (
                <div>
                    <ToastContainer />
                    <h2>Case Details</h2>
                    {displayBasicCaseData(caseData)}
                    <h2>Steps</h2>
                    {displaySteps(caseData)}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
