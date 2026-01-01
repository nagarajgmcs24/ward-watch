import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Shield, MapPin, Clock, CheckCircle, MessageSquare, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/problems/StatusBadge';
import { getProblems, getCurrentUser, updateProblemStatus, Problem } from '@/lib/storage';
import { toast } from 'sonner';

const CouncillorPanel = () => {
  const user = getCurrentUser();
  const [problems, setProblems] = useState(getProblems());
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [newStatus, setNewStatus] = useState<Problem['status']>('pending');
  const [remarks, setRemarks] = useState('');

  // Redirect if not a councillor
  if (!user || user.role !== 'councillor') {
    return <Navigate to="/auth" replace />;
  }

  const wardProblems = problems.filter((p) => p.wardNumber === user.wardNumber);

  const stats = {
    total: wardProblems.length,
    pending: wardProblems.filter((p) => p.status === 'pending').length,
    inProgress: wardProblems.filter((p) => p.status === 'in-progress').length,
    resolved: wardProblems.filter((p) => p.status === 'resolved').length,
  };

  const handleUpdateStatus = () => {
    if (!selectedProblem) return;

    updateProblemStatus(selectedProblem.id, newStatus, remarks);
    setProblems(getProblems());
    setSelectedProblem(null);
    setRemarks('');
    toast.success('Status updated successfully!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-hero shadow-lg">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Councillor Panel
                </h1>
                <p className="text-muted-foreground">
                  Ward {user.wardNumber} • {user.name}
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/problems">View Public Dashboard</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Issues', value: stats.total, icon: MapPin, color: 'primary' },
              { label: 'Pending', value: stats.pending, icon: AlertTriangle, color: 'warning' },
              { label: 'In Progress', value: stats.inProgress, icon: RefreshCw, color: 'accent' },
              { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'success' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl shadow-card border border-border p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Problems List */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Issues in Ward {user.wardNumber}
              </h2>
            </div>

            {wardProblems.length > 0 ? (
              <div className="divide-y divide-border">
                {wardProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className="p-4 md:p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        {problem.imageUrl ? (
                          <img
                            src={problem.imageUrl}
                            alt={problem.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-2xl">
                            📋
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/problems/${problem.id}`}
                            className="font-display font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {problem.title}
                          </Link>
                          <StatusBadge status={problem.status} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {problem.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {problem.location || `Ward ${problem.wardNumber}`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(problem.reportedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProblem(problem);
                            setNewStatus(problem.status);
                            setRemarks(problem.councillorRemarks || '');
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No Issues Reported
                </h3>
                <p className="text-muted-foreground">
                  Great job! There are no pending issues in your ward.
                </p>
              </div>
            )}
          </div>

          {/* Update Modal */}
          {selectedProblem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
                onClick={() => setSelectedProblem(null)}
              />
              <div className="relative bg-card rounded-2xl shadow-elevated border border-border p-6 w-full max-w-md animate-scale-in">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Update Status
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {selectedProblem.title}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      New Status
                    </label>
                    <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Problem['status'])}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Remarks / Response
                    </label>
                    <Textarea
                      placeholder="Add your response or update..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedProblem(null)}
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleUpdateStatus}>
                      Update Status
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CouncillorPanel;
