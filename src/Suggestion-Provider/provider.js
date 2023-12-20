import React, { useState, useEffect } from "react";
import axios from "axios";

function SuggestionProvider() {
  const [Suggestion, setSuggestion] = useState('');
  const [SuggestionData, setSuggestionData] = useState([]);

  const fetchSuggestions = () => {
    axios.get('http://localhost:3001/Suggestion-Provider-Getter')
      .then(response => {
        setSuggestionData(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Suggestion-Provider', {
      Suggestion: Suggestion
    })
    .then(result => {
      console.log(result);
      window.alert("Energy Suggestion sent successfully!");
      fetchSuggestions(); // Refresh suggestions after new submission
    })
    .catch(err => {
      console.error(err);
      window.alert("An error occurred");
    });
  };

  const handleDeleteSuggestion = (id) => {
    axios.delete(`http://localhost:3001/Suggestion-Provider-Deleter/${id}`)
      .then(() => {
        window.alert("Energy Suggestion deleted successfully!");
        fetchSuggestions(); // Refresh suggestions after deletion
      })
      .catch(err => {
        console.error(err);
        window.alert("An error occurred while deleting");
      });
  };

  return (
    <div>
      <h1 className="display-1 pt-3">Send Energy Suggestions</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input type="suggestion" className="form-control" onChange={(e) => setSuggestion(e.target.value)} placeholder="Enter Energy Suggestion"></input>
        <br></br>
        <input type="submit" className="form-control" value="Submit"></input>
      </form>

      <h2 className="display-4 px-3 py-3">Suggestions from Energy Advisor:</h2>
      {SuggestionData && SuggestionData.length > 0 ? (
        <div>
          <br></br>
          {SuggestionData.map((suggestion, index) => (
            <div key={index} className="card text-white bg-dark px-3 py-3 mb-3">
              <strong>Suggestion Details:</strong> {suggestion.Suggestion} <br />
              <br></br>
              <button className="btn btn-danger" onClick={() => handleDeleteSuggestion(suggestion._id)} style={{ width: '20%' }}>Delete Suggestion</button>
            </div>
          ))}
        </div>
      ) : (
        <div className='card text-white bg-dark px-3 py-3 mb-3'>
          No energy suggestions available!
        </div>
      )}
    </div>
  );
}

export default SuggestionProvider;
