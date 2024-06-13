import { useDispatch, useSelector } from "react-redux";
import { changeList, addList } from "../Features/Store/Store";

function Form() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.form.list);

  const handleListChange = (event) => {
    dispatch(changeList(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addList({ list }));
  };

  return (
    <div className="container-fluid">
      <hr />
      <h3 className="subtitle is-3" id="todo">
        TO-DO List
      </h3>
      <form onSubmit={handleSubmit}>
        <div
          className="mb-4 input-group"
          style={{ display: "flex", justifyContent: "center" }}
        >
          
          <input
          style={{flex:"0.3"}}
            type="text"
            placeholder="What do you have planned?"
            className="input "
            value={list}
            required
            onChange={handleListChange}
          />
          <button
            type="submit"
            className="btn btn-info"
            style={{ color: "white" }}
          >
            Submit
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default Form;
