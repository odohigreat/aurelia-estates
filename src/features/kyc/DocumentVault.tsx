import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { FileText, ShieldCheck, Clock, AlertCircle, Download } from 'lucide-react';

const DOCUMENTS = [
  { id: 'doc-1', name: 'Master Non-Disclosure Agreement', status: 'verified', date: 'Oct 12, 2026', type: 'Legal' },
  { id: 'doc-2', name: 'Proof of Funds (Tier 1)', status: 'verified', date: 'Oct 15, 2026', type: 'Financial' },
  { id: 'doc-3', name: 'Corporate Entity Structure', status: 'expiring', date: 'Requires update in 14 days', type: 'Corporate' },
  { id: 'doc-4', name: 'UBO Passport Scans', status: 'pending', date: 'Awaiting manual review', type: 'Identity' },
];

export function DocumentVault() {
  return (
    <Card className="glass-panel w-full border-border/60">
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center text-white">
            <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
            Institutional Document Vault
          </CardTitle>
          <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
            AES-256 Encrypted
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-muted uppercase bg-surface-hover/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-widest">Document Name</th>
                <th className="px-6 py-4 font-semibold tracking-widest">Category</th>
                <th className="px-6 py-4 font-semibold tracking-widest">Status / Date</th>
                <th className="px-6 py-4 font-semibold tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map((doc) => (
                <tr key={doc.id} className="border-b border-border/50 hover:bg-surface-hover/30 transition-colors">
                  <td className="px-6 py-5 font-medium text-white flex items-center">
                    <FileText className="w-4 h-4 mr-3 text-slate-muted" />
                    {doc.name}
                  </td>
                  <td className="px-6 py-5 text-slate-300">
                    {doc.type}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1">
                      <span className={`flex items-center text-xs font-bold uppercase tracking-widest ${
                        doc.status === 'verified' ? 'text-emerald-400' : 
                        doc.status === 'expiring' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {doc.status === 'verified' ? <ShieldCheck className="w-3 h-3 mr-1" /> : 
                         doc.status === 'expiring' ? <AlertCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {doc.status}
                      </span>
                      <span className="text-xs text-slate-muted">{doc.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-primary/10 text-slate-muted hover:text-primary rounded-md transition-colors" title="Download Encrypted Copy">
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
