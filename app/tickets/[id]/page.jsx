import Loading from '@/app/loading';
import { notFound } from 'next/navigation'
import { Suspense } from 'react';

export const dynamicParams = true;

export const generateStaticParams = async () => {
    // Generating a list of all ids so that next can render it faster by knowing how all ids beforehand
    const resp = await fetch('http://localhost:4000/tickets')
    const tickets = await resp.json()

    return tickets.map(ticket => ({
        id: ticket.id
    }))

}

const getTicket = async (id) => {
    // mimic a delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const resp = await fetch(`http://localhost:4000/tickets/${id}`, {
        next: {
            revalidate: 60,
        }
    })

    if (!resp.ok){
        notFound();
    }
    return resp.json()
}

export default async function TicketDetails({ params }) {

    const ticket = await getTicket(params['id'])
    return (
        <>
            <main>
                <nav>
                    <h2>Ticket Details</h2>
                </nav>

                <Suspense fallback={<Loading/>}>
                    <div className="card">
                        <h3>{ticket['title']}</h3>
                        <small>Created by {ticket['user_email']}</small>
                        <p>{ticket['body']}</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority } priority
                        </div>
                    </div>
                </Suspense>
            </main>
        </>
    )
}