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
                    bgColor={'yellow.100'}
                    rounded="lg"
                    w={"100%"}
                    minH={100}
                    boxShadow="xl">

                    <Textarea
                        as={ResizeTextarea}
                        onChange={handleChange}
                        value={t.taskTitle}
                        border="none"
                        resize="none"
                        w={"85%"}
                        minH={50}
                        fontSize={{ base: '0.5rem', md: '1rem' }}
                        fontWeight="semibold">
                    </Textarea>

                    <IconButton
                        icon={<DeleteIcon></DeleteIcon>}
                        onClick={handleDelete}>
                    </IconButton>

                </Box>
            )}

        </Draggable>
    )
}

export default Task