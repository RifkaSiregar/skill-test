import { useState } from 'react';
import styles from '../styles/Login.module.css'
import Link from 'next/link';
import Image from 'next/image'
import imagePage from '../public/image.png'
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { userRole } = parseCookies();
    if (userRole) {
      router.push('/homepage');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3 || username.length > 20) {
      setError('Username must be between 3 and 20 characters');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, gender }),
      });

      if (response.ok) {
        console.log('Registration successful');
        setShowAlert(true);
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Error registering:', err);
      setError('An error occurred, please try again');
    }
  };

  const handleAlertOK = () => {
    setShowAlert(false);
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      {showAlert && <div className={styles.overlay} />}
      <div className={styles.subContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.logo}>
            <p className={styles.textLogo}>WorkNest</p>
          </div>
          <p className={styles.title}>Register now</p>
          <p className={styles.subTitle}>Hi, Welcome 👋</p>
          <form onSubmit={handleSubmit}>
            <p className={styles.label}>Username</p>
            <input className={styles.inputBox} type="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <p className={styles.label}>Password</p>
            <input className={styles.inputBox} type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div>
              <p className={styles.label}>Gender</p>
              <select className={styles.inputBox} value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <button className={styles.buttonLogin} type="submit">Register</button>
            </div>
          </form>

        </div>

        <div className={styles.rightColumn}>
          <div className={styles.buttonSignUp}>
            <Link className={styles.textSignUp} href="/login">Login</Link>
          </div>

          <div className={styles.imagePage}>
            <Image
              className={styles.image}
              src={imagePage}
              alt={`image`}
              layout="responsive"
            />
          </div>
        </div>
      </div>
      {showAlert && (
        <div className={`${styles.alert} ${styles.popup}`}>
          <p>Registration successful!</p>
          <p>Login Now!</p>
          <button onClick={handleAlertOK}>OK</button>
        </div>
      )}

      {error && (
        <div className={`${styles.alert} ${styles.error}`}>
          <p>Error:</p>
          <p>{error}</p>
          <button onClick={() => setError('')}>OK</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
