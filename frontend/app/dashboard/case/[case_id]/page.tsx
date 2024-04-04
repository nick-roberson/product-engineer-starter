"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

// My Imports
import getAPIClient from "@/components/get_client";
import { Case } from "@/api";
import { EvidenceItem, EvidenceItemFromJSON } from "@/api";
import { Option, OptionFromJSON } from "@/api";
import { LogicItem, LogicItemFromJSON } from "@/api";

// MUI Imports
import FaceIcon from "@mui/icons-material/Face";
import {
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
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
function displayBasicCaseData(caseData: Case | null) {
    // If no case data is available, return a message
    if (!caseData) {
        return <Typography variant="body1">No case data available.</Typography>;
    }

    // Status chip color based on status ("submitted", "processing", "complete")
    let statusColor = "grey";
    if (caseData.status === "submitted") {
        statusColor = "grey";
    } else if (caseData.status === "processing") {
        statusColor = "orange";
    } else if (caseData.status === "complete") {
        statusColor = "green";
    }

    // If case data is available, return basic data in a centered format
    return (
        <Box style={{ textAlign: "center", alignItems: "center" }}>
            <Typography variant="h4" gutterBottom>
                {caseData.caseId.toUpperCase()}
            </Typography>

            <Stack
                direction="row"
                spacing={1}
                alignContent={"center"}
                justifyContent={"center"}
                style={{ margin: "20px" }}
            >
                <Chip
                    label={`STATUS: ${caseData.status}`}
                    variant="outlined"
                    sx={{ backgroundColor: statusColor, color: "white" }}
                />
                <Chip label={`Submitted: ${caseData.createdAt}`} variant="outlined" />
                <Chip label={`Started: ${caseData.updatedAt}`} variant="outlined" />
                <Chip
                    label={`Record Age (seconds): ${caseData.timeSinceUpload}`}
                    variant="outlined"
                />
            </Stack>
        </Box>
    );
}

// Function to display extra case data
function displayExtraCaseData(caseData: Case | null) {
    // If no case data is available, return a message
    if (!caseData) {
        return <Typography variant="body1">No case data available.</Typography>;
    }

    // Parse the CPT Codes
    let cptCodes = caseData.cptCodes ? caseData.cptCodes.join(", ") : "No CPT Codes available.";

    // Return the extra case data
    return (
        <Box>
            <Divider variant="middle" style={{ margin: "20px" }}>
                <Typography variant="h6">Information</Typography>
            </Divider>

            <Stack direction="row" spacing={1} style={{ margin: "20px" }}>
                <Chip
                    label={`Is Met: ${caseData.isMet}`}
                    variant="outlined"
                    color={caseData.isMet ? "success" : "error"}
                />
                <Chip
                    label={`Is Final: ${caseData.isComplete}`}
                    variant="outlined"
                    color={caseData.isComplete ? "success" : "error"}
                />
            </Stack>

            <Typography variant="body1" style={{ margin: "20px" }}>
                <b>Procedure Name:</b>{" "}
                {(caseData.procedureName as string) || "No procedure name available."}
            </Typography>

            <Typography variant="body1" style={{ margin: "20px" }}>
                <b>CPT Codes:</b> {cptCodes}
            </Typography>

            <Typography variant="body1" style={{ margin: "20px" }}>
                <b>Summary:</b> {(caseData.summary as string) || "No summary available."}
            </Typography>
        </Box>
    );
}

// Function to display options
function displayOptions(options: Array<Option>) {
    // Parse the options
    const options_json = options.map((option) => OptionFromJSON(option));
    if (!options_json) {
        return <Typography variant="body1">No options available.</Typography>;
    }

    // Order by selected (True first, False last)
    options_json.sort((a, b) => (a.selected === b.selected ? 0 : a.selected ? -1 : 1));

    // Render
    return (
        <Box>
            <Divider variant="middle" style={{ margin: "20px" }}>
                <Typography variant="h6">Options</Typography>
            </Divider>
            <Stack direction="column" spacing={2} style={{ marginBottom: "20px" }}>
                {options_json.map((option, index) => (
                    <Chip
                        key={index}
                        label={`${option.key}: ${option.text}`}
                        variant="outlined"
                        style={{ margin: "10px", textAlign: "left" }}
                        color={option.selected ? "success" : "default"}
                    />
                ))}
            </Stack>
        </Box>
    );
}

// Function to display logic
function displayLogic(logic: Array<LogicItem>) {
    // Parse the logic
    const logic_json = logic.map((item) => LogicItemFromJSON(item));
    if (!logic_json) {
        return <Typography variant="body1">No logic available.</Typography>;
    }

    // Order by selected (True first, False last)
    logic_json.sort((a, b) => (a.selected === b.selected ? 0 : a.selected ? -1 : 1));

    // Render
    return (
        <Box>
            <Divider variant="middle" style={{ margin: "20px" }}>
                <Typography variant="h6">Logic Steps</Typography>
            </Divider>
            <Stack direction="column" spacing={2} style={{ marginBottom: "20px" }}>
                {logic_json.map((logic_item, index) => (
                    <Chip
                        key={index}
                        label={`${logic_item.text}`}
                        variant="outlined"
                        style={{ margin: "10px", textAlign: "left" }}
                        color={logic_item.selected ? "success" : "default"}
                    />
                ))}
            </Stack>
        </Box>
    );
}

// Function to display evidence
function displayEvidence(evidence: Array<EvidenceItem>) {
    // Parse the evidence
    const evidence_json = evidence.map((item) => EvidenceItemFromJSON(item));
    if (!evidence_json) {
        return <Typography variant="body1">No evidence available.</Typography>;
    }

    // Render
    return (
        <Box>
            <Divider variant="middle" style={{ margin: "20px" }}>
                <Typography variant="h6">Evidence</Typography>
            </Divider>
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
        </Box>
    );
}

// Function to display steps and their data
function displaySteps(caseData: Case) {
    // Pull out evidence and steps into their own lists
    let steps = caseData.steps;
    if (!steps || caseData.status !== "complete") {
        return (
            <Container style={{ margin: "20px" }}>
                <Divider variant="middle" style={{ margin: "20px" }}>
                    <Typography variant="h6">Steps</Typography>
                </Divider>
                <Typography variant="body1">
                    No steps data available. Record may still be processing!{" "}
                </Typography>
            </Container>
        );
    }

    // Map the steps to an accordion
    let stepData = steps.map((step, index) => {
        let evidence = step.evidence as Array<EvidenceItem>;
        return (
            <Accordion key={index} style={{ marginBottom: "20px" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Question: {step.question}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Divider variant="middle" style={{ margin: "20px" }}>
                        <Typography variant="h6">Decisions</Typography>
                    </Divider>
                    <Stack direction="row" spacing={2}>
                        <Chip label={`Decision: ${step.decision}`} variant="outlined" />
                        <Chip label={`Next Step: ${step.nextStep}`} variant="outlined" />
                        <Chip
                            label={`Is Met: ${step.isMet}`}
                            variant="outlined"
                            color={step.isMet ? "success" : "error"}
                        />
                        <Chip
                            label={`Is Final: ${step.isFinal}`}
                            variant="outlined"
                            color={step.isFinal ? "success" : "error"}
                        />
                    </Stack>

                    <Divider variant="middle" style={{ margin: "20px" }}>
                        <Typography variant="h6">Reasoning</Typography>
                    </Divider>
                    <Typography variant="body1">{step.reasoning}</Typography>

                    {step.options && displayOptions(step.options as Array<Option>)}
                    {step.logic && displayLogic(step.logic as Array<LogicItem>)}
                    {evidence && displayEvidence(evidence as Array<EvidenceItem>)}
                </AccordionDetails>
            </Accordion>
        );
    });

    // Return the step data
    return (
        <Container style={{ margin: "20px" }}>
            <Divider variant="middle" style={{ margin: "20px" }}>
                <Typography variant="h6">Steps</Typography>
            </Divider>
            {stepData}
        </Container>
    );
}

// Display message in center of screen if case data is loading or there is an error
function displayLoadingOrError(message: string) {
    // If no message, display loading message
    if (!message) {
        return (
            <Container style={{ margin: "20px" }}>
                <Typography variant="body1" align="center">
                    Loading your case, please wait...
                </Typography>
            </Container>
        );
    }

    // If there is a message, display the message
    return (
        <Container style={{ margin: "20px" }}>
            <Typography variant="body1" align="center">
                {message}
            </Typography>
        </Container>
    );
}

export default function CaseResult() {
    // Initialize the API client
    const apiClient = getAPIClient();

    // State to hold case data
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [message, setMessage] = useState<string>("");

    // Function to fetch data
    function fetchData() {
        // Get the case ID
        const urlSegments = window.location.href.split("/");
        const caseId = urlSegments[urlSegments.length - 1];

        // Get and set the case data
        apiClient
            .getCaseCasesCaseIdGet({ caseId: caseId })
            .then((data) => {
                console.log(data);
                setCaseData(data);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    // If there is a 404 error, display a message
                    setCaseData(null);
                    setMessage(
                        "Could not find case data for this case ID. Try refreshing the page or checking the URL."
                    );
                    return;
                } else if (error.response.status === 500) {
                    // If there is a 500 error, display a message
                    setCaseData(null);
                    setMessage("Internal server error. Please try again later.");
                    return;
                }

                // If there is any other error, just display a message
                console.error(error);
                setCaseData(null);
                setMessage("Error fetching case data, for more information see the console.");
            });
    }

    // Fetch data on a candence
    useEffect(() => {
        // Run the fetch data function
        fetchData();

        // Refresh data every 5 seconds
        const interval = setInterval(fetchData, 5000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, []);

    // Display the data
    return (
        <div style={{ margin: "20px" }}>
            {caseData ? (
                <div>
                    <ToastContainer />
                    <Grid container spacing={1} xs={12}>
                        <Grid item xs={12}>
                            {displayBasicCaseData(caseData)}
                        </Grid>

                        <Grid item xs={4}>
                            {displayExtraCaseData(caseData)}
                        </Grid>

                        <Grid item xs={8}>
                            {displaySteps(caseData)}
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <Container>{displayLoadingOrError(message)}</Container>
            )}
        </div>
    );
}
