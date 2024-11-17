{isModalVisible && (
  <div className="modal">
    <div className="modal-content">
      <p>{modalMessage}</p>
      <button onClick={() => setIsModalVisible(false)}>Cancel</button>
      <button
        onClick={() => {
          setIsModalVisible(false);  // Hide modal
          nextQuestion();  // Proceed to next question
        }}
      >
        Proceed
      </button>
    </div>
  </div>
)}
