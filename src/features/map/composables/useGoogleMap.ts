import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { readonly, ref, shallowRef } from 'vue'

interface MapOptions extends google.maps.MapOptions {
  element: HTMLDivElement | null
}

const DEFAULT_OPTIONS = {
  center: { lat: 20, lng: 0 },
  zoom: 2,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  renderingType: 'VECTOR',
}

export function useGoogleMap() {
  const map = ref<google.maps.Map | null>(null)
  const isLoaded = shallowRef<boolean>(false)

  async function loadMap({ element, ...mapOptions }: MapOptions) {
    if (!element) {
      throw Error(`Map element is not found`);
    }
    const { VITE_MAPS_API_KEY, VITE_GOOGLE_MAP_ID } = import.meta.env
    setOptions({ key: VITE_MAPS_API_KEY, v: '3.59', mapIds: [VITE_GOOGLE_MAP_ID],  });
    const { Map } = await importLibrary("maps");
    map.value = new Map(element, Object.assign(DEFAULT_OPTIONS, mapOptions));
    isLoaded.value = true;
  }

  function destroy() {
    map.value = null
    isLoaded.value = false
  }

  return {
    loadMap,
    destroy,
    map,
    isLoaded: readonly(isLoaded),
  }
}
