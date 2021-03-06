import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { titleCase } from 'title-case';
import useFreshAf, { categories, themes, Level, Theme, Scores, Schema } from '../../hooks/freshaf';
import { Save as SaveIcon } from '@material-ui/icons';
import { FastField, Field, useFormikContext } from 'formik';
import { RenderTextField } from '../../components';
import RenderCheckboxField from '../../components/RenderCheckboxField';
import PropTypes from 'prop-types';
import { useQuestionsHook } from '../../hooks/questions';

const useStyles = makeStyles((theme) => ({
  question: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: '#FFFFFF',
  },
  progressBar: {
    margin: theme.spacing(1),
  },
  saveButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: theme.spacing(1),
    borderRadius: '0',
  },
  headerItem: {
    margin: theme.spacing(1),
    flexGrow: 1,
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  themes: {
    marginTop: '20px',
  },
  theme: {
    fontSize: '18px',
    lineHeight: '23px',
    cursor: 'pointer',
  },
  selectedTheme: {
    fontSize: '18px',
    lineHeight: '23px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  scores: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#53AAFC',
  },
  categoryText: {
    fontSize: '12px',
  },
}));

const icons: Record<Level, string> = {
  paper: '💩',
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
};

type ProjectFormProps = {
  scores: Scores;
  schema: Schema;
  hasUnsavedChanges: boolean;
  getAnswer?: Function;
  setAnswer: Function;
  saveChanges: Function;
};

const ProjectForm = (props: ProjectFormProps) => {
  const { scores, schema, hasUnsavedChanges, getAnswer, setAnswer, saveChanges } = props;
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext();
  const { projectId } = useParams<{ projectId: string }>();
  const [currentTheme, setCurrentTheme] = useState<Theme>('environments');

  // const { getQuestions, questions } = useQuestionsHook();

  // useEffect(() => {
  //   // TODO: Finish questions being fetched
  //   getQuestions();
  // }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <Box className={classes.root}>
      {!hasUnsavedChanges ? (
        <></>
      ) : (
        <Fab color="primary" className={classes.saveButton} onClick={() => saveChanges()}>
          <SaveIcon />
        </Fab>
      )}
      <Paper elevation={0} className={classes.header}>
        <Box display="flex" justifyContent="spa">
          {categories.map((category) => {
            const { total, level, nextThreshold } = scores[category];
            return (
              <Box
                className={classes.headerItem}
                key={category}
                display="flex"
                justifyContent="space-evenly"
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  {icons[level]}
                  <Typography className={classes.categoryText}>{category.toUpperCase()}</Typography>
                </Box>
                <Typography className={classes.scores}>
                  {total}
                  {nextThreshold ? ` / ${nextThreshold}` : ''}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box display="inline-block">
          <Grid container spacing={3} justifyContent="center" className={classes.themes}>
            {themes.map((theme, index) => {
              return (
                <Grid key={`${theme}${index}`} item>
                  <Typography
                    className={theme === currentTheme ? classes.selectedTheme : classes.theme}
                    onClick={() => handleThemeChange(theme)}
                  >
                    {titleCase(theme)}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Paper>
      {!schema
        ? null
        : schema.questions.map((question) => {
            return (
              <Accordion className={classes.question} key={`${projectId}/${question.id}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FormControlLabel
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    disabled={!projectId}
                    control={
                      <FastField
                        name={question.id}
                        component={RenderCheckboxField}
                        // checked={getAnswer(question.id).answer === 'yes'}
                        onChange={(event: any) => {
                          setFieldValue(question.id, event.target.checked);
                          if (event.target.checked) {
                            setAnswer({
                              questionId: question.id,
                              answer: 'yes',
                            });
                          } else {
                            setAnswer({
                              questionId: question.id,
                              answer: 'no',
                            });
                          }
                        }}
                      />
                    }
                    label={question.summary}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column" width="100%">
                    <Typography className={classes.description}>{question.description}</Typography>
                    <Field
                      inputLabelProps={{ shrink: true }}
                      label="Note"
                      component={RenderTextField}
                      name={`${question.id}-note`}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
    </Box>
  );
};

export default ProjectForm;
