import React, { useState, useEffect } from 'react';
import { supabase } from '../api/supabase'; // Ensure this import is correct
import '../Dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Edit state
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [updatedProject, setUpdatedProject] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const fetchProjects = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return;
    }

    const user = sessionData?.session?.user;
    if (user) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id.toString());
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on page load
  }, []);

  const handleAddProject = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return;
    }

    const user = sessionData?.session?.user;
    if (user) {
      const { error } = await supabase
        .from('projects')
        .insert([
          {
            project: newProject,
            description: newDescription,
            user_id: user.id,
            date_created: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error('Error adding project:', error);
      } else {
        setNewProject('');
        setNewDescription('');
        fetchProjects(); // Refresh the projects list
      }
    }
  };

  const handleUpdateProject = async (id: number, updatedProject: string, updatedDescription: string) => {
    const { error } = await supabase
      .from('projects')
      .update({ project: updatedProject, description: updatedDescription })
      .eq('id', id);

    if (error) {
      console.error('Could not update project:', error);
    } else {
      fetchProjects(); // Refresh the list after update
      setEditingProject(null); // Close editing mode
    }
  };

  const handleDeleteProject = async (id: number) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
    } else {
      fetchProjects(); // Refresh the list after delete
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Your Projects</h2>

      {/* New Project Form */}
      <div className="new-project-form">
        <input
          type="text"
          placeholder="Project Name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddProject} className='cursor-pointer'>Add Project</button>
      </div>

      {/* Projects List */}
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                {editingProject === project.id ? (
                  <input
                    type="text"
                    value={updatedProject}
                    onChange={(e) => setUpdatedProject(e.target.value)}
                  />
                ) : (
                  project.project
                )}
              </td>
              <td>
                {editingProject === project.id ? (
                  <textarea
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                ) : (
                  project.description
                )}
              </td>
              <td>{new Date(project.date_created).toLocaleDateString()}</td>
              <td>
                {/* Edit button */}
                {editingProject === project.id ? (
                  <button onClick={() => handleUpdateProject(project.id, updatedProject, updatedDescription)}>
                    Save
                  </button>
                ) : (
                  <button className="Edit-button" onClick={() => {
                    setEditingProject(project.id);
                    setUpdatedProject(project.project);
                    setUpdatedDescription(project.description);
                  }}>
                    Edit
                  </button>
                )}
                {/* Delete button */}
                <button className='Delete-button' onClick={() => handleDeleteProject(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;