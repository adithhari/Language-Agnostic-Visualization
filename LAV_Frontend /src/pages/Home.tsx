/**
 * Home page component for the Language-Agnostic Visualization App.
 * Allows users to input Python or R scripts and generate visualizations via backend API.
 * Displays the generated visualization using an iframe.
 */
import React, { useState } from 'react';
import axios from 'axios';

/**
 * React functional component for rendering the homepage UI.
 * Includes language selection, code input area, and an iframe for displaying the result.
 */
const Home = () => {
  /**
   * The selected programming language ("python" or "r") for the script.
   */
  const [language, setLanguage] = useState('python');
  
  /**
   * The user-provided code/script to be sent to the backend for visualization.
   */
  const [code, setCode] = useState('');
  
  /**
   * The URL of the generated visualization returned from the backend.
   * Used to embed the visualization in an iframe.
   */
  const [vizUrl, setVizUrl] = useState(''); // if backend returns a URL

  /**
   * Sends the user's code and selected language to the backend to generate a visualization.
   * Updates the state with the returned visualization URL or shows an error message on failure.
   */
  const handleGenerate = async () => {
    try {
      const formData = new FormData();
      formData.append('code', code);
      formData.append('language', language);
  
      const response = await axios.post('http://127.0.0.1:8000/generate-visualization', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const fullUrl = `http://127.0.0.1:8000${response.data.url}`;
      setVizUrl(fullUrl);
      alert("Visualization generated successfully!");
  
    } catch (error) {
      console.error('Error generating visualization:', error);
      alert("Failed to generate visualization.");
    }
  };

  return (
    <div className="bg-white p-10 rounded shadow-md w-full max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Language Agnostic Visualization</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Choose Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="python">Python</option>
          <option value="r">R</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Enter Script</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Write your script here..."
        ></textarea>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Generate
      </button>

      {vizUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Output:</h2>
          <iframe src={vizUrl} title="Visualization" className="w-full h-[500px] border rounded" />
        </div>
      )}
    </div>
  );
};

export default Home;
