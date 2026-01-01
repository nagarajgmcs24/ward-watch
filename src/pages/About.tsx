import { Target, Users, Eye, Shield, Heart, Zap } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About Fix My Ward
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Empowering citizens to build better communities through transparent civic engagement
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Target className="h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Bridging the Gap Between Citizens and Local Government
                </h2>
                <p className="text-muted-foreground mb-4">
                  Fix My Ward was born from a simple observation: citizens often face challenges in 
                  getting their civic issues heard and resolved. Traditional complaint systems are 
                  slow, opaque, and frustrating.
                </p>
                <p className="text-muted-foreground">
                  We created a platform that makes it easy for anyone to report problems in their 
                  ward, track progress transparently, and hold local representatives accountable. 
                  Our goal is to make civic participation accessible to every Indian citizen.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: '15K+', desc: 'Active Citizens' },
                  { icon: Shield, label: '50+', desc: 'Connected Wards' },
                  { icon: Eye, label: '2.5K+', desc: 'Issues Reported' },
                  { icon: Zap, label: '72%', desc: 'Resolution Rate' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card rounded-xl shadow-card border border-border p-6 text-center"
                  >
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="font-display text-2xl font-bold text-foreground">
                      {stat.label}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Fix My Ward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Eye,
                title: 'Transparency',
                description:
                  'Every reported issue and its status is visible to the public. No more wondering if your complaint was received or acted upon.',
              },
              {
                icon: Users,
                title: 'Accountability',
                description:
                  'Ward councillors are directly connected to citizen reports. Performance is tracked and visible, encouraging faster action.',
              },
              {
                icon: Heart,
                title: 'Community First',
                description:
                  'We believe in the power of collective action. When citizens work together, neighborhoods become safer and cleaner.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl shadow-card border border-border p-8 text-center hover:-translate-y-1 transition-transform"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Benefits for Everyone
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For Citizens */}
              <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    For Citizens
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Report issues in under 2 minutes with photo evidence',
                    'Track the status of your complaints in real-time',
                    'View issues reported by others in your area',
                    'Hold elected representatives accountable',
                    'Contribute to building a better community',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="text-success mt-1">✓</span>
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Government */}
              <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    <Shield className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    For Government
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Centralized dashboard to manage ward complaints',
                    'Photo evidence helps in accurate issue assessment',
                    'Efficient resource allocation based on real data',
                    'Improved citizen satisfaction and trust',
                    'Digital transformation of civic services',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="text-success mt-1">✓</span>
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Our Vision for India
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              We envision a future where every Indian city is clean, safe, and well-maintained. 
              Where citizens actively participate in governance and their voices are heard. 
              Where technology bridges the gap between people and their elected representatives.
            </p>
            <p className="text-primary-foreground/60">
              Fix My Ward is more than an app—it's a movement towards Smart Governance.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
