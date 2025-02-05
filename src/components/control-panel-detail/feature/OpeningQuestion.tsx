import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const OpeningQuestion = () => {
  const [editorContent, setEditorContent] = useState(
    `As a professional chef, I have spent years refining my skills in the kitchen. Let me guide you through the art of culinary creation.`
  );

  return (
    <div className='flex flex-col gap-4'>
      {/* Opening text editor section */}
      <div>
        <div className='text-gray-600 mb-2'>Opening text</div>
        <div className='border rounded-md'>
          <Editor
            apiKey='f8pjoh5n2s3es73zdc0s0li6bip329c0c8wcos51uh3l22f3'
            initialValue={editorContent}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            onEditorChange={content => {
              setEditorContent(content);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OpeningQuestion;
