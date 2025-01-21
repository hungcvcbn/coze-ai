import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const OpeningQuestion = () => {
  const [editorContent, setEditorContent] = useState(
    `As a professional chef, I have spent years refining my skills in the kitchen. Let me guide you through the art of culinary creation.`
  );

  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "link",
      "insertImage",
      "|",
      "undo",
      "redo",
    ],
    licenseKey:
      "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzg3MTM1OTksImp0aSI6IjY1MTcwOGExLTM4NTQtNDE1Ny05Y2RhLTM3YWM1NmQzYTZhMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImZiYjZlZDBkIn0.z9jpXqk_0xL63MloHTLujo8fvSuVW6Z4S0XrLfDKygHIUCpwTpk-ZIXHx5AuPn68TYK4cXMh2DRgIp2R0zxZ1g",
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Opening text editor section */}
      <div>
        <div className='text-gray-600 mb-2'>Opening text</div>
        <div className='border rounded-md'>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={editorContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OpeningQuestion;
