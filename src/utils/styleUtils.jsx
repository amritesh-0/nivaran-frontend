// This file contains helper functions for consistent component styling.

export const getStatusPill = (status) => {
  const styles = {
    pending: 'bg-orange-100 text-orange-800',
    acknowledged: 'bg-blue-100 text-blue-800',
    assigned: 'bg-purple-100 text-purple-800',
    'in-progress': 'bg-indigo-100 text-indigo-800',
    resolved: 'bg-green-100 text-green-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${styles[status] || styles.default}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

export const getSeverityPill = (severity) => {
  const styles = {
    high: 'bg-red-500 text-white',
    medium: 'bg-orange-500 text-white',
    low: 'bg-green-500 text-white',
    default: 'bg-gray-500 text-white',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${styles[severity] || styles.default}`}>
      {severity}
    </span>
  );
};