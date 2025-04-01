import { SolidLeafletMap } from "solidjs-leaflet";
//back up, please replace with help detail
export const HelpDetail = () => {
  return (
    <SolidLeafletMap
      center={[63.0, 13.0]}
      id="map"
      zoom={17}
      onMapReady={(l, m) => {
        const icon = l.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
        const marker = l
          .marker([63.0, 13.0], {
            icon,
          })
          .addTo(m);
        marker.bindPopup("Hello World!");
      }}
    />
  );
};
