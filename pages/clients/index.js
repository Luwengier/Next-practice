import Link from 'next/link'
const clients = [
  { id: 'max', name: 'Maximilian' },
  { id: 'manu', name: 'Manuel' },
  { id: 'wen', name: 'Wangier' },
]


function ClientsPage() {
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link
              href={{
                pathname: '/clients/[id]',
                query: { id: client.id }
              }}
            >
              {client.name}
            </Link>
            {/* OR */}
            {/* <Link href={`/clients/${client.id}`}>{client.name}</Link> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientsPage