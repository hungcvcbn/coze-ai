"use client";
import React, { useState } from "react";
import { Checkbox } from "@mui/material";

const AutoSuggestion = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <div>
        <div className='flex flex-col text-gray-600 mb-2 gap-2'>
          <div className='text-sm font-medium'>
            After agent response, provide at most three suggested questions based on the context and
            prompt.
          </div>
          <div className='text-14-20 font-medium flex items-center'>
            <Checkbox checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />
            <div className='text-14-20'>Custom prompt</div>
          </div>
        </div>
        {isChecked && (
          <textarea
            value={editorContent}
            onChange={e => setEditorContent(e.target.value)}
            placeholder='Enter question'
            className='w-full p-3 border rounded-md h-[300px] resize-none focus:outline-none'
          />
        )}
      </div>
    </div>
  );
};
export default AutoSuggestion;
