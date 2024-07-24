import { MarkerPoint } from '@/types/map';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

interface MarkersMapProps {
  markers?: MarkerPoint[]
};

const MarkersMap: React.FC<MarkersMapProps> = ({
  markers = [],
}) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        style={{
          width: '100vw',
          height: 500 
        }}
        defaultCenter={{
          lat: 40.7448608,
          lng: -73.9366702
        }}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {markers.map(marker=> (
          <Marker position={{lat: marker.latitude, lng: marker.longitude}} />
        ))}
      </Map>
    </APIProvider>
  );
}

export default MarkersMap;