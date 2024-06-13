import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { removeList, editList } from "../Features/Store/Store";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const selectData = (state) => state.lists.data;
const selectSearchTerm = (state) => state.lists.searchTerm;

const selectFilteredLists = createSelector(
  [selectData, selectSearchTerm],
  (data, searchTerm) =>
    data.filter((list) =>
      list.list.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectFilteredLists);

  const [editingListId, setEditingListId] = useState(null);
  const [newListText, setNewListText] = useState("");

  const handleListDelete = (list) => {
    dispatch(removeList(list.id));
  };

  const handleListEdit = (list) => {
    setEditingListId(list.id);
    setNewListText(list.list);
  };

  const handleEditChange = (event) => {
    setNewListText(event.target.value);
  };

  const handleEditSubmit = (list) => {
    dispatch(editList({ id: list.id, newList: newListText }));
    setEditingListId(null);
  };

  const handleCancelEdit = () => {
    setEditingListId(null);
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col-2" style={{ color: "#87CEEB" }}>
              SL No.
            </th>
            <th scope="col-7" style={{ color: "#87CEEB", padding:"0px" }}>
              List
            </th>
            <th scope="col-3" style={{ color: "#87CEEB" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list, i) => (
            <tr key={list.id}>
              <td>{i + 1}</td>
              <td>
                {editingListId === list.id ? (
                  <input
                  
                    type="text"
                    value={newListText}
                    onChange={handleEditChange}
                  />
                ) : (
                  list.list
                )}
              </td>
              <td>
                {editingListId === list.id ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleEditSubmit(list)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-transparent"
                      onClick={handleCancelEdit}
                      style={{color:"red",fontSize:"20px"}}
                    >
                      <ImCross />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-transparent"
                      onClick={() => handleListEdit(list)}
                      style={{color:"blue",fontSize:"25px"}}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      type="button"
                      className="btn btn-transparent"
                      onClick={() => handleListDelete(list)}
                      style={{color:"red",fontSize:"30px"}}
                    >
                      <MdDelete />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
