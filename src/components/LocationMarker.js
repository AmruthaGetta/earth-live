const LocationMarker = ({ lat, lng, onClick, eventType, eventTitle, categoryTitle }) => {
    // Choose emoji and color based on event type (using STRING IDs now)
    const getEventDisplay = (categoryId) => {
        switch(categoryId) {
            case 'drought':
                return { emoji: '🏜️', color: '#8B4513', name: 'Drought' }
            case 'dustHaze':
                return { emoji: '🌫️', color: '#DEB887', name: 'Dust/Haze' }
            case 'earthquakes':
                return { emoji: '🪨', color: '#8B0000', name: 'Earthquake' }
            case 'floods':
                return { emoji: '🌊', color: '#4169E1', name: 'Flood' }
            case 'landslides':
                return { emoji: '⛰️', color: '#A0522D', name: 'Landslide' }
            case 'manmade':
                return { emoji: '🏭', color: '#696969', name: 'Manmade' }
            case 'seaLakeIce':
                return { emoji: '🧊', color: '#87CEEB', name: 'Sea/Lake Ice' }
            case 'severeStorms':
                return { emoji: '⛈️', color: '#483D8B', name: 'Severe Storms' }
            case 'snow':
                return { emoji: '❄️', color: '#F0F8FF', name: 'Snow' }
            case 'tempExtremes':
                return { emoji: '🌡️', color: '#FF6347', name: 'Temperature Extremes' }
            case 'volcanoes':
                return { emoji: '🌋', color: '#FF4500', name: 'Volcano' }
            case 'waterColor':
                return { emoji: '💧', color: '#20B2AA', name: 'Water Color' }
            case 'wildfires':  // This is the one you're seeing!
                return { emoji: '🔥', color: '#FF0000', name: 'Wildfire' }
            default:
                // Fallback: use the category title if we don't recognize the ID
                console.log('Unknown category ID:', categoryId, 'Title:', categoryTitle)
                return { emoji: '⚠️', color: '#808080', name: categoryTitle || 'Unknown' }
        }
    }

    const { emoji, color, name } = getEventDisplay(eventType)
    
    console.log('LocationMarker rendered:', eventTitle, 'Type:', name, 'Emoji:', emoji, 'ID:', eventType)
    
    return (
        <div 
            className="location-marker" 
            onClick={onClick} 
            title={`${name}: ${eventTitle}`} // Tooltip on hover
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '8px',
                height: '8px',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 1000,
                backgroundColor: color + '40', // Semi-transparent background
                borderRadius: '50%',
                border: `2px solid ${color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                transition: 'all 0.2s ease',
                boxShadow: `0 0 10px ${color}60`
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1.2)'
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)'
            }}
        >
            {emoji}
        </div>
    )
}

export default LocationMarker
