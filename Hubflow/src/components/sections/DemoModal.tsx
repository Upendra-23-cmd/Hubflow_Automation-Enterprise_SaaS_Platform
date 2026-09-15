import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { apiService } from '../../services/apiService';
import { DemoBookingRequest } from '../../types';
import { CheckCircle2, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<DemoBookingRequest>({
    fullName: '',
    workEmail: '',
    companyName: '',
    teamSize: '10-50',
    primaryUseCase: 'AI Lead Enrichment & RevOps',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    confirmationId: string;
    meetingLink: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.companyName.trim()) {
      showToast('error', 'Missing Information', 'Please fill in your name and company.');
      return;
    }

    if (!formData.workEmail || !formData.workEmail.includes('@')) {
      showToast('error', 'Invalid Email', 'Please provide a valid work email.');
      return;
    }

    setIsSubmitting(true);
    const res = await apiService.submitDemoRequest(formData);
    setIsSubmitting(false);

    if (res.success && res.data) {
      setConfirmationData(res.data);
      showToast('success', 'Demo Requested!', res.message);
    } else {
      showToast('error', 'Submission Failed', res.error || 'Please check your inputs.');
    }
  };

  const handleReset = () => {
    setConfirmationData(null);
    setFormData({
      fullName: '',
      workEmail: '',
      companyName: '',
      teamSize: '10-50',
      primaryUseCase: 'AI Lead Enrichment & RevOps',
      notes: '',
    });
    onClose();
  };

  return (
    <Modal
      id="enterprise-demo-modal"
      isOpen={isOpen}
      onClose={handleReset}
      title={confirmationData ? 'Demo Session Confirmed' : 'Book an Enterprise Architecture Review'}
      description={
        confirmationData
          ? 'Your dedicated Solutions Architect has been assigned.'
          : 'See how Hubflow replaces legacy glue code, reduces webhook failure rates, and scales AI workflows.'
      }
      maxWidth="lg"
    >
      {confirmationData ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-white">We're Ready for You!</h4>
            <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
              We sent a calendar invite and architecture blueprint checklist to{' '}
              <span className="text-indigo-300 font-semibold">{formData.workEmail}</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Confirmation Reference:</span>
              <span className="font-mono text-indigo-300 font-semibold">
                {confirmationData.confirmationId}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Assigned Specialist:</span>
              <span className="text-white font-medium">Principal Cloud Architect</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimated Duration:</span>
              <span className="text-white font-medium">30-min Tailored Deep Dive</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              id="confirm-close-btn"
              variant="primary"
              className="w-full"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={handleReset}
            >
              Add to Calendar & Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="demo-name"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="demo-name"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Elena Rostova"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="demo-email"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Work Email *
              </label>
              <input
                id="demo-email"
                type="email"
                required
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="elena@company.com"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="demo-company"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Company Name *
              </label>
              <input
                id="demo-company"
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Acme Corp"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="demo-team-size"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Team Size
              </label>
              <select
                id="demo-team-size"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
              >
                <option value="1-10">1 - 10 employees</option>
                <option value="10-50">10 - 50 employees</option>
                <option value="50-250">50 - 250 employees</option>
                <option value="250+">250+ Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="demo-use-case"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Primary Automation Focus
            </label>
            <select
              id="demo-use-case"
              value={formData.primaryUseCase}
              onChange={(e) => setFormData({ ...formData, primaryUseCase: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
            >
              <option value="AI Lead Enrichment & RevOps">AI Lead Enrichment & RevOps</option>
              <option value="Customer Support Triage & NLP">Customer Support Triage & NLP</option>
              <option value="DevOps & Incident Escalation">DevOps & Incident Escalation</option>
              <option value="E-Commerce & High-Volume Inventory">E-Commerce & High-Volume Inventory</option>
              <option value="Replacing Legacy Zapier/Make Microservices">Replacing Legacy Zapier / Make Microservices</option>
              <option value="Custom Private VPC Deployment">Custom Private VPC Deployment</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="demo-notes"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Notes or Current Tooling (Optional)
            </label>
            <textarea
              id="demo-notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Currently running 500k monthly tasks on Zapier, experiencing timeout issues."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>SOC2 Type II & GDPR compliant. Zero unsolicited sales spam.</span>
          </div>

          <div className="pt-2">
            <Button
              id="submit-demo-form-btn"
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Confirm 30-Min Architecture Session
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
