
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, ThumbsUp, ThumbsDown, Star, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FeedbackTab: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackType || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it and get back to you if needed.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedbackType('');
        setRating(0);
        setEmail('');
        setSubject('');
        setMessage('');
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🛠️ Feedback & Support</h2>
        <p className="text-gray-600">Help us improve by sharing your feedback or reporting issues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Feedback Actions */}
        <div className="lg:col-span-1">
          <Card className="rounded-xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-lg border-green-200 text-green-700 hover:bg-green-50"
                onClick={() => setFeedbackType('feature')}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Feature Request
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-lg border-red-200 text-red-700 hover:bg-red-50"
                onClick={() => setFeedbackType('bug')}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Report Bug
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => setFeedbackType('general')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                General Feedback
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="rounded-xl border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Common Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-1">How accurate are compatibility scores?</h4>
                <p className="text-xs text-gray-600">Our AI analyzes multiple factors with 85% accuracy on average.</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-1">Can I export tender data?</h4>
                <p className="text-xs text-gray-600">Yes, export features are available in your dashboard.</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-1">How often is data updated?</h4>
                <p className="text-xs text-gray-600">Tender data is updated daily from government sources.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Form */}
        <div className="lg:col-span-2">
          <Card className="rounded-xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Type *
                  </label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">🐛 Bug Report</SelectItem>
                      <SelectItem value="feature">💡 Feature Request</SelectItem>
                      <SelectItem value="improvement">⚡ Improvement Suggestion</SelectItem>
                      <SelectItem value="general">💬 General Feedback</SelectItem>
                      <SelectItem value="support">🆘 Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className={`p-1 rounded transition-colors ${
                          star <= rating 
                            ? 'text-yellow-400 hover:text-yellow-500' 
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600 self-center">
                        {rating === 1 && "Poor"}
                        {rating === 2 && "Fair"}
                        {rating === 3 && "Good"}
                        {rating === 4 && "Very Good"}
                        {rating === 5 && "Excellent"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optional)
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief description"
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide detailed information about your feedback, bug report, or feature request..."
                    rows={6}
                    className="rounded-lg resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFeedbackType('');
                      setRating(0);
                      setEmail('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="rounded-lg"
                  >
                    Clear Form
                  </Button>
                  
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
