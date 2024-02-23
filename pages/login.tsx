import { useState } from 'react';
import styles from '../styles/Login.module.css'
import Link from 'next/link';
import Image from 'next/image'
import imagePage from '../public/image.png'
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        setShowAlert(true);

        setTimeout(() => {
          router.push('/homepage');
        }, 2000);

      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred, please try again');
    }
  };

  return (
    <div className={styles.container}>
      {showAlert && <div className={styles.overlay} />}
      <div className={styles.subContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.logo}>
            <p className={styles.textLogo}>WorkNest</p>
          </div>
          <p className={styles.title}>Login now</p>
          <p className={styles.subTitle}>Hi, Welcome back 👋</p>
          <form onSubmit={handleSubmit}>
            <p className={styles.label}>Username</p>
            <input className={styles.inputBox} type="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <p className={styles.label}>Password</p>
            <input className={styles.inputBox} type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div>
              <button className={styles.buttonLogin} type="submit">Login</button>
              <p className={styles.firstCaption}>Not registered yet? <span className={styles.secondCaption}>Create an account</span> <a className={styles.thirdCaption} href='/signup'>SignUp</a></p>
            </div>
          </form>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.buttonSignUp}>
            <Link className={styles.textSignUp} href="/signup">Sign Up</Link>
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
        <div className={styles.alert}>
          <p>Login successful!</p>
          <p>Wait, the page auto-redirects to the homepage.</p>
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

export default Login;
