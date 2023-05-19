"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Chatbot from "./Chatbot";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [inputText, setInputText] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles.length > 0 || inputText.trim() !== "") {
      // Handle form submission with the selected files and input text
      // You can use libraries like axios to send the files to a server
      // Example: axios.post('/upload', { files: selectedFiles, text: inputText });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Upload Documents:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">
            Additional Prompt:
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          disabled={selectedFiles.length === 0 || inputText.trim() === ""}
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
