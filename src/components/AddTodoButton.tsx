interface AddTodoButtonProps {
  onAdd: () => void;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onAdd }) => {
  return (
    <div className="text-center mb-8">
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition font-semibold"
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodoButton;
