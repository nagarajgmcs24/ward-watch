import { Problem } from '@/lib/storage';
import { Clock, Loader2, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: Problem['status'];
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const config = {
    pending: {
      icon: Clock,
      label: 'Pending',
      className: 'status-pending',
    },
    'in-progress': {
      icon: Loader2,
      label: 'In Progress',
      className: 'status-progress',
    },
    resolved: {
      icon: CheckCircle,
      label: 'Resolved',
      className: 'status-resolved',
    },
  };

  const { icon: Icon, label, className } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClasses[size]} ${className}`}>
      <Icon className={`${iconSizes[size]} ${status === 'in-progress' ? 'animate-spin' : ''}`} />
      {label}
    </span>
  );
};

export default StatusBadge;
