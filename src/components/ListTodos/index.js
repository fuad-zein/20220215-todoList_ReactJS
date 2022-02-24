import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodos,
  detailTodos,
  getListTodos,
} from "../../actions/todosAction";
import todos from "../../reducers/todos";
import AddTodos from "../AddTodos";

function ListTodos() {
  const {
    getListTodosResult,
    getListTodosLoading,
    getListTodosError,
    deleteTodosResult,
  } = useSelector((state) => state.TodosReducer);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  // const colors = [
  //   {
  //     primaryColor: "#5D93E1",
  //     secondaryColor: "#ECF3FC",
  //   },
  //   {
  //     primaryColor: "#F9D288",
  //     secondaryColor: "#FEFAF1",
  //   },
  //   {
  //     primaryColor: "#5DC250",
  //     secondaryColor: "#F2FAF1",
  //   },
  //   {
  //     primaryColor: "#F48687",
  //     secondaryColor: "#FDF1F1",
  //   },
  //   {
  //     primaryColor: "#B964F7",
  //     secondaryColor: "#F3F0FD",
  //   },
  // ];

  useEffect(() => {
    dispatch(getListTodos());
  }, [dispatch]);

  useEffect(() => {
    if (deleteTodosResult) {
      dispatch(getListTodos());
    }
  }, [deleteTodosResult, dispatch]);

  return (
    <div>
      {getListTodosResult ? (
        getListTodosResult.map((todos) => {
          return (
            <div className="card-wrapper mr-5" key={todos.id}>
              <div
                className="card-top"
                style={{ backgroundColor: "lightgreen" }}
              ></div>
              <div className="task-holder">
                <span
                  className="card-header"
                  style={{
                    backgroundColor: "lightgreen",
                    borderRadius: "10px",
                  }}
                >
                  {todos.title}
                </span>
                <p className="mt-3">{todos.description}</p>
                <div style={{ position: "absolute", bottom: 20, right: 20 }}>
                  <i
                    onClick={() =>
                      setModal(true) && dispatch(detailTodos(todos))
                    }
                    className="far fa-edit"
                    style={{
                      color: "lightgreen",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                  ></i>
                  <i
                    onClick={() => dispatch(deleteTodos(todos.id))}
                    className="fas fa-trash-alt"
                    style={{
                      color: "lightgreen",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>
              </div>
              <AddTodos modal={modal} toggle={toggle} />
            </div>
          );
        })
      ) : getListTodosLoading ? (
        <div>Loading...</div>
      ) : (
        <div>{getListTodosError ? getListTodosError : "Data Kosong"}</div>
      )}
    </div>
  );
}

export default ListTodos;
