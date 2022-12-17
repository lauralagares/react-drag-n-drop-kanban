import { ChakraProvider } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import Board from "./components/board/board";
import { TaskProvider } from "./context/task.context";

function App() {
  return (
    <ChakraProvider>
      <TaskProvider>
        <Heading
        fontSize={{base : '1rem', sm: '1.5rem', md: '2rem'}}
        textAlign='center'
        marginTop={2}
        marginBottom={2}>
         Drag-and-Drop Kanban Board ✔️
        </Heading>
        <Board></Board>
      </TaskProvider>
    </ChakraProvider>
  );
}

export default App;
