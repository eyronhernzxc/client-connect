import React from "react";
import "./RegistrationStepper.css";


export default function RegistrationStepper({
    currentStep,
    steps
}) {

    return (
        <div className="registration-stepper">

            {steps.map((step, index) => {

                const stepNumber = index + 1;

                const isActive =
                    currentStep === stepNumber;

                const isCompleted =
                    currentStep > stepNumber;


                return (
                    <React.Fragment key={step}>

                        <div
                            className={`
                                step-item
                                ${isActive ? "active" : ""}
                                ${isCompleted ? "completed" : ""}
                            `}
                        >

                            <div className="step-circle">

                                {isCompleted
                                    ? "✓"
                                    : stepNumber
                                }

                            </div>

                            <span className="step-label">
                                {step}
                            </span>

                        </div>


                        {index < steps.length - 1 && (

                            <div
                                className={`
                                    step-line
                                    ${
                                        currentStep >
                                        stepNumber
                                            ? "completed"
                                            : ""
                                    }
                                `}
                            />

                        )}

                    </React.Fragment>
                );

            })}

        </div>
    );
}