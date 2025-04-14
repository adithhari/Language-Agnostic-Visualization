import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [vizUrl, setVizUrl] = useState(''); // if backend returns a URL

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
