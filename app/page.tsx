"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Chatbot from "./Chatbot";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission with the selected file and input text
    // You can use libraries like axios to send the file to a server
    // Example: axios.post('/upload', { file: selectedFile, text: inputText });\
    let formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("prompt", inputText);
    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("Document and prompt uploaded");
    setSelectedFile(null);
    setInputText("");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Upload Document:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Text Input:</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          disabled={!selectedFile && inputText.trim() === ""}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>

      <h1 className="text-2xl font-bold my-4">Chatbot Interface</h1>
      <Chatbot />
    </div>
  );
}
