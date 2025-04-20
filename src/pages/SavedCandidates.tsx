import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; // Make sure this interface exists and matches your data

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when page loads
  useEffect(() => {
    const stored = localStorage.getItem('savedCandidates');
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="saved-candidates">
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <div className="candidates-grid">
          {savedCandidates.map((candidate, index) => (
            <div className="candidate-card" key={index}>
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                width="150"
              />
              <h3>{candidate.name || 'Name not available'}</h3>
              <p><strong>Username:</strong> {candidate.login}</p>
              <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
              <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
              <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
              <p>
                <strong>GitHub:</strong>{' '}
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  {candidate.html_url}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;