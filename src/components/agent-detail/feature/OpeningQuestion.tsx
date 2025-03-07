"use client";
import React, { useState, useEffect } from "react";

import { getChatExperience, updateChatExperience } from "@/helpers/api/chatExperience";
import { setToast, setTriggerTime } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { TrashIcon } from "@/components/common/IconCommon";
import { Tooltip } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const OpeningQuestion = ({ id }: { id: string }) => {
  const [editorContent, setEditorContent] = useState("");
  const dispatch = useAppDispatch();
  const [presetQuestions, setPresetQuestions] = useState<Array<{ id: string; content: string }>>(
    []
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const saveChanges = async () => {
    try {
      const openingQuestions = presetQuestions.map(question => question.content);
      const params = {
        openingConversation: {
          openingText: editorContent,
          openingQuestions: openingQuestions,
        },
      };
      await updateChatExperience(id, params);
      dispatch(setTriggerTime(new Date().getTime()));
    } catch (error: any) {
      dispatch(setToast({ message: error.message, type: "error", show: true }));
    }
  };

  useEffect(() => {
    if (editorContent !== "" || presetQuestions.length > 0) {
      const timer = setTimeout(() => {
        saveChanges();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [editorContent, presetQuestions]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("index"));

    const items = Array.from(presetQuestions);
    const [reorderedItem] = items.splice(dragIndex, 1);
    items.splice(dropIndex, 0, reorderedItem);

    setPresetQuestions(items);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const newId = (presetQuestions.length + 1).toString();
      setPresetQuestions([...presetQuestions, { id: newId, content: newQuestion }]);
      setNewQuestion("");
    }
  };

  const handleEditQuestion = (id: string, content: string) => {
    setEditingQuestionId(id);
    setEditingContent(content);
  };

  const handleSaveEdit = (id: string) => {
    if (editingContent.trim()) {
      setPresetQuestions(
        presetQuestions.map(question =>
          question.id === id ? { ...question, content: editingContent } : question
        )
      );
      setEditingQuestionId(null);
      setEditingContent("");
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setEditingContent("");
  };

  const handleDeleteQuestion = (id: string) => {
    setPresetQuestions(presetQuestions.filter(question => question.id !== id));
  };
  const fetchChatExperience = async () => {
    try {
      const res = await getChatExperience(id);
      const openingConversation = res.data.openingConversation || {};
      setEditorContent(openingConversation.openingText || "");

      const questions = Array.isArray(openingConversation.openingQuestions)
        ? openingConversation.openingQuestions.map((content: any, index: any) => ({
            id: (index + 1).toString(),
            content: content,
          }))
        : [];

      setPresetQuestions(questions);
    } catch (error: any) {
      dispatch(setToast({ message: error.message, type: "error", show: true }));
    }
  };

  useEffect(() => {
    fetchChatExperience();
  }, []);

  return (
    <div className='flex flex-col'>
      <div>
        <div className='flex justify-between text-gray-600 mb-2 items-center gap-2'>
          <div className='text-sm font-medium'>Opening text</div>
        </div>

        <textarea
          value={editorContent}
          onChange={e => setEditorContent(e.target.value)}
          placeholder='Enter question'
          className='w-full p-3 border rounded-md h-[300px] resize-none focus:outline-none'
        />
      </div>

      <div className='mt-4'>
        <div className='flex justify-between items-center mb-2'>
          <div className='text-gray-600'>Preset opening questions</div>
        </div>

        <div className='flex flex-col gap-2'>
          {presetQuestions.map((question, index) => (
            <div
              key={question.id}
              draggable={editingQuestionId !== question.id}
              onDragStart={e => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, index)}
              className='flex items-center gap-2 p-3 border rounded-md mb-2 bg-white'
            >
              {editingQuestionId === question.id ? (
                <div className='flex flex-grow items-center gap-2'>
                  <input
                    type='text'
                    className='flex-grow outline-none p-1'
                    value={editingContent}
                    onChange={e => setEditingContent(e.target.value)}
                    autoFocus
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        handleSaveEdit(question.id);
                      }
                    }}
                    onBlur={() => handleCancelEdit()}
                  />
                </div>
              ) : (
                <>
                  <div className='cursor-move text-gray-400'>
                    <DragIndicatorIcon fontSize='small' />
                  </div>
                  <div
                    className='flex-grow cursor-pointer'
                    onClick={() => handleEditQuestion(question.id, question.content)}
                  >
                    {question.content}
                  </div>
                  <button
                    className='text-gray-400 hover:text-gray-600'
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <TrashIcon className='w-4 h-4' />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className='flex items-center gap-2 p-3 border rounded-md border-dashed'>
          <input
            type='text'
            placeholder='Enter the opening question'
            className='flex-grow outline-none'
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleAddQuestion();
              }
            }}
            onBlur={() => {
              if (newQuestion.trim()) {
                handleAddQuestion();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OpeningQuestion;
