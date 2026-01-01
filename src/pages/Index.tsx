import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Eye, Users, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProblemCard from '@/components/problems/ProblemCard';
import { getProblems } from '@/lib/storage';

const categories = [
  { name: 'Roads', icon: '🛣️', description: 'Potholes, damaged roads, speed breakers' },
  { name: 'Water', icon: '💧', description: 'Leakage, supply issues, contamination' },
  { name: 'Garbage', icon: '🗑️', description: 'Overflow, irregular collection, dumps' },
  { name: 'Drainage', icon: '🌊', description: 'Blocked drains, flooding, sewage' },
  { name: 'Electricity', icon: '💡', description: 'Streetlights, power cuts, wiring' },
  { name: 'Footpath', icon: '🚶', description: 'Broken pavements, encroachment' },
];

const stats = [
  { value: '2,500+', label: 'Issues Reported', icon: AlertTriangle },
  { value: '1,800+', label: 'Problems Resolved', icon: CheckCircle },
  { value: '50+', label: 'Active Wards', icon: Users },
  { value: '15K+', label: 'Active Citizens', icon: Eye },
];

const Index = () => {
  const problems = getProblems().slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm mb-6 animate-fade-up">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Serving 50+ Wards Across India
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Report Problems.{' '}
              <span className="relative">
                Improve Your Ward.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Empower your community by reporting civic issues directly to your ward councillor. 
              Together, let's build cleaner, safer, and better neighborhoods.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="xl" variant="hero-outline">
                <Link to="/report" className="gap-2">
                  Report a Problem
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90">
                <Link to="/problems">
                  View Ward Issues
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Fix My Ward Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process to report and resolve civic issues in your ward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Report Issue',
                description: 'Upload a photo, describe the problem, and select your ward. It takes less than 2 minutes.',
                color: 'primary',
              },
              {
                step: '02',
                title: 'Track Progress',
                description: 'View status updates as your councillor reviews and addresses the issue.',
                color: 'accent',
              },
              {
                step: '03',
                title: 'See Resolution',
                description: 'Get notified when the problem is resolved. Share feedback on the fix.',
                color: 'success',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative group animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
                )}
                <div className="relative bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                    item.color === 'primary' ? 'bg-primary' : item.color === 'accent' ? 'bg-accent' : 'bg-success'
                  }`}>
                    <span className="font-display text-xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Can You Report?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Report any civic issue in your ward - from potholes to power outages
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <Link
                key={category.name}
                to={`/problems?category=${category.name}`}
                className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Recent Issues
              </h2>
              <p className="text-muted-foreground">
                Latest problems reported by citizens
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/problems" className="gap-2">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <div
                key={problem.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of citizens actively improving their wards. Report your first issue today.
            </p>
            <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90">
              <Link to="/report" className="gap-2">
                Report a Problem
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
