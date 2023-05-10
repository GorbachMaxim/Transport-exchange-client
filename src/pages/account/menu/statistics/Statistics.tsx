import React, { useEffect, useState } from 'react';
import styles from './Statistics.module.scss';
import Chart from '../../../../components/chart/Chart';
import StatisticsType from '../../../../core/types/statistics';
import api from '../../../../core/api/api';

const Statistics = () => {
  const [statistics, setStatistics] = useState<StatisticsType[]>(null!);

  const fetchStatistics = async () => {
    const stat = await api.fetchStatistics();
    if (stat !== null) {
      setStatistics(stat);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <section className={styles.overview}>
      <h2 className={`accountPageTitle`}>Chart</h2>
      {statistics && <Chart statistics={statistics} />}
    </section>
  );
};

export default Statistics;
