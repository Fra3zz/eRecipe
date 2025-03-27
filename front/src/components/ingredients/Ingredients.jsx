
import "./../../styles/recipe-book.scss";
function IngredientList({ name }) {
  return (
      <div className="mb-2">
          <p>
              <strong>Name:</strong> {name}
          </p>
      </div>
  );
}

export default IngredientList;
