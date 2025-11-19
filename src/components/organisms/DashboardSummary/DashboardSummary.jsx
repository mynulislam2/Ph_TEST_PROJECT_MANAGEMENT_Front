import './DashboardSummary.css';

export const DashboardSummary = ({ stats }) => {
  const items = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      badge: '+2 this week',
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      badge: `${stats.totalTasks ? Math.round(stats.totalTasks * 0.65) : 0} completed`,
    },
    {
      title: 'Overloaded Members',
      value: stats.overloadedCount,
      badge: stats.overloadedCount ? 'Action needed' : 'All balanced',
      alert: stats.overloadedCount > 0,
    },
  ];

  return (
    <div className="dashboard-summary">
      {items.map((item) => (
        <div key={item.title} className={item.alert ? 'dashboard-summary__card danger' : 'dashboard-summary__card'}>
          <p>{item.title}</p>
          <div className="dashboard-summary__value">
            <h2>{item.value}</h2>
            <span>{item.badge}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

