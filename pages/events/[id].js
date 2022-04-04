import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'

function EventDetailPage(props) {
  const event = props.event

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventDetailPage

export async function getStaticProps(context) {
  const { params } = context
  const eventId = params.id
  const event = await getEventById(eventId)

  // if (!event) {
  //   return { notFound: true }
  // }

  return {
    props: {
      event: event
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const pathsWithParams = events.map(event => ({ params: { id: event.id } }))

  return {
    paths: pathsWithParams,
    fallback: false,
  }
}