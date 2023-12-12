import React from 'react';
import { useRef } from 'react';
import { Map, YMaps } from 'react-yandex-maps';
import styles from './YandexMap.module.scss';

export default function YandexMap(props) {
  const map = useRef(null);
  const mapState = {
    center: [53.5359, 27.34],
    zoom: 5,
  };

  const addRoute = (ymaps) => {
    // eslint-disable-next-line react/prop-types
    const pointA = props.origin;
    // eslint-disable-next-line react/prop-types
    const pointB = props.destination;

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: {
          routingMode: 'auto',
        },
      },
      {
        boundsAutoApply: true,
      },
    );

    map.current.geoObjects.add(multiRoute);
  };

  return (
    <div className={styles.yMap}>
      <YMaps query={{ apikey: 'b46291d8-4b9c-476d-819f-65a5a09872c6' }}>
        <Map
          modules={['multiRouter.MultiRoute']}
          state={mapState}
          instanceRef={map}
          onLoad={addRoute}
        ></Map>
      </YMaps>
    </div>
  );
}
