import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, MapPin, FileText, Send, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { addProblem, getCurrentUser } from '@/lib/storage';
import { toast } from 'sonner';

const categories = [
  { value: 'Road', label: 'Road', icon: '🛣️' },
  { value: 'Water', label: 'Water', icon: '💧' },
  { value: 'Garbage', label: 'Garbage', icon: '🗑️' },
  { value: 'Drainage', label: 'Drainage', icon: '🌊' },
  { value: 'Electricity', label: 'Electricity', icon: '💡' },
  { value: 'Footpath', label: 'Footpath', icon: '🚶' },
  { value: 'Others', label: 'Others', icon: '📋' },
];

const wards = Array.from({ length: 50 }, (_, i) => ({
  value: String(i + 1),
  label: `Ward ${i + 1}`,
}));

const ReportProblem = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = getCurrentUser();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    wardNumber: '',
    location: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.wardNumber || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    addProblem({
      title: formData.title,
      category: formData.category,
      wardNumber: formData.wardNumber,
      location: formData.location,
      description: formData.description,
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600',
      reportedBy: user?.email || 'anonymous@user.com',
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
          <div className="text-center max-w-md animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">
              Problem Reported Successfully!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your issue has been submitted and will be reviewed by the ward councillor. 
              You can track its status on the Ward Issues page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/problems')}>
                View All Issues
              </Button>
              <Button variant="outline" onClick={() => {
                setIsSuccess(false);
                setFormData({ title: '', category: '', wardNumber: '', location: '', description: '' });
                setImagePreview(null);
              }}>
                Report Another
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Report a Problem
              </h1>
              <p className="text-muted-foreground">
                Help us identify and fix issues in your ward. Your report will be sent to the respective councillor.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
              {/* Image Upload */}
              <div className="mb-8">
                <Label className="text-base font-medium mb-3 block">Photo Evidence</Label>
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex justify-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                        <Upload className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <p className="text-foreground font-medium mb-1">
                      Click to upload or take a photo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-6">
                {/* Problem Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Problem Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Large pothole on main road"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Category & Ward */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              {cat.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ward Number *</Label>
                    <Select
                      value={formData.wardNumber}
                      onValueChange={(value) => setFormData({ ...formData, wardNumber: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.value} value={ward.value}>
                            {ward.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Area / Location Name
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., MG Road, Near City Mall"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about the problem..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportProblem;
