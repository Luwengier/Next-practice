import classes from './newsletter-registration.module.css'
import { useContext, useState } from 'react'
import NotificationContext from '../../store/notification-context'
import axios from 'axios'

function NewsletterRegistration() {
  const [email, setEmail] = useState('')
  const notificationCtx = useContext(NotificationContext)


  function registrationHandler(event) {
    event.preventDefault();

    if (!email || !email.includes('@')) {
      return
    }

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    })

    // axios.post('/api/newsletters', { email }).then((res) => console.log(res)).catch(err => console.log(err))

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;