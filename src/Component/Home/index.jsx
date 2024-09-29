import React, { useReducer } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

// Define initial state
const initialState = {
  todos: [],
  inputValue: "",
};

// Reducer function to manage both the todos and input value
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload }; // Update the input value
    case "ADD_TODO":
      if (state.inputValue.trim()) {
        return {
          ...state,
          todos: [...state.todos, { id: Date.now(), name: state.inputValue }],
          inputValue: "", // Clear input after adding
        };
      }
      return state;
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload), // Remove todo
      };
    default:
      return state;
  }
};

const Index = () => {
  // UseReducer to manage state and actions
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle input change by dispatching SET_INPUT action
  const handleInputChange = (e) => {
    dispatch({ type: "SET_INPUT", payload: e.target.value });
  };

  // Add todo by dispatching ADD_TODO action
  const addTodo = () => {
    dispatch({ type: "ADD_TODO" });
  };

  // Remove todo by dispatching REMOVE_TODO action
  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

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
                value={state.inputValue} // Controlled by reducer
                onChange={handleInputChange}
                size="small"
                sx={{ flex: "1", bgcolor: "#ccc", borderRadius: ".5rem" }}
              />
              <Button variant="contained" color="warning" onClick={addTodo}>
                <Add color="white" />
              </Button>
            </Stack>

            {/* Displaying the list of todos */}
            <Stack gap=".5rem" marginTop="1rem">
              {state.todos.map((todo) => (
                <Stack
                  key={todo.id}
                  direction="row"
                  justifyContent="space-between"
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

export default Index;
