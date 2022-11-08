import { React, useContext } from 'react';
import { TaskContext } from '../../context/task.context';
import { Container, SimpleGrid } from '@chakra-ui/react';
import Column from '../column/column';
import { DragDropContext } from 'react-beautiful-dnd';


function Board() {

  const { columns, setColumns } = useContext(TaskContext);

  function handleOnDragEnd(result, columns, setColumns) {
    console.log(result)

    if (!result.destination) return
    const { source, destination } = result
  
    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId]
      console.log(sourceCol)
      const destCol = columns[destination.droppableId]
      const sourceItems = [...sourceCol.items]
      const destItems = [...destCol.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems
        }
      });
  
    } else {
      console.log("hola")
      const column = columns[source.droppableId]
      const copied = [...column.items]
  
      const [removed] = copied.splice(source.index, 1)
      copied.splice(destination.index, 0, removed)
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copied
        }
      });
     }
  }

  return (
    <DragDropContext onDragEnd={result => handleOnDragEnd(result, columns, setColumns)}>
      <Container maxW='container.lg'>
        <SimpleGrid columns={{base:3, md:3}} spacing={{ base: 2.5, md: 4 }}>
          {
            Object.entries(columns).map(([columnName, column]) => {
              return (
                <Column columnName={columnName} key={columnName} column={column}></Column>
              )
            })
          }
        </SimpleGrid>
      </Container>
    </DragDropContext>

  )
}

export default Board