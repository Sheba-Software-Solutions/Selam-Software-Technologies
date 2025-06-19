
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, User, Mail, Phone, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTitles: { [key: string]: string } = {
    "1": "Senior Full Stack Developer",
    "2": "UI/UX Designer", 
    "3": "Mobile App Developer",
    "4": "DevOps Engineer",
    "5": "Junior Software Developer",
    "6": "Project Manager"
  };

  const jobTitle = jobTitles[jobId || "1"] || "Unknown Position";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll review it and get back to you soon.",
      });
      navigate("/jobs");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/jobs")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Apply for {jobTitle}
          </h1>
          <p className="text-gray-600">
            Fill out the form below to submit your application. All fields marked with * are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <Input 
                  type="text" 
                  required 
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <Input 
                  type="text" 
                  required 
                  placeholder="Enter your last name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input 
                  type="email" 
                  required 
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <Input 
                  type="tel" 
                  required 
                  placeholder="+251 911 123 456"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input 
                  type="text" 
                  placeholder="Your full address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Input 
                  type="text" 
                  required 
                  placeholder="Addis Ababa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <Input 
                  type="number" 
                  required 
                  min="0"
                  max="50"
                  placeholder="5"
                />
              </div>
            </div>
          </Card>

          {/* Professional Information */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Job Title
                </label>
                <Input 
                  type="text" 
                  placeholder="Senior Developer, Product Manager, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Company
                </label>
                <Input 
                  type="text" 
                  placeholder="Your current employer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <Input 
                  type="url" 
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Website
                </label>
                <Input 
                  type="url" 
                  placeholder="https://yourportfolio.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Skills *
                </label>
                <Textarea 
                  required
                  rows={4}
                  placeholder="List your key technical skills, programming languages, frameworks, etc."
                />
              </div>
            </div>
          </Card>

          {/* Application Details */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why are you interested in this position? *
                </label>
                <Textarea 
                  required
                  rows={4}
                  placeholder="Tell us what attracts you to this role and our company..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about a relevant project or achievement
                </label>
                <Textarea 
                  rows={4}
                  placeholder="Describe a project you've worked on or an achievement you're proud of..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Salary Range (ETB per month)
                </label>
                <Input 
                  type="text" 
                  placeholder="e.g., 25,000 - 35,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When can you start?
                </label>
                <Input 
                  type="date" 
                />
              </div>
            </div>
          </Card>

          {/* File Upload */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <Upload className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Click to upload your resume or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className="hidden" 
                    id="resume"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Button type="button" variant="outline" className="mt-2">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Upload your cover letter
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className="hidden" 
                    id="cover-letter"
                  />
                  <label htmlFor="cover-letter" className="cursor-pointer">
                    <Button type="button" variant="outline" className="mt-2">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/jobs")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
