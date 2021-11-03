import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { AppraisalTitles, Medals } from '../constants/enums/enums';
import Appraisal from './generic/Appraisal';
import { StyledButton } from './generic/StyledButton';
import LeaderBoard from './LeaderBoard';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: `${theme.spacing(4)}px 0`,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    letterSpacing: '0.025rem',
    color: '#1D3150',
  },
  editButton: {
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#1D3150',
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover': {
      color: '#1423144',
    },
  },
  creatorText: {
    marginTop: theme.spacing(1),
    fontSize: '12px',
    lineHeight: '14px',
    color: '#1D3150',
  },
  creatorName: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.025rem',
    color: '#1D3150',
  },
}));

function ProjectRating(props) {
  const { projects, project } = props;
  const classes = useStyles();
  const { submitForm, values } = useFormikContext();
  return (
    <Box className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title}>{'FreshAF Dashboard'}</Typography>
        {/* TODO: Add a conditional input field to update name */}
        <Typography className={classes.editButton} onClick={() => {}}>
          Edit
        </Typography>
      </Box>
      <Typography className={classes.creatorText}>Creator</Typography>
      <Typography className={classes.creatorName}>{project.created_by}</Typography>
      <Box marginY={3}>
        <Grid container spacing={1}>
          {[1, 2, 3, 4].map((_, index) => {
            return (
              <Grid key={index} item xs={6}>
                <Appraisal
                  emoji={Medals.Gold}
                  title={AppraisalTitles.ProjectLevel}
                  value={'Gold'}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Typography className={classes.creatorText}>
        Last Updated:{' '}
        {project.updated_at ? project.updated_at : project.created_at ? project.created_at : '-'}
      </Typography>
      <Box marginY={2} display="flex" justifyContent="center">
        <StyledButton
          variant="save"
          onClick={() => {
            console.log(JSON.stringify(values, null, 2));
            submitForm();
          }}
        >
          Save
        </StyledButton>
      </Box>
      <LeaderBoard projects={projects} />
    </Box>
  );
}

ProjectRating.propTypes = {
  projects: PropTypes.array,
  project: PropTypes.object,
};

export default ProjectRating;
