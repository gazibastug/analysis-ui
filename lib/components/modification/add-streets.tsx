import L from 'leaflet'
import {useCallback, useEffect, useRef, MutableRefObject} from 'react'
import {FeatureGroup} from 'react-leaflet'
import {EditControl} from 'react-leaflet-draw'

import type {FeatureCollection, LineString} from 'geojson'

import useModification from 'lib/hooks/use-modification'

import StreetForm from './street-form'

const drawSettings = {
  polyline: true,
  polygon: false,
  rectangle: false,
  circle: false,
  marker: false,
  circlemarker: false
}

// Check if the value is a feature collection
const isFeatureCollection = (fc: any): fc is FeatureCollection =>
  (fc as FeatureCollection).features !== undefined

/**
 * Must be rendered in a MapLayout
 */
export default function AddStreets() {
  const featureGroupRef: MutableRefObject<FeatureGroup> = useRef()
  const [m, update] = useModification()

  // Add the existing layers to the map on initial load
  useEffect(() => {
    if (featureGroupRef.current) {
      m.lineStrings.forEach((coordinates) => {
        const layer = new L.GeoJSON(
          L.GeoJSON.asFeature({
            type: 'LineString',
            coordinates
          })
        )
        layer.eachLayer((l) =>
          featureGroupRef.current.leafletElement.addLayer(l)
        )
      })
    }
  }, [featureGroupRef])

  // Handle create, delete, and edit
  const onGeometryChange = useCallback(() => {
    if (featureGroupRef.current) {
      const featureCollection = featureGroupRef.current.leafletElement.toGeoJSON()
      if (isFeatureCollection(featureCollection)) {
        const lineStrings = featureCollection.features
          .filter((feature) => {
            if (feature.geometry.type === 'LineString') {
              return (feature.geometry.coordinates || []).length > 1
            }
            return false
          })
          .map((feature) => (feature.geometry as LineString).coordinates)
        update({lineStrings})
      }
    }
  }, [featureGroupRef, update])

  return (
    <>
      <FeatureGroup key='add-streets-feature' ref={featureGroupRef}>
        <EditControl
          draw={drawSettings}
          position='topright'
          onCreated={onGeometryChange}
          onDeleted={onGeometryChange}
          onEdited={onGeometryChange}
        />
      </FeatureGroup>

      <StreetForm />
    </>
  )
}
