import { useState } from 'react';

import { AxiosPublic } from './axios';
import { Project } from './projects';

export const useProjectsHook = () => {
  const [isFetching, setFetching] = useState(false);
  const [project, setProject] = useState<Project>();
  const [projectId, setProjectId] = useState<any>();
  const [projects, setProjects] = useState<Project[]>();

  const getProjectById = async (projectId: string) => {
    try {
      setFetching(true);
      const response: Project = await AxiosPublic.get(`/api/v1/project/${projectId}`);
      setProject(response);
      setFetching(false);
      return response;
    } catch (e) {
      console.log(JSON.stringify(e));
      setFetching(false);
    }
  };

  const createProject = async (name: string) => {
    try {
      setFetching(true);
      const response = await AxiosPublic.post('/api/v1/project', {
        name,
        loggedInUser: 'test@freshworks.io',
        answers: [{ questionId: 'initial', answer: 'n/a' }],
      });
      setProjectId(response);
      setFetching(false);
      return response;
    } catch (e) {
      setFetching(false);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const getAllProjects = async () => {
    try {
      setFetching(true);
      const projects: Project[] = await AxiosPublic.get('/api/v1/project');
      setProjects(projects);
      setFetching(false);
    } catch (e) {
      setFetching(false);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const updateProject = async (project: any, id: string) => {
    try {
      const response = await AxiosPublic.put(`/api/v1/project/${id}`, project);
      return response;
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
    }
  };

  return {
    isFetching,
    getProjectById,
    createProject,
    project,
    projectId,
    getAllProjects,
    projects,
    updateProject,
  };
};
