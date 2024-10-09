import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"; 
import Sidebar from "../Sidebar/Sidebar"; 

type Role = 'USER' | 'ADMIN' | 'MODERATOR';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  isOnline: boolean;  
}

interface ActivityLog {
  userId: string; 
  activityType: string; 
  entityType: string; 
  entityId: string; 
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Filter states
  const [selectedRole, setSelectedRole] = useState<Role | 'ALL'>('ALL');
  const [isActiveFilter, setIsActiveFilter] = useState<'true' | 'false' | 'ALL'>('ALL');
  const [isOnlineFilter, setIsOnlineFilter] = useState<'true' | 'false' | 'ALL'>('ALL'); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (session?.user.role === "USER") {
      setError('You cannot fetch users in this section.');
      return;
    }
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Network response was not ok');
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: Role) => {
    if (session?.user.id === userId) {
      setError('You cannot change your own role.');
      return;
    }
    if (session?.user.role !== "ADMIN") {
      setError('You cannot change roles of others.');
      return;
    }
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (!response.ok) throw new Error('Failed to update user role');
      fetchUsers(); 
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (session?.user.id === userId) {
      setError('You cannot delete your own account.');
      return;
    }
    if (session?.user.role !== "ADMIN") {
      setError('You do not have permission to delete accounts.');
      return;
    }

    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };
  
  const toggleUserStatus = async (user: User) => {
    if (session?.user.id === user.id) {
      setError('You cannot change your own status.');
      return;
    }
    if (session?.user.role === "USER") {
      setError('You do not have permission to change account status');
      return;
    }

    if (session?.user.role === "MODERATOR" && user.role === "ADMIN") {
      setError('Moderators cannot change the status of admins.');
      return;
    }

    const newStatus = !user.isActive;  
    try {
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, role: user.role, isActive: newStatus }),  
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Error toggling user status:', error);
      setError('Failed to toggle user status.');
    }
  };

  const fetchActivityLogs = async (userId: string) => {
    try {
      if ((session?.user.role !== "ADMIN") && (session?.user.role !== "MODERATOR")) {
        setError('You do not have permission to view activity logs.');
        return;
      }

      const user = users.find(u => u.id === userId);
      if (user && user.role === "ADMIN" && session?.user.role === "MODERATOR") {
        setError('Moderators cannot view admin activity logs.');
        return;
      }

      const response = await fetch(`/api/users/activity?id=${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch activity logs: ${response.statusText}`);
      }

      const logs: ActivityLog[] = await response.json();
      setActivityLogs(logs); 
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      setError('Failed to fetch activity logs.'); 
    }
  };

  const handleShowLogs = (userId: string) => {
    setSelectedUserId(userId); 
    fetchActivityLogs(userId); 
  };

  // Display the logged-in user's info
  const renderUserInfo = () => {
    if (status === "loading") {
      return <p>Loading session...</p>;
    }

    if (status === "authenticated") {
      return (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Logged in as: {session.user.name || session.user.email}</h2>
          <p>Role: {session.user.role}</p>
        </div>
      );
    }

    return <p>You are not logged in.</p>;
  };

  const filteredUsers = users.filter(user => {
    const roleMatch = selectedRole === 'ALL' || user.role === selectedRole;
    const activeMatch = isActiveFilter === 'ALL' || (isActiveFilter === 'true' ? user.isActive : !user.isActive);
    const onlineMatch = isOnlineFilter === 'ALL' || (isOnlineFilter === 'true' ? user.isOnline : !user.isOnline); 

    return roleMatch && activeMatch && onlineMatch;
  });

  return (
    <div className="flex">
      <Sidebar user={session?.user || null} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        {renderUserInfo()} 
        <div className="mb-4">
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as Role | 'ALL')}>
            <option value="ALL">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="MODERATOR">Moderator</option>
          </select>
          <select value={isActiveFilter} onChange={(e) => setIsActiveFilter(e.target.value as 'true' | 'false' | 'ALL')}>
            <option value="ALL">All Activity Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <select value={isOnlineFilter} onChange={(e) => setIsOnlineFilter(e.target.value as 'true' | 'false' | 'ALL')}>
            <option value="ALL">All Online Status</option>
            <option value="true">Online</option>
            <option value="false">Offline</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-600">{error}</p>}
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-4">Name</th>
                  <th className="border border-gray-300 p-4">Email</th>
                  <th className="border border-gray-300 p-4">Role</th>
                  <th className="border border-gray-300 p-4">Status</th>
                  <th className="border border-gray-300 p-4">Online</th> 
                  <th className="border border-gray-300 p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
                    <td className="border border-gray-300 p-4">{user.name}</td>
                    <td className="border border-gray-300 p-4">{user.email}</td>
                    <td className="border border-gray-300 p-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MODERATOR">Moderator</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <button onClick={() => toggleUserStatus(user)}>
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                    <td className="border border-gray-300 p-4">{user.isOnline ? 'Online' : 'Offline'}</td> 
                    <td className="border border-gray-300 p-4">
                      <button onClick={() => handleShowLogs(user.id)}>View Logs</button>
                      <button onClick={() => handleDeleteUser(user.id)} className="ml-2 text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            {selectedUserId && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Activity Logs</h2>
                  <button className="text-red-500" onClick={() => setSelectedUserId(null)}>Close</button>
                  {activityLogs.length === 0 ? (
                    <p className="text-gray-500 mt-4">No activity logs found.</p>
                  ) : (
                    <table className="min-w-full border border-gray-300 mt-4">
                      <thead>
                        <tr>
                          <th className="border-b border-gray-300 p-2 text-left">Activity Type</th>
                          <th className="border-b border-gray-300 p-2 text-left">Entity Type</th>
                          <th className="border-b border-gray-300 p-2 text-left">Entity ID</th>
                          <th className="border-b border-gray-300 p-2 text-left">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityLogs.map((log) => (
                          <tr key={log.entityId} className="hover:bg-gray-100 transition duration-200">
                            <td className="border-b border-gray-300 p-2">{log.activityType}</td>
                            <td className="border-b border-gray-300 p-2">{log.entityType}</td>
                            <td className="border-b border-gray-300 p-2">{log.entityId}</td>
                            <td className="border-b border-gray-300 p-2">
                              {new Date(log.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
