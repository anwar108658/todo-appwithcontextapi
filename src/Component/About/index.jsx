import { Add } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useReducer } from "react";

const reducer = (state,action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {...state,inputValue:action.payload}
      break;  
    case "ADD_TODO":
      if(state.inputValue.trim()){
        return {
          ...state,
          todos:[...state.todos,{id:Math.floor(Math.random() * 1000 +1),name:state.inputValue}]
        }
      }
      return state;
      break;
    case "REMOVE_TODO":
      return {
        ...state,
        todos:[...state.todos.filter((item) => item.id != action.payload)]
      }
      break;
    default:
      return state
      break;
  }
  console.log(state)
}
const index = () => {

  const [state,dispatch] = useReducer(reducer,{todos:[],inputValue:""})


  const onChangeHandler = (e) => {
    dispatch({ type: "SET_INPUT", payload: e.target.value });
  }
  const addTodo = (e) => {
    dispatch({type:"ADD_TODO"})
  }
  const removeTodo = (id) => {
    dispatch({type:"REMOVE_TODO",payload:id})
  }
  return (
    <>
      <Box
        component="main"
        sx={{ bgcolor: "#333", width: "100%", height: "100vh", color: "#fff" }}
      >
        <Container sx={{ padding: "5rem 1rem" }}>
          <Stack maxWidth="400px" margin="0 auto" gap=".5rem">
            <Stack alignItems="center">
              <Typography variant="h3">Todo App</Typography>
            </Stack>
            <Stack direction="row" gap="1rem">
              <TextField
                name="name"
                size="small"
                value={state.inputValue}
                onChange={onChangeHandler}
                sx={{ flex: "1", bgcolor: "#ccc", borderRadius: ".5rem" }}
              />
              <Button variant="contained" color="warning" onClick={addTodo}>
                <Add color="white" />
              </Button>
            </Stack>
            <Stack gap=".5rem" marginTop="1rem">
              {state.todos.map((todo) => (
                <Stack
                  key={todo.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    bgcolor: "#555",
                    padding: "0.5rem 1rem",
                    borderRadius: ".5rem",
                  }}
                >
                  <Typography>{todo.name}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => removeTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default index;
