import { ChakraProvider } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import Board from "./components/board/board";
import { TaskProvider } from "./context/task.context";

function App() {
  return (
    <ChakraProvider>
      <TaskProvider>
        <Heading
        fontSize={{base : '2xl', sm: '3xl', md: '4xl'}}
        textAlign='center'
        marginBottom={2}>
         Drag-and-Drop Kanban Board 📃✔️
        </Heading>
        <Board></Board>
      </TaskProvider>
    </ChakraProvider>
  );
}

export default App;
