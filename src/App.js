import { useState, useEffect } from 'react'
import Map from './components/Map'
import Loader from './components/Loader'
import Header from './components/Header'

function App() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      
      try {
        // Updated API endpoint (v3 instead of v2.1)
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const { events } = await res.json()
        setEventData(events)
        
      } catch (error) {
        console.error('Error fetching events:', error)
        
        // Fallback: Set empty array or mock data if API fails
        setEventData([])
        
        // Optional: You can add mock data here for testing
        // setEventData([
        //   {
        //     id: "EONET_123",
        //     title: "Sample Wildfire Event",
        //     categories: [{ id: 8, title: "Wildfires" }],
        //     geometry: [{ coordinates: [-120.5, 35.5] }]
        //   }
        // ])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <Header />
      { !loading ? <Map eventData={eventData} /> : <Loader /> }
    </div>
  );
}

export default App;
