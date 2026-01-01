import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/problems/StatusBadge';
import { getProblemById, getCurrentUser } from '@/lib/storage';

const categoryIcons: Record<string, string> = {
  Road: '🛣️',
  Water: '💧',
  Garbage: '🗑️',
  Drainage: '🌊',
  Electricity: '💡',
  Footpath: '🚶',
  Others: '📋',
};

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = getProblemById(id || '');
  const user = getCurrentUser();

  if (!problem) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">
              Problem Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The issue you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/problems">View All Issues</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                {problem.imageUrl ? (
                  <img
                    src={problem.imageUrl}
                    alt={problem.title}
                    className="w-full h-80 md:h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 md:h-96 bg-muted flex items-center justify-center">
                    <span className="text-8xl">{categoryIcons[problem.category] || '📋'}</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-sm font-medium">
                    {categoryIcons[problem.category]} {problem.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {problem.title}
                  </h1>
                  <StatusBadge status={problem.status} size="lg" />
                </div>

                <p className="text-foreground/80 leading-relaxed text-lg">
                  {problem.description}
                </p>
              </div>

              {/* Councillor Remarks */}
              {problem.councillorRemarks && (
                <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        Councillor Response
                      </h3>
                      <p className="text-sm text-muted-foreground">Official Update</p>
                    </div>
                  </div>
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                    <p className="text-foreground">{problem.councillorRemarks}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Details Card */}
              <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Issue Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ward & Location</p>
                      <p className="font-medium text-foreground">
                        Ward {problem.wardNumber}
                        {problem.location && ` • ${problem.location}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reported On</p>
                      <p className="font-medium text-foreground">
                        {formatDate(problem.reportedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reported By</p>
                      <p className="font-medium text-foreground">{problem.reportedBy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Status</p>
                      <StatusBadge status={problem.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/report">Report Similar Issue</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/problems">View All Issues</Link>
                  </Button>
                  {user?.role === 'councillor' && user.wardNumber === problem.wardNumber && (
                    <Button asChild variant="accent" className="w-full">
                      <Link to="/councillor">Manage in Panel</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProblemDetails;
