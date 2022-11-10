import { React, useContext } from 'react';
import Task from '../task/task';
import { TaskContext } from '../../context/task.context';
import { AddIcon } from '@chakra-ui/icons';
import {
    Box,
    Heading,
    Badge,
    IconButton,
    Stack,
} from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';


function Column({ columnName, column }) {

    const { addTask } = useContext(TaskContext);

    const handleAddTask = () => {
        addTask(columnName)
    }

    return (

        <Droppable key={column.id} droppableId={column.id}>

            {(provided) => (
                <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                    <Heading textAlign="center">
                        <Badge
                            fontSize={{ base: '0.5rem', md: '1rem' }}
                            variant="subtle"
                            rounded="md"
                            p={1}
                            bgColor={column.color}>
                            {column.title}
                        </Badge>
                    </Heading>
                    <IconButton
                        icon={<AddIcon />}
                        onClick={handleAddTask}
                        w="full"
                        size="xs">

                    </IconButton>
                    <Stack
                        minHeight="70vh"
                        p={4}
                        mt={2}
                        spacing={4}
                        bgColor="gray.50"
                        rounded="lg"
                        boxShadow="md"
                        overflow="auto">
                        {
                            column.items.map((t, i) => {
                                return (<Task t={t} key={t.id} columnName={columnName} i={i}></Task>)
                            })
                        }
                        {provided.placeholder}
                    </Stack>
                </Box>
            )}

        </Droppable>

    )
}

export default Column