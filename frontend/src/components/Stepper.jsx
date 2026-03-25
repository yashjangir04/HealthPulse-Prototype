import React from 'react';
import { useEffect, useState, useRef } from 'react';

const Stepper = ({ steps, currentStep }) => {

  const [newState, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {

    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {

      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        }
      }

      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        }
      }

      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        }
      }

      count++;
    }

    return newSteps;
  };

  useEffect(() => {

    const stepsState = steps.map((step, index) =>
      Object.assign({}, {
        description: step,
        completed: false,
        highlighted: index === 0,
        selected: index === 0,
      })
    );

    stepRef.current = stepsState;

    const current = updateStep(currentStep - 1, stepRef.current);

    setNewStep(current);

  }, [steps, currentStep]);
  const displaySteps = newState.map((step, index) => {

    return (
      <div
        key={index}
        className={index !== newState.length - 1 ? "w-full flex items-center" : "flex items-center"}
      >
  
        <div className="relative flex flex-col items-center text-[#1B80FD]">
  
          <div
            className={`rounded-full transition-all duration-300 ease-in-out
            border-2 h-12 w-12 flex items-center justify-center
  
            ${step.selected
              ? "bg-[#1B80FD] text-white border-[#1B80FD] shadow-md"
              : "bg-white border-gray-300 text-gray-500"}
          `}
          >
  
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
  
          </div>
  
          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase tracking-wide
            ${step.highlighted ? "text-gray-900" : "text-gray-400"}
          `}
          >
            {step.description}
          </div>
  
        </div>
  
        {index !== newState.length - 1 && (
          <div
            className={`flex-auto border-t-2 transition-all duration-300
            ${step.completed ? "border-[#1B80FD]" : "border-gray-300"}
          `}
          ></div>
        )}
  
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;