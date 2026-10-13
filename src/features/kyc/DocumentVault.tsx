import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { FileText, ShieldCheck, Clock, AlertCircle, Download } from 'lucide-react';

const DOCUMENTS = [
  { id: 'doc-1', name: 'Master Non-Disclosure Agreement', status: 'verified', date: '12 October 2026', type: 'Legal' },
  { id: 'doc-2', name: 'Proof of Funds (Tier 1)', status: 'verified', date: '15 October 2026', type: 'Financial' },
  { id: 'doc-3', name: 'Corporate Entity Structure', status: 'expiring', date: 'Sample renewal reminder', type: 'Corporate' },
  { id: 'doc-4', name: 'UBO Passport Scans', status: 'pending', date: 'Sample review pending', type: 'Identity' },
];

export function DocumentVault() {
  return (
    <Card className="glass-panel w-full border-border/60">
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center text-ink">
            <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
            Document records
          </CardTitle>
          <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
            Example records
          </span>
        </div>
        <CardDescription>These records and statuses are illustrative. No documents are stored or available to download.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-muted uppercase bg-surface-hover/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-widest">Document name</th>
                <th className="px-6 py-4 font-semibold tracking-widest">Category</th>
                <th className="px-6 py-4 font-semibold tracking-widest">Example status / date</th>
                <th className="px-6 py-4 font-semibold tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map((doc) => (
                <tr key={doc.id} className="border-b border-border/50 hover:bg-surface-hover/30 transition-colors">
                  <td className="px-6 py-5 font-medium text-ink flex items-center">
                    <FileText className="w-4 h-4 mr-3 text-slate-muted" />
                    {doc.name}
                  </td>
                  <td className="px-6 py-5 text-slate-700">
                    {doc.type}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1">
                      <span className={`flex items-center text-xs font-bold uppercase tracking-widest ${
                        doc.status === 'verified' ? 'text-emerald-700' :
                        doc.status === 'expiring' ? 'text-amber-700' : 'text-blue-700'
                      }`}>
                        {doc.status === 'verified' ? <ShieldCheck className="w-3 h-3 mr-1" /> : 
                         doc.status === 'expiring' ? <AlertCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        Sample {doc.status}
                      </span>
                      <span className="text-xs text-slate-muted">{doc.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-primary/10 text-slate-muted hover:text-primary rounded-md transition-colors" aria-disabled="true" aria-label={`Download unavailable: ${doc.name}`} title="No file is available to download">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
