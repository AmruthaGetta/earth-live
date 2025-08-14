import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    // Debug: Log the eventData to see what we're getting
    console.log('Event Data:', eventData)
    console.log('Number of events:', eventData.length)

    const markers = eventData.map((ev, index) => {
        // Debug: Log each event to see its structure
        console.log(`Event ${index}:`, ev.title)
        console.log('📋 Full Category Object:', ev.categories[0])
        console.log('🆔 Category ID:', ev.categories[0].id)
        console.log('📝 Category Title:', ev.categories[0].title)
        console.log('---')

        // Check if event has categories and geometry
        if (ev.categories && ev.categories.length > 0 && ev.geometry && ev.geometry.length > 0) {
            const categoryId = ev.categories[0].id
            const categoryTitle = ev.categories[0].title
            
            console.log(`✅ Creating ${categoryTitle} marker (ID: ${categoryId}) for:`, ev.title)
            
            return <LocationMarker 
                key={index} 
                lat={ev.geometry[0].coordinates[1]} 
                lng={ev.geometry[0].coordinates[0]} 
                eventType={categoryId}
                eventTitle={ev.title}
                categoryTitle={categoryTitle} // Pass the title too
                onClick={() => setLocationInfo({ 
                    id: ev.id, 
                    title: ev.title,
                    category: categoryTitle 
                })} 
            />
        }
        return null
    })

    // Debug: Log how many markers we created
    const validMarkers = markers.filter(marker => marker !== null)
    console.log('🌍 Total event markers created:', validMarkers.length)

    // Show unique category IDs and titles
    const uniqueCategories = {}
    eventData.forEach(ev => {
        if (ev.categories && ev.categories.length > 0) {
            const id = ev.categories[0].id
            const title = ev.categories[0].title
            uniqueCategories[id] = title
        }
    })
    console.log('🏷️ All Category IDs found:', uniqueCategories)

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={ center }
                defaultZoom={ zoom }
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map
