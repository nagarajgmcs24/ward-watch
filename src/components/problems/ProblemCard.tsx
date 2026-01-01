import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Problem } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

interface ProblemCardProps {
  problem: Problem;
}

const categoryIcons: Record<string, string> = {
  Road: '🛣️',
  Water: '💧',
  Garbage: '🗑️',
  Drainage: '🌊',
  Electricity: '💡',
  Footpath: '🚶',
  Others: '📋',
};

const ProblemCard = ({ problem }: ProblemCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusClass = (status: Problem['status']) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-progress';
      case 'resolved':
        return 'status-resolved';
    }
  };

  const getStatusLabel = (status: Problem['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
    }
  };

  return (
    <Link to={`/problems/${problem.id}`}>
      <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {problem.imageUrl ? (
            <img
              src={problem.imageUrl}
              alt={problem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-4xl">{categoryIcons[problem.category] || '📋'}</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground">
              {categoryIcons[problem.category]} {problem.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(problem.status)}`}>
              {getStatusLabel(problem.status)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {problem.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {problem.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Ward {problem.wardNumber}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(problem.reportedAt)}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProblemCard;
