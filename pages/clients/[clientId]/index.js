import { useRouter } from 'next/router'

function ClientProjectsPage() {
  const router = useRouter()

  console.log(router.query)

  function loadProjectHandler() {
    router.push('/clients/max/projectA')
    // OR
    // router.push({
    //   pathname: '/clients/[clientId]/[projectId]',
    //   query: {
    //     clientId: 'max',
    //     projectId: 'projectA',
    //   }
    // })
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  )
}

export default ClientProjectsPage