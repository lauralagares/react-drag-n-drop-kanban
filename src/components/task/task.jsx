import { React, useContext } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Textarea } from '@chakra-ui/react';
import { TaskContext } from '../../context/task.context';
import ResizeTextarea from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd';

function Task({ t, i, columnName }) {

    const { deleteTask, updateTitle } = useContext(TaskContext);

    const handleDelete = () => {
        deleteTask(columnName, t.id);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        updateTitle(value, t, columnName);
    }

    return (
        <Draggable key={t.id} draggableId={t.id} index={i}>

            {(provided) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    bgColor={t.color}
                    rounded="lg"
                    w={"100%"}
                    minH={100}
                    boxShadow="xl"
                    position="relative">

                    <Textarea
                        as={ResizeTextarea}
                        onChange={handleChange}
                        value={t.taskTitle}
                        border="none"
                        resize="none"
                        w={"100%"}
                        minH={50}
                        fontWeight="semibold"
                        >
                    </Textarea>

                    <IconButton
                        icon={<DeleteIcon></DeleteIcon>}
                        onClick={handleDelete}
                        colorScheme="solid"
                        color={'gray.900'}
                        position="absolute"
                        top={0}
                        right={0}
                        zIndex={100}
                        size={"md"}>
                    </IconButton>

                </Box>
            )}

        </Draggable>
    )
}

export default Task