import { React, useContext } from 'react';
import { TaskContext } from '../../context/task.context';
import { Container, Stack } from '@chakra-ui/react';
import Column from '../column/column';
import { DragDropContext } from 'react-beautiful-dnd';


function Board() {

  const { columns, setColumns } = useContext(TaskContext);

  const handleOnDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result
    
    if (!destination) {
        return;
    }
    
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId] 
      const destinationColumn = columns[destination.droppableId] 
      const sourceColumnItems = [...sourceColumn.items] 
      const destinationColumnItems = [...destinationColumn.items]
      const [removed] = sourceColumnItems.splice(source.index, 1) 
      destinationColumnItems.splice(destination.index, 0, removed)
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceColumnItems
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationColumnItems
        }
      });
  
    } else {
      const column = columns[source.droppableId]
      const columnItems = [...column.items]
  
      const [removed] = columnItems.splice(source.index, 1)
      columnItems.splice(destination.index, 0, removed)
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: columnItems
        }
      });
     }
  }

  return (
    <DragDropContext onDragEnd={result => handleOnDragEnd(result, columns, setColumns)}>
      <Container maxW='container.lg'>
        <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="center">
          {
            Object.entries(columns).map(([columnName, column]) => {
              return (
                <Column columnName={columnName} key={columnName} column={column}></Column>
              )
            })
          }
          </Stack>
      </Container>
    </DragDropContext>

  )
}

export default Board