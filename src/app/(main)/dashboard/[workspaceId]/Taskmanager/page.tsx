"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faClock } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: number;
  name: string;
}

interface Project {
  title: string;
  description: string;
  deadline: string;
  startDate: string;
  participants: User[];
  status: 'Processing' | 'complete' | 'Overdue';

}

interface Group {
  id: number;
  name: string;
  project?: Project;
  category: string;
  createdAt: Date;
}

const dummyUsers: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Thompson' },
  { id: 5, name: 'Emily White' },
  { id: 6, name: 'Michael Brown' },
];

const GroupManager: React.FC = () => {
  const [groupName, setGroupName] = useState('');

  const [groups, setGroups] = useState<Group[]>(() => {
    try {
      const savedGroups = localStorage.getItem('groups');
      if (savedGroups) {
        return JSON.parse(savedGroups).map((group: Group) => ({
          ...group,
          createdAt: new Date(group.createdAt),
        }));
      }
    } catch (error) {
      console.error('Error parsing groups from localStorage:', error);
    }
    return [
      { id: 1, title: 'Task 1', description: '', category: 'Todo', createdAt: new Date() },
      { id: 2, title: 'Task 2', description: '', category: 'in-progress', createdAt: new Date() },
      { id: 3, title: 'Task 3', description: '', category: 'done', createdAt: new Date() },
      { id: 4, title: 'Task 4', description: '', category: 'overdue', createdAt: new Date() },
    ];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);
  const [availableParticipants, setAvailableParticipants] = useState<User[]>(dummyUsers);
  const [projectStatus, setProjectStatus] = useState<'Processing' | 'complete' | 'Overdue'>('Processing');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleDragStart = (event: React.DragEvent, taskId: number) => {
    event.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDrop = (event: React.DragEvent, category: string) => {
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    const updatedTasks = groups.map((group) =>
      group.id === taskId ? { ...group, category } : group
    );
    setGroups(updatedTasks);
  };

  const getCountForCategory = (category: string) => {
    return groups.filter((group) => group.category === category).length;
  };

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      const newGroup: Group = {
        id: Date.now(),
        category: 'Todo',
        createdAt: new Date(),
        name: groupName.trim(),
        project: undefined,
      };
      setGroups([...groups, newGroup]);
      setGroupName('');
    }
  };

  const handleDeleteProject = () => {
    const updatedGroups = groups.filter((group) => group.id !== selectedGroupId);
    setGroups(updatedGroups);
    handleModalClose();
  };

  const handleGroupClick = (groupId: number) => {
    const group = groups.find((group) => group.id === groupId);
    if (group && group.project) {
      const { title, description, deadline, startDate, participants, status } = group.project;
      setProjectTitle(title);
      setProjectDescription(description);
      setProjectDeadline(deadline);
      setProjectStartDate(startDate);
      setSelectedParticipants(participants);
      setProjectStatus(status);
    } else {
      setProjectTitle('');
      setProjectDescription('');
      setProjectDeadline('');
      setProjectStartDate('');
      setSelectedParticipants([]);
      setProjectStatus('Processing');
    }
    setSelectedGroupId(groupId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedGroupId(null);
    setModalOpen(false);
  };

  const handleSaveProject = () => {
    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroupId) {
        const updatedProject: Project = {
          title: projectTitle,
          description: projectDescription,
          deadline: projectDeadline,
          startDate: projectStartDate,
          participants: selectedParticipants,
          status: projectStatus,
        };
        return {
          ...group,
          project: updatedProject,
        };
      }
      return group;
    });
    setGroups(updatedGroups);
    handleModalClose();
  };

  const handleAddParticipant = (userId: number) => {
    const userToAdd = availableParticipants.find((user) => user.id === userId);
    if (userToAdd) {
      setSelectedParticipants([...selectedParticipants, userToAdd]);
      setAvailableParticipants(availableParticipants.filter((user) => user.id !== userId));
    }
  };

  const handleRemoveParticipant = (userId: number) => {
    const userToRemove = selectedParticipants.find((user) => user.id === userId);
    if (userToRemove) {
      setSelectedParticipants(selectedParticipants.filter((user) => user.id !== userId));
      setAvailableParticipants([...availableParticipants, userToRemove]);
    }
  };

  return (
    <div className=" p-4">

      <div className="flex space-x-2 mb-4">
        <input
          className="border p-2 w-64 rounded-lg"
          type="text"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          placeholder="Enter group name"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreateGroup}>
          Add Team
        </button>
      </div>

      <div className="flex space-x-4 mt-4">
        {['Todo', 'in-progress', 'done', 'overdue'].map((status) => (
          <div
            key={status}
            className="flex-1 p-4 rounded-md "
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, status)}
          >
            <div className="flex items-center mb-2">
              <h2 className="text-lg font-bold">{status}</h2>
              <div className="circle ml-2 bg-gray-500 text-white flex justify-center items-center w-6 h-6 rounded-full">
                {getCountForCategory(status)}
              </div>
            </div>
            {groups.filter((group) => group.category === status).map((group) => (
              <div
                key={group.id}
                className="p-4 my-2 border border-gray-300 rounded-md cursor-pointer"
                onClick={() => handleGroupClick(group.id)}
                style={{
                  height: '10vh',   // Set a percentage height using viewport height (vh)
                  width: '90%', // Set a percentage width
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
                draggable
                onDragStart={(event) => handleDragStart(event, group.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{group.name}</p>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="text-gray-500 cursor-pointer"
                  />
                </div>
                {group.project && (
                  <>
                    <hr className="my-2" />
                    <div className="flex items-center text-sm">
                      <FontAwesomeIcon icon={faClock} className="text-gray-600 mr-1" />
                      <p className="text-gray-600">{group.project.deadline}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
            {groups.filter((group) => group.category === status).length === 0 && (
              <p className="text-gray-500">No groups</p>
            )}
          </div>
        ))}
      </div>


      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-2/4 max-w-screen-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Project Details</h2>
              <div className="relative">
                <button
                  className={`border rounded px-3 py-1 ${projectStatus === 'Processing'
                    ? 'border-blue-500 bg-blue-100 text-blue-600 '
                    : projectStatus === 'complete'
                      ? 'border-green-600 bg-green-100 text-green-600'
                      : 'border-red-600 bg-red-100 text-red-600'
                    }`}
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                >
                  {projectStatus}
                  {statusDropdownOpen && (
                    <ul className="absolute top-full left-0 bg-white border rounded-lg shadow-lg">
                      {['complete', 'Overdue', 'Processing'].map((status) => (
                        <li
                          key={status}
                          onClick={() => {
                            setProjectStatus(status as 'complete' | 'Overdue' | "Processing");
                            setStatusDropdownOpen(false);
                          }}
                          className="cursor-pointer hover:bg-gray-200 px-3 py-2"
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              </div>
            </div>
            <label className="block font-semibold">
              Title:

            </label> <input
              type="text"
              className="p-2 w-full mb-4 rounded-lg border-none bg-transparent focus:outline-none"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <label className="block font-semibold ">
              Description:

            </label>
            <textarea
              className="p-2 mb-4 w-full rounded-lg border-none bg-transparent focus:outline-none"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            <hr />
            <div className="flex mt-4 space-x-2 mb-4">
              <label className="block mb-4">
                Deadline:
                <input
                  type="date"
                  className="p-2 w-full rounded-lg border-none bg-transparent focus:outline-none"
                  value={projectDeadline}
                  onChange={(e) => setProjectDeadline(e.target.value)}
                />
              </label>
              <label className="block mb-4">
                Start Date:
                <input
                  type="date"
                  className="p-2 w-full rounded-lg border-none bg-transparent focus:outline-none"
                  value={projectStartDate}
                  onChange={(e) => setProjectStartDate(e.target.value)}
                />
              </label>
            </div>
            <hr />
            <div className="mb-4 mt-4">

              <select
                className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                onChange={(e) => handleAddParticipant(parseInt(e.target.value, 10))}
              >
                <option value="">Select participant...</option>
                {availableParticipants.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center bg-gray-200 p-2 rounded-lg">
                  <span className="mr-2">{participant.name}</span>
                  <button
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className="text-black-500 font-bold"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteProject}
              >
                Delete Project
              </button>
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleSaveProject}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}










    </div>
  );
};

export default GroupManager;
