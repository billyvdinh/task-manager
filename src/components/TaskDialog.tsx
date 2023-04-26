import React, { FC, useEffect, useState, useId } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Task } from '@/utils/types';

type Props = {
  open: boolean;
  task: Task | null;
  onCancel: () => void;
  onSubmit: (task: Task) => void;
};

const TaskDialog: FC<Props> = ({ open, task, onCancel, onSubmit }) => {
  const [mode, setMode] = useState('Create');

  useEffect(() => {
    setMode(task?.id ? 'Update' : 'Create');
  }, [task]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: task?.name ?? '',
      description: task?.description ?? '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Name is required'),
      description: Yup.string().max(255).required('Description is required'),
    }),

    onSubmit: (values) => {
      onSubmit({
        ...values,
        id: task?.id ?? uuidv4(),
        isComplete: task?.isComplete ?? false,
      });
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{`${mode} task`}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="task-name">Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="task-name"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter task name"
                  error={Boolean(formik.touched.name && formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="task-description">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    multiline
                    rows={5}
                    id="task-description"
                    name="description"
                    placeholder="Enter task description"
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.description && formik.errors.description
                    )}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <FormHelperText error>
                      {formik.errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>
            </Grid>
            {formik.errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained">
              {mode}
            </Button>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
