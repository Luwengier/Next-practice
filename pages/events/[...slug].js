import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../helpers/fetcher'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function FilteredEvents(props) {
  const [events, setEvents] = useState()
  const router = useRouter()
  const filterData = router.query.slug

  const { data, error } = useSWR('https://nextjs-course-545e4-default-rtdb.firebaseio.com/events.json', fetcher)

  useEffect(() => {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({
          ...data[key],
          id: key,
        })
      }

      setEvents(events)
    }
  }, [data])

  if (!events) {
    return <p className='center'>Loading...</p>
  }

  const numYear = +filterData[0]
  const numMonth = +filterData[1]

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2020 ||
    numMonth < 0 ||
    numYear > 2050 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className='center'>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className='center'>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context
//   const filterData = params.slug

//   const numYear = +filterData[0]
//   const numMonth = +filterData[1]

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear < 2020 ||
//     numMonth < 0 ||
//     numYear > 2050 ||
//     numMonth > 12 ||
//     error
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       },
//     },
//   }
// }

export default FilteredEvents