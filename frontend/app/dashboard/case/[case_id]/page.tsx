"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

// Assuming these imports work correctly
import getAPIClient from "@/components/get_client";
import { Case } from "@/api";

// Import converted types
import { EvidenceItem, EvidenceItemFromJSON } from "@/api";
import { Option, OptionFromJSON } from "@/api";
import { LogicItem, LogicItemFromJSON } from "@/api";

import { DefaultApi } from "@/api";

// MUI Imports
import {
    Card,
    CardContent,
    Chip,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Typography,
    Stack,
    List,
    ListItem,
    Box,
    Container,
    ListItemText
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Function to display basic case data
function displayBasicCaseData(caseData: Case) {
    return (
        <Container style={{ margin: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Case ID: {caseData.caseId}
            </Typography>

            <Divider style={{ margin: "20px 0" }}> Submission Times </Divider>

            <Stack direction="row" spacing={1}>
                <Typography variant="body1">
                    <b>Created At:</b> {caseData.createdAt}
                </Typography>
                <Typography variant="body1">
                    <b>Updated At:</b> {caseData.updatedAt}
                </Typography>
                <Typography variant="body1">
                    <b>Time Since Last Update (seconds):</b> {caseData.timeSinceUpdated}
                </Typography>
            </Stack>

            <Divider style={{ margin: "20px 0" }}> Information </Divider>

            <Typography variant="body1">
                <b>Status:</b> {caseData.status}
            </Typography>
            <Typography variant="body1">
                <b>Procedure Name:</b>{" "}
                {(caseData.procedureName as string) || "No procedure name available."}
            </Typography>
            <Typography variant="body1" component="div">
                <b>CPT Codes:</b>
                <Stack direction="row" spacing={1}>
                    {caseData.cptCodes ? (
                        caseData.cptCodes.map((code, index) => (
                            <Box key={index} component="div" bgcolor="background.paper" p={1}>
                                {code}
                            </Box>
                        ))
                    ) : (
                        <Box component="div" bgcolor="background.paper" p={1}>
                            No CPT Codes available.
                        </Box>
                    )}
                </Stack>
            </Typography>
            <Typography variant="body1">
                <b>Summary:</b> {(caseData.summary as string) || "No summary available."}
            </Typography>

            <Divider style={{ margin: "20px 0" }}> Decisions </Divider>

            <Typography variant="body1">
                <b>Met Criteria:</b> {caseData.isMet ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1">
                <b>Is Complete:</b> {caseData.isComplete ? "Yes" : "No"}
            </Typography>
        </Container>
    );
}

// Function to display options
function displayOptions(options: Array<Option>) {
    const options_json = options.map((option) => OptionFromJSON(option));
    return (
        <List>
            {options_json.length > 0 ? (
                options_json.map((option, index) => (
                    <Typography variant="body1" key={index}>
                        {option.key + ": " + option.text}
                    </Typography>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No options available." />
                </ListItem>
            )}
        </List>
    );
}

// Function to display logic
function displayLogic(logic: Array<LogicItem>) {
    const logic_json = logic.map((item) => LogicItemFromJSON(item));
    return (
        <List>
            {logic_json.length > 0 ? (
                logic_json.map((item, index) => (
                    <Typography variant="body1" key={index}>
                        {index + ": " + item.text}
                    </Typography>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No logic available." />
                </ListItem>
            )}
        </List>
    );
}

// Function to display evidence
function displayEvidence(evidence: Array<EvidenceItem>) {
    const evidence_json = evidence.map((item) => EvidenceItemFromJSON(item));
    return (
        <List>
            {evidence_json.length > 0 ? (
                evidence_json.map((item, index) => (
                    <Card key={index} variant="outlined" style={{ marginBottom: "20px" }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {item.pdfName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.content}
                            </Typography>
                            <div style={{ marginTop: "10px" }}>
                                <Chip
                                    label={`Page Number: ${item.pageNumber}`}
                                    variant="outlined"
                                />
                                {item.eventDatetime && (
                                    <Chip
                                        label={`Date: ${item.eventDatetime}`}
                                        variant="outlined"
                                        style={{ marginLeft: "10px" }}
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No evidence available." />
                </ListItem>
            )}
        </List>
    );
}

// Function to display steps and their data
function displaySteps(caseData: Case) {
    // Pull out evidence and steps into their own lists
    let steps = caseData.steps;
    if (!steps) {
        return <Typography variant="body1">No steps data available.</Typography>;
    }

    let stepData = steps.map((step, index) => {
        // Pull out and cast EvidenceItem array
        let evidence = step.evidence as Array<EvidenceItem>;
        if (!evidence) {
            evidence = [];
        }

        return (
            <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Question: {step.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        <b>Reasoning:</b> {step.reasoning}
                    </Typography>
                    <Typography variant="body1">
                        <b>Decision:</b> {step.decision}
                    </Typography>
                    <Typography variant="body1">
                        <b>Next Step:</b> {step.nextStep}
                    </Typography>
                    <Typography variant="body1">
                        <b>Is Met:</b> {step.isMet ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body1">
                        <b>Is Final:</b> {step.isFinal ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: "20px" }}>
                        Evidence:
                    </Typography>

                    <Divider style={{ margin: "10px 0" }}> Evidence </Divider>
                    {evidence && displayEvidence(evidence as Array<EvidenceItem>)}

                    <Divider style={{ margin: "10px 0" }}> Options </Divider>
                    {step.options && displayOptions(step.options as Array<Option>)}

                    <Divider style={{ margin: "10px 0" }}> Logic </Divider>
                    {step.logic && displayLogic(step.logic as Array<LogicItem>)}
                </AccordionDetails>
            </Accordion>
        );
    });

    return <Container style={{ margin: "20px" }}>{stepData}</Container>;
}

export default function CaseResult() {
    // State to hold case data
    const [caseId, setCaseId] = useState<string>("");
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [apiClient, setApiClient] = useState<DefaultApi | null>(null);

    // Function to fetch data
    async function fetchData() {
        // Check if the API client is initialized
        if (!apiClient) {
            const client = await getAPIClient();
            setApiClient(client);
        }
        if (!apiClient) {
            console.error("API client not initialized.");
            return;
        }

        // Check if the case ID is set
        if (!caseId) {
            console.error("Case ID not set.");
            return;
        }

        // Get and set the case data
        if (caseId) {
            apiClient
                .getCaseCasesCaseIdGet({ caseId: caseId })
                .then((data) => {
                    console.log(data);
                    setCaseData(data);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error fetching case data, for more information see the console.");
                });
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        // Get and set the Case Id
        const urlSegments = window.location.href.split("/");
        const caseId = urlSegments[urlSegments.length - 1];
        setCaseId(caseId);

        // Run the fetch data function
        fetchData();

        // Refresh data every 5 seconds
        const interval = setInterval(fetchData, 5000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {caseData ? (
                <Paper style={{ margin: "20px", padding: "20px" }}>
                    <ToastContainer />
                    <Typography variant="h4">Case Result</Typography>
                    {displayBasicCaseData(caseData)}
                    <Typography variant="h4">Steps</Typography>
                    {displaySteps(caseData)}
                </Paper>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
