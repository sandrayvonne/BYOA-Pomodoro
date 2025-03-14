// ... existing code ...
const [mode, setMode] = useState<'work' | 'rest'>('work');

// Add this function to handle mode toggle
const toggleMode = () => {
  const newMode = mode === 'work' ? 'rest' : 'work';
  setMode(newMode);
  setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  setIsRunning(false);
};

return (
  <div className="text-center">
    <button
      onClick={toggleMode}
      className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {mode === 'work' ? 'Rest' : 'Work'} Mode
    </button>
    // ... existing code ...
  </div>
);