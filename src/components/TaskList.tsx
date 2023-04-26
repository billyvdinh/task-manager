import React, { FC } from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Task } from '@/utils/types';

type Props = {
  tasks: Task[];
  onCompleteToggle: (id: string) => void;
  onTaskEdit: (id: string) => void;
  onTaskDelete: (id: string) => void;
};

const TaskList: FC<Props> = ({
  tasks,
  onCompleteToggle,
  onTaskEdit,
  onTaskDelete,
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ borderBottom: 'solid grey 1px' }}>
          <ListItemText
            primary={task.name}
            secondary={task.description}
            sx={{ width: 'calc(100% - 120px)' }}
          />
          <Box
            sx={{ width: '120px', display: 'flex', justifyContent: 'center' }}
          >
            <Tooltip title="Mark as complete">
              <Checkbox
                value={task.isComplete}
                onChange={() => onCompleteToggle(task.id)}
              />
            </Tooltip>
            <Tooltip title="Edit task">
              <IconButton onClick={() => onTaskEdit(task.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton onClick={() => onTaskDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
