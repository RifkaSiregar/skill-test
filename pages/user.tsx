import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UserPage.module.css'
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface User {
  user_id: number;
  username: string;
  role: string;
  gender: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [counter,] = useState<number>(1);
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId: number, newRole: string) => {
    try {
      await axios.patch(`/api/user?userId=${userId}`, { role: newRole });
      setShowAlert(true);
      fetchUsers();
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`/api/user?userId=${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    destroyCookie(null, 'userRole');
    router.push('/login');
  };

  useEffect(() => {
    const { userRole } = parseCookies();
    if (!userRole) {
      router.push('/login');
    }
  }, []);

  return (
    <div className={styles.container}>
      {showAlert && <div className={styles.overlay} />}
      <div style={{display:"flex", justifyContent: "flex-end"}}>
      <p className={styles.title}>User Management</p>
      <div className={styles.logout} onClick={handleLogout}>
            Logout
          </div>
          <div className={styles.buttonPost}>
              <Link className={styles.textPost} href="/homepage">Post List</Link>
            </div>
          </div>
      <div className={styles.tableContainer}>
        {loading && <p>Loading...</p>}
        {!loading && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.user_id}>
                  <td>{counter + index}</td>
                  <td>{user.username}</td>
                  <td>{user.gender}</td>
                  <td>
                    <select className={styles.select}
                      value={user.role}
                      onChange={(e) => updateUserRole(user.user_id, e.target.value)}
                    >
                      <option value="member">Member</option>
                      <option value="visitor">Visitor</option>
                    </select>
                  </td>
                  <td>
                    <button className={styles.button} onClick={() => {
                      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
                      if (confirmDelete) {
                        deleteUser(user.user_id);
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAlert && (
        <div className={styles.alert}>
          <p>Role updated successfully!</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
