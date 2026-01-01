import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import ProblemCard from '@/components/problems/ProblemCard';
import { getProblems } from '@/lib/storage';

const categories = ['All', 'Road', 'Water', 'Garbage', 'Drainage', 'Electricity', 'Footpath', 'Others'];
const statuses = ['All', 'Pending', 'In Progress', 'Resolved'];
const wards = ['All', ...Array.from({ length: 50 }, (_, i) => String(i + 1))];

const Problems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedWard, setSelectedWard] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const problems = getProblems();

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        search === '' ||
        problem.title.toLowerCase().includes(search.toLowerCase()) ||
        problem.description.toLowerCase().includes(search.toLowerCase()) ||
        problem.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || problem.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Pending' && problem.status === 'pending') ||
        (selectedStatus === 'In Progress' && problem.status === 'in-progress') ||
        (selectedStatus === 'Resolved' && problem.status === 'resolved');

      const matchesWard =
        selectedWard === 'All' || problem.wardNumber === selectedWard;

      return matchesSearch && matchesCategory && matchesStatus && matchesWard;
    });
  }, [problems, search, selectedCategory, selectedStatus, selectedWard]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedWard('All');
    setSearchParams({});
  };

  const hasActiveFilters =
    search !== '' ||
    selectedCategory !== 'All' ||
    selectedStatus !== 'All' ||
    selectedWard !== 'All';

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Ward Issues
            </h1>
            <p className="text-muted-foreground">
              Browse and track civic issues reported across all wards
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-card rounded-xl shadow-card border border-border p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    !
                  </span>
                )}
              </Button>

              {/* Desktop Filters */}
              <div className={`flex flex-col sm:flex-row gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedWard} onValueChange={setSelectedWard}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem key={ward} value={ward}>
                        {ward === 'All' ? 'All Wards' : `Ward ${ward}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="gap-1">
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredProblems.length}</span>{' '}
              {filteredProblems.length === 1 ? 'issue' : 'issues'}
            </p>
          </div>

          {/* Problems Grid */}
          {filteredProblems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem, i) => (
                <div
                  key={problem.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <ProblemCard problem={problem} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No issues found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {hasActiveFilters
                  ? 'Try adjusting your filters to see more results.'
                  : 'There are no reported issues yet. Be the first to report a problem!'}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Problems;
