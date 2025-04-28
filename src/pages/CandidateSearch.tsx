import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import axios from 'axios';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("https://api.github.com/users?since=100");
        const userDetails = await Promise.all(
          response.data.slice(0, 10).map((user) => axios.get(user.url))
        );
        const detailedUsers = userDetails.map((res) => res.data);
        setCandidates(detailedUsers);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      }
    };

    fetchCandidates();
  }, []);

  const handleAccept = () => {
    const current = candidates[currentIndex];
    const updatedSaved = [...savedCandidates, current];
    setSavedCandidates(updatedSaved);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedSaved));
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (candidates.length === 0) {
    return <p>Loading candidates...</p>;
  }

  if (currentIndex >= candidates.length) {
    return <p>No more candidates are available.</p>;
  }

  const candidate = candidates[currentIndex];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Candidate Search</h1>

      <div className="card">
        <h2>{candidate.name || "Name not available"}</h2>
        <img src={candidate.avatar_url} alt={candidate.login} width="150" />
        <p><strong>Username:</strong> {candidate.login}</p>
        <p><strong>Location:</strong> {candidate.location || "N/A"}</p>
        <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
        <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
        <p><strong>GitHub:</strong> <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a></p>

        <div style={{ marginTop: "2rem" }}>
          <button onClick={handleAccept}>➕</button>
          <span style={{ margin: "0 1rem" }}></span>
          <button onClick={handleSkip}>➖</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;