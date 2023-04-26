import Head from 'next/head';
import { FC, useState } from 'react';

import { Container, Box, Button, Typography } from '@mui/material';

import { Task } from '@/utils/types';

import TaskDialog from '@/components/TaskDialog';
import TaskList from '@/components/TaskList';

const Home: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateClick = () => {
    setSelectedTask(null);
    setOpenDialog(true);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleDialogSubmit = (task: Task) => {
    if (selectedTask?.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setOpenDialog(false);
  };

  const handleCompleteToggle = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, isComplete: !t.isComplete } : t))
    );
  };

  const handleTaskEdit = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setSelectedTask(task);
      setOpenDialog(true);
    }
  };

  const handleTaskDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.reduce(
    (count, task) => (task.isComplete ? count + 1 : count),
    0
  );

  return (
    <>
      <Head>
        <title>Alfie challenge - Task Manager</title>
      </Head>

      <Container
        component="main"
        sx={{
          height: '100vh',
          width: { xs: '100%', md: '80%', xl: '60%' },
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h3">Task Manager</Typography>

        <TaskDialog
          open={openDialog}
          task={selectedTask}
          onCancel={handleDialogCancel}
          onSubmit={handleDialogSubmit}
        />

        <Box
          width="100%"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">
            {completedCount}/{tasks.length} tasks completed
          </Typography>
          <Button variant="outlined" onClick={handleCreateClick}>
            Create Task
          </Button>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TaskList
            tasks={tasks}
            onCompleteToggle={handleCompleteToggle}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
          />
        </Box>
      </Container>
    </>
  );
};

export default Home;
