import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import JobService from '../services/Job';
import { Job } from '../types/Job';
import styles from '../styles/HomePage.module.css';
import { useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

type Props = {
  jobs: Job[];
};

const HomePage: NextPage<Props> = ({ jobs }) => {
  const [role] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { userRole } = parseCookies();
    if (!userRole) {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'userRole');
    router.push('/login');
  };

  const handleVacancyClick = () => {
    if (role === 'visitor') {
      alert('Your account does not have access to this. You must contact the admin.');
      goToWhatsApp();
    } 
    // else {
    //   router.push('/job');
    // }
  };

  const goToWhatsApp = () => {
    window.location.href =
      'https://api.whatsapp.com/send?phone=+620812345678&text=Halo%20Admin%2C%20saya%20mau%20posting%20lowongan%20nih'
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.leftColumn}>
          <p className={styles.title}>Job List</p>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.logout} onClick={handleLogout}>
            Logout
          </div>
          {role === 'admin' && (
            <div className={styles.buttonUser}>
              <Link className={styles.textUser} href="/user">User Management</Link>
            </div>
          )}
          {role === 'visitor' && (
            <div className={styles.buttonVacancy} onClick={handleVacancyClick}>
              Add Vacancy
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardContainer}>
        {jobs.map((job) => (
          <Link href={job.url} className={styles.card}>
            <div className={styles.jobCard} key={job.id}>
              <div>
                <div>
                  <picture className={styles.picture}>
                    <img
                      src={job.companyLogo}
                      alt="companyLogo"
                      className={styles.image}
                    />
                  </picture>
                </div>
                <div className={styles.companyName}>{job.companyName}</div>
                <hr />
                <div className={styles.jobTitle} dangerouslySetInnerHTML={{ __html: job.jobTitle }} />
                <div>Industry:  <span className={styles.jobIndustry} dangerouslySetInnerHTML={{ __html: job.jobIndustry }} /></div>

                <div className={styles.labelCard}>{job.jobType}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  try {
    const jobResponse = await JobService.getJobList();
    const jobs = jobResponse.data.jobs;

    return {
      props: {
        jobs: jobs ? jobs : [],
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      notFound: true,
    };
  }
};

export default HomePage;
