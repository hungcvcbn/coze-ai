import React from "react";
import { DragHandle, Delete } from "@mui/icons-material";

const OpeningQuestion = () => {
  const presetQuestions = [
    "Recommend a flavorful marinade for grilling",
    "Teach me how to bake a perfect souffle",
    "Help me plan a menu for a special occasion",
    "Enter the opening question",
  ];

  return (
    <div className='flex flex-col space-y-2'>
      {presetQuestions.map((question, index) => (
        <div
          key={index}
          className='flex items-center gap-3 px-4 py-3 bg-white rounded hover:bg-gray-50'
        >
          <button className='text-gray-400 cursor-move'>
            <DragHandle />
          </button>
          <span className='flex-1 text-gray-700'>{question}</span>
          <button className='text-gray-400 hover:text-gray-600'>
            <Delete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OpeningQuestion;
