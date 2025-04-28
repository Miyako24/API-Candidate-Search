import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('savedCandidates');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSavedCandidates(parsed);
      setFilteredCandidates(parsed);
    }
  }, []);

  useEffect(() => {
    let filtered = [...savedCandidates];

    if (filterText) {
      filtered = filtered.filter((c) =>
        (c.name || '').toLowerCase().includes(filterText.toLowerCase()) ||
        c.login.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'location') {
      filtered.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
    }

    setFilteredCandidates(filtered);
  }, [filterText, sortBy, savedCandidates]);

  return (
    <div className="saved-candidates">
      <h1>Potential Candidates</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filter by name or username"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>

      {filteredCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <div className="candidates-grid">
          {filteredCandidates.map((candidate, index) => (
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